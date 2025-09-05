import * as readlineSync from 'readline-sync';
const chalk = require('chalk');
import { AudioManager } from './engine/audio';
import { SceneManager } from './engine/scenes';
import { AIHelper } from './engine/aiHelper';
import { MiniMap } from './engine/minimap';
import { AnimationManager } from './engine/animations';
import { HUDManager } from './engine/hud';
import { EffectsManager } from './engine/effects';
import { PropulsorManager } from './logic/propulsores';
import { Godzilla } from './logic/godzilla';
import { CalculosManager } from './logic/calculos';

export class Game {
    private audioManager: AudioManager;
    private propulsorManager: PropulsorManager;
    private godzilla: Godzilla;
    private miniMap: MiniMap;
    private hudManager: HUDManager;
    private gameState: 'intro' | 'playing' | 'combat' | 'escape' | 'victory' | 'defeat' = 'intro';
    private shipPosition: { x: number; y: number } = { x: 500, y: 500 };
    private shipHealth: number = 100;

    constructor() {
        this.audioManager = new AudioManager();
        this.propulsorManager = new PropulsorManager();
        this.godzilla = new Godzilla();
        this.miniMap = new MiniMap();
        this.hudManager = new HUDManager();
    }

    /**
     * Inicia el juego
     */
    async start(): Promise<void> {
        console.clear();
        SceneManager.showIntroScene();
        
        console.log(chalk.yellow.bold('\nPresiona ENTER para comenzar la misión...'));
        readlineSync.question();
        
        await this.playIntroSequence();
        await this.mainGameLoop();
    }

    /**
     * Reproduce la secuencia de introducción
     */
    private async playIntroSequence(): Promise<void> {
        console.log(chalk.blue.bold('\n🔊 Reproduciendo audio de introducción...'));
        await this.audioManager.playGodzillaRoar();
        
        // Simular detección de Godzilla
        setTimeout(() => {
            SceneManager.showGodzillaDetectedScene();
        }, 2000);
        
        await this.waitForUserInput('Presiona ENTER para continuar...');
    }

    /**
     * Bucle principal del juego
     */
    private async mainGameLoop(): Promise<void> {
        this.gameState = 'playing';
        
        while (this.gameState === 'playing') {
            await this.showMainMenu();
        }
    }

    /**
     * Muestra el menú principal
     */
    private async showMainMenu(): Promise<void> {
        console.clear();
        console.log(chalk.blue.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  🎮 MENÚ PRINCIPAL - MISIÓN SALVAR MUNDO 🎮                                 ║
    ║                                                                              ║
    ║  Estado actual: ${this.gameState.toUpperCase()}                                                      ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));

        const opciones = [
            ' Verificar estado de propulsores',
            ' Calcular distancia a Godzilla',
            ' Generar codigo de seguridad',
            ' Intentar despegue',
            ' Entrar en combate',
            ' Mostrar mini mapa',
            ' Mostrar HUD completo',
            ' Pedir consejo a la IA',
            ' Ver estadisticas',
            ' Salir del juego'
        ];

        const opcion = readlineSync.keyInSelect(opciones, 'Selecciona una opcion:');
        
        switch (opcion) {
            case 0:
                await this.verificarPropulsores();
                break;
            case 1:
                await this.calcularDistancia();
                break;
            case 2:
                await this.generarCodigoSeguridad();
                break;
            case 3:
                await this.intentarDespegue();
                break;
            case 4:
                await this.entrarEnCombate();
                break;
            case 5:
                await this.mostrarMiniMapa();
                break;
            case 6:
                await this.mostrarHUDCompleto();
                break;
            case 7:
                await this.pedirConsejoIA();
                break;
            case 8:
                await this.mostrarEstadisticas();
                break;
            case 9:
                this.gameState = 'defeat';
                break;
            default:
                console.log(chalk.yellow('Operacion cancelada.'));
        }
    }

    /**
     * Verifica el estado de los propulsores
     */
    private async verificarPropulsores(): Promise<void> {
        console.clear();
        
        // Simular posible fallo en propulsores
        this.propulsorManager.simularFalloPropulsores();
        
        this.propulsorManager.mostrarEstadoPropulsores();
        this.propulsorManager.mostrarCalculosDetallados();
        
        await this.waitForUserInput('Presiona ENTER para continuar...');
    }

    /**
     * Calcula la distancia a Godzilla
     */
    private async calcularDistancia(): Promise<void> {
        console.clear();
        console.log(chalk.blue.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  📐 CÁLCULO DE DISTANCIA A GODZILLA 📐                                      ║
    ║                                                                              ║
    ║  Ingresa las coordenadas (valores entre 50 y 1000, todos diferentes):        ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));

        let coordenadasValidas = false;
        let x1: number = 0, y1: number = 0, x2: number = 0, y2: number = 0;

        while (!coordenadasValidas) {
            try {
                x1 = parseInt(readlineSync.question('Coordenada X1: ')) || 0;
                y1 = parseInt(readlineSync.question('Coordenada Y1: ')) || 0;
                x2 = parseInt(readlineSync.question('Coordenada X2: ')) || 0;
                y2 = parseInt(readlineSync.question('Coordenada Y2: ')) || 0;

                const validacion = CalculosManager.validarCoordenadas(x1, y1, x2, y2);
                
                if (validacion.valido) {
                    coordenadasValidas = true;
                    console.log(chalk.green(validacion.mensaje));
                } else {
                    console.log(chalk.red(validacion.mensaje));
                    console.log(chalk.yellow('Intenta nuevamente...\n'));
                }
            } catch (error) {
                console.log(chalk.red('❌ Error: Ingresa números válidos.'));
            }
        }

        const distancia = CalculosManager.calcularDistancia(x1, y1, x2, y2);
        CalculosManager.mostrarCalculoDistancia(x1, y1, x2, y2);

        // Verificar sigilo
        if (distancia < 300) {
            console.log(chalk.red.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  ⚠️  DISTANCIA CRÍTICA DETECTADA ⚠️                                         ║
    ║                                                                              ║
    ║  La distancia es menor a 300 metros.                                         ║
    ║  Activando velo de invisibilidad...                                          ║
    ║                                                                              ║
    ║  ¡Debes alejarte más para evitar la detección!                               ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
            `));
        } else {
            console.log(chalk.green.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  ✅ DISTANCIA SEGURA ✅                                                     ║
    ║                                                                              ║
    ║  La distancia es mayor a 300 metros.                                         ║
    ║  El velo de invisibilidad está activo.                                       ║
    ║                                                                              ║
    ║  ¡Puedes proceder con seguridad!                                             ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
            `));
        }

        await this.waitForUserInput('Presiona ENTER para continuar...');
    }

    /**
     * Genera el código de seguridad
     */
    private async generarCodigoSeguridad(): Promise<void> {
        console.clear();
        SceneManager.showSecurityCodeScene();
        
        console.log(chalk.blue('Generando código de seguridad...'));
        
        // Simular tiempo de generación
        for (let i = 0; i < 3; i++) {
            console.log(chalk.yellow(`Procesando... ${i + 1}/3`));
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        const codigo = CalculosManager.generarCodigoSeguridad();
        const validacion = CalculosManager.validarCodigoSeguridad(codigo);
        
        console.log(chalk.green(validacion.mensaje));
        CalculosManager.mostrarCodigoSeguridad(codigo);
        
        await this.waitForUserInput('Presiona ENTER para continuar...');
    }

    /**
     * Intenta el despegue
     */
    private async intentarDespegue(): Promise<void> {
        console.clear();
        SceneManager.showEscapeScene();
        
        // Verificar si se debe activar Super Charge
        if (this.propulsorManager.debeActivarSuperCharge()) {
            this.godzilla.activateSuperCharge();
            await this.audioManager.playAttackSound();
            
            console.log(chalk.red.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  💀 FALLO TOTAL DE PROPULSORES 💀                                           ║
    ║                                                                              ║
    ║  Sin propulsores funcionales, no es posible el despegue.                     ║
    ║  Godzilla ha activado Super Charge y ataca con furia destructiva.            ║
    ║                                                                              ║
    ║  ¡La humanidad está condenada!                                               ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
            `));
            
            this.godzilla.executeAllAttacks();
            
            // Mostrar pantalla de GAME OVER épica
            await this.waitForUserInput('Presiona ENTER para ver el GAME OVER...');
            SceneManager.showGameOverScene();
            
            this.gameState = 'defeat';
            return;
        }
        
        // Solicitar potencia para el despegue
        console.log(chalk.blue.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  🚀 CONFIGURACIÓN DE DESPEGUE 🚀                                            ║
    ║                                                                              ║
    ║  Ingresa la potencia que deseas aplicar para el despegue:                    ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
        
        let potenciaValida = false;
        let potencia: number = 0;
        
        while (!potenciaValida) {
            try {
                potencia = parseInt(readlineSync.question('Potencia (unidades): ')) || 0;
                if (potencia > 0) {
                    potenciaValida = true;
                } else {
                    console.log(chalk.red('❌ Error: La potencia debe ser mayor a 0.'));
                }
            } catch (error) {
                console.log(chalk.red('❌ Error: Ingresa un número válido.'));
            }
        }
        
        // Verificar si el despegue es posible
        const resultado = this.propulsorManager.verificarDespegue(potencia);
        
        console.log(chalk.blue.bold(`
    ╔════════════════════════════════════════════════════════════════════════════════╗
    ║                                                                                ║
    ║  📊 RESULTADO DE VERIFICACIÓN 📊                                              ║
    ║                                                                                ║
    ║  Potencia aplicada: ${potencia.toLocaleString()} unidades                      ║              
    ║  Potencia requerida: ${resultado.potenciaRequerida.toLocaleString()} unidades  ║                            
    ║                                                                                ║
    ║  ${resultado.mensaje}                                                          ║
    ║                                                                                ║
    ╚════════════════════════════════════════════════════════════════════════════════╝
        `));
        
        if (resultado.autorizado) {
            await this.ejecutarSecuenciaDespegue();
        } else {
            console.log(chalk.red('El despegue no es posible con la potencia actual.'));
            await this.waitForUserInput('Presiona ENTER para continuar...');
        }
    }

    /**
     * Ejecuta la secuencia de despegue
     */
    private async ejecutarSecuenciaDespegue(): Promise<void> {
        console.clear();
        SceneManager.showLaunchSequenceScene();
        
        await this.audioManager.playRocketIgnition();
        
        const opcion = readlineSync.keyInSelect(
            ['✅ Confirmar despegue', '❌ Cancelar'],
            '¿Confirmas el despegue?'
        );
        
        if (opcion === 0) {
            // Mostrar animación de despegue
            await AnimationManager.animateShipLaunch();
            
            // Mostrar efectos de partículas
            await EffectsManager.showParticleEffect('fire');
            
            await this.audioManager.playLaunchSound();
            
            await CalculosManager.simularSecuenciaDespegue(2, (progreso, tiempoSimulado) => {
                // Callback para mostrar progreso adicional
                if (tiempoSimulado % 30 === 0) {
                    console.log(chalk.green(`✅ Sistema ${Math.floor(tiempoSimulado / 30)} verificado`));
                }
            });
            
            this.gameState = 'victory';
        } else {
            console.log(chalk.yellow('Despegue cancelado.'));
            await this.waitForUserInput('Presiona ENTER para continuar...');
        }
    }

    /**
     * Entra en combate con Godzilla
     */
    private async entrarEnCombate(): Promise<void> {
        console.clear();
        SceneManager.showCombatScene();
        
        await this.audioManager.playGodzillaRoar();
        
        const opcion = readlineSync.keyInSelect(
            ['⚔️  Atacar directamente', '🛡️  Defender', '🏃 Intentar huir'],
            '¿Qué acción tomas?'
        );
        
        switch (opcion) {
            case 0:
                await this.combatirDirectamente();
                break;
            case 1:
                await this.defender();
                break;
            case 2:
                await this.intentarHuir();
                break;
            default:
                console.log(chalk.yellow('Acción cancelada.'));
        }
    }

    /**
     * Combate directo con Godzilla
     */
    private async combatirDirectamente(): Promise<void> {
        console.log(chalk.red.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  ⚔️  COMBATE DIRECTO INICIADO ⚔️                                            ║
    ║                                                                              ║
    ║  Atacas a Godzilla con todas tus armas...                                    ║
    ║  Pero su poder destructivo es abrumador...                                   ║
    ║                                                                              ║
    ║  ¡La batalla es desigual!                                                    ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
        
        // Mostrar animación de Godzilla caminando
        await AnimationManager.animateGodzillaWalking();
        
        // Mostrar efectos de explosión
        await EffectsManager.chainExplosionEffect();
        
        // Mostrar efecto de pantalla temblorosa
        await EffectsManager.screenShake(5);
        
        await this.audioManager.playAttackSound();
        
        // Godzilla contraataca
        this.godzilla.executeAllAttacks();
        
        // Mostrar pantalla de GAME OVER por combate
        await this.waitForUserInput('Presiona ENTER para ver el GAME OVER...');
        SceneManager.showCombatGameOverScene();
        
        this.gameState = 'defeat';
    }

    /**
     * Intenta defender
     */
    private async defender(): Promise<void> {
        console.log(chalk.yellow.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  🛡️  DEFENSA ACTIVADA 🛡️                                                    ║
    ║                                                                              ║
    ║  Activas todos los escudos disponibles...                                    ║
    ║  Pero Godzilla es demasiado poderoso...                                      ║
    ║                                                                              ║
    ║  Los escudos fallan bajo su ataque...                                        ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
        
        await this.audioManager.playAttackSound();
        
        this.godzilla.executeAllAttacks();
        
        // Mostrar pantalla de GAME OVER por combate
        await this.waitForUserInput('Presiona ENTER para ver el GAME OVER...');
        SceneManager.showCombatGameOverScene();
        
        this.gameState = 'defeat';
    }

    /**
     * Intenta huir
     */
    private async intentarHuir(): Promise<void> {
        console.log(chalk.blue.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  🏃 INTENTO DE HUIDA 🏃                                                     ║
    ║                                                                              ║
    ║  Intentas huir del combate...                                                ║
    ║  Pero Godzilla es más rápido de lo esperado...                               ║
    ║                                                                              ║
    ║  Te alcanza y ataca con furia...                                             ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
        
        await this.audioManager.playAttackSound();
        
        this.godzilla.executeAllAttacks();
        
        // Mostrar pantalla de GAME OVER por combate
        await this.waitForUserInput('Presiona ENTER para ver el GAME OVER...');
        SceneManager.showCombatGameOverScene();
        
        this.gameState = 'defeat';
    }

    /**
     * Pide consejo a la IA
     */
    private async pedirConsejoIA(): Promise<void> {
        console.clear();
        
        const opciones = [
            '🔧 Consejo sobre propulsores',
            '📐 Consejo sobre distancia',
            '🔐 Consejo sobre codigo de seguridad',
            '⚔️  Consejo sobre combate',
            '🚀 Consejo sobre escape',
            '🤖 Consejo general'
        ];
        
        const opcion = readlineSync.keyInSelect(opciones, '¿Sobre qué necesitas consejo?');
        
        switch (opcion) {
            case 0:
                AIHelper.getPropulsorAdvice();
                break;
            case 1:
                AIHelper.getDistanceAdvice();
                break;
            case 2:
                AIHelper.getSecurityCodeAdvice();
                break;
            case 3:
                AIHelper.getCombatAdvice();
                break;
            case 4:
                AIHelper.getEscapeAdvice();
                break;
            case 5:
                AIHelper.getGeneralAdvice();
                break;
            default:
                console.log(chalk.yellow('Operación cancelada.'));
        }
        
        await this.waitForUserInput('Presiona ENTER para continuar...');
    }

    /**
     * Muestra el mini mapa
     */
    private async mostrarMiniMapa(): Promise<void> {
        // Simular movimiento de Godzilla
        this.miniMap.simulateGodzillaMovement();
        
        // Actualizar posiciones
        const godzillaPos = this.godzilla.getPosition();
        this.miniMap.updatePositions(this.shipPosition, godzillaPos);
        
        // Renderizar mini mapa
        this.miniMap.render();
        
        // Verificar si Godzilla está en rango de ataque
        if (this.miniMap.isGodzillaInAttackRange()) {
            console.log(chalk.red.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  🚨 ALERTA: GODZILLA EN RANGO DE ATAQUE 🚨                                  ║
    ║                                                                              ║
    ║  ¡Debes actuar inmediatamente!                                               ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
            `));
        }
        
        await this.waitForUserInput('Presiona ENTER para continuar...');
    }

    /**
     * Muestra el HUD completo
     */
    private async mostrarHUDCompleto(): Promise<void> {
        // Actualizar datos del HUD
        const propulsores = this.propulsorManager.getPropulsoresState();
        const godzillaPos = this.godzilla.getPosition();
        const distancia = this.calcularDistanciaEntrePuntos(this.shipPosition, godzillaPos);
        
        this.hudManager.updateData({
            shipHealth: this.shipHealth,
            leftEngine: propulsores.izquierdo,
            rightEngine: propulsores.derecho,
            powerLevel: (this.propulsorManager.getPoderBase() / 15000) * 100,
            distance: distancia,
            timeRemaining: 120,
            alerts: this.generarAlertas()
        });
        
        // Renderizar HUD
        this.hudManager.render();
        
        await this.waitForUserInput('Presiona ENTER para continuar...');
    }

    /**
     * Calcula la distancia entre dos puntos
     */
    private calcularDistanciaEntrePuntos(pos1: { x: number; y: number }, pos2: { x: number; y: number }): number {
        const dx = pos1.x - pos2.x;
        const dy = pos1.y - pos2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Genera alertas basadas en el estado del juego
     */
    private generarAlertas(): string[] {
        const alertas: string[] = [];
        const propulsores = this.propulsorManager.getPropulsoresState();
        const godzillaPos = this.godzilla.getPosition();
        const distancia = this.calcularDistanciaEntrePuntos(this.shipPosition, godzillaPos);
        
        if (!propulsores.izquierdo || !propulsores.derecho) {
            alertas.push('Propulsor fallido detectado');
        }
        
        if (distancia < 100) {
            alertas.push('Godzilla en rango de ataque crítico');
        } else if (distancia < 300) {
            alertas.push('Godzilla se aproxima peligrosamente');
        }
        
        if (this.shipHealth < 30) {
            alertas.push('Salud de la nave crítica');
        }
        
        return alertas;
    }

    /**
     * Muestra estadísticas del juego
     */
    private async mostrarEstadisticas(): Promise<void> {
        console.clear();
        
        const propulsores = this.propulsorManager.getPropulsoresState();
        const godzillaPos = this.godzilla.getPosition();
        
        console.log(chalk.blue.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  📊 ESTADÍSTICAS DE LA MISIÓN 📊                                            ║
    ║                                                                              ║
    ║  Estado del juego: ${this.gameState.toUpperCase()}                           ║                            
    ║                                                                              ║
    ║  Propulsores:                                                                ║
    ║    • Izquierdo: ${propulsores.izquierdo ? '✅ Operativo' : '❌ Fallido'}    ║                
    ║    • Derecho: ${propulsores.derecho ? '✅ Operativo' : '❌ Fallido'}        ║               
    ║                                                                              ║
    ║  Godzilla:                                                                   ║
    ║    • Posición: (${godzillaPos.x.toFixed(1)}, ${godzillaPos.y.toFixed(1)}) metros                        
    ║    • Super Charge: ${this.godzilla.isSuperChargeActive() ? '⚡ Activo' : '❌ Inactivo'}                                    
    ║                                                                              ║
    ║  Nave:                                                                       ║
    ║    • Posición: (${this.shipPosition.x}, ${this.shipPosition.y}) metros       ║                 
    ║                                                                              ║
        `));
        
        AIHelper.showAIStats();
        
        await this.waitForUserInput('Presiona ENTER para continuar...');
    }

    /**
     * Espera la entrada del usuario
     */
    private async waitForUserInput(message: string): Promise<void> {
        readlineSync.question(chalk.yellow(`\n${message}`));
    }

    /**
     * Finaliza el juego
     */
    async endGame(): Promise<void> {
        console.clear();
        
        if (this.gameState === 'victory') {
            SceneManager.showVictoryScene();
        } else {
            SceneManager.showDefeatScene();
        }
        
        console.log(chalk.yellow.bold('\n¡Gracias por jugar! El destino del mundo estaba en tus manos.'));
        console.log(chalk.blue('Presiona ENTER para salir...'));
        readlineSync.question();
    }
}
