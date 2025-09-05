"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const readlineSync = __importStar(require("readline-sync"));
const chalk = require('chalk');
const audio_1 = require("./engine/audio");
const scenes_1 = require("./engine/scenes");
const aiHelper_1 = require("./engine/aiHelper");
const minimap_1 = require("./engine/minimap");
const animations_1 = require("./engine/animations");
const hud_1 = require("./engine/hud");
const effects_1 = require("./engine/effects");
const propulsores_1 = require("./logic/propulsores");
const godzilla_1 = require("./logic/godzilla");
const calculos_1 = require("./logic/calculos");
class Game {
    constructor() {
        this.gameState = 'intro';
        this.shipPosition = { x: 500, y: 500 };
        this.shipHealth = 100;
        this.audioManager = new audio_1.AudioManager();
        this.propulsorManager = new propulsores_1.PropulsorManager();
        this.godzilla = new godzilla_1.Godzilla();
        this.miniMap = new minimap_1.MiniMap();
        this.hudManager = new hud_1.HUDManager();
    }
    /**
     * Inicia el juego
     */
    async start() {
        console.clear();
        scenes_1.SceneManager.showIntroScene();
        console.log(chalk.yellow.bold('\nPresiona ENTER para comenzar la misión...'));
        readlineSync.question();
        await this.playIntroSequence();
        await this.mainGameLoop();
    }
    /**
     * Reproduce la secuencia de introducción
     */
    async playIntroSequence() {
        console.log(chalk.blue.bold('\n🔊 Reproduciendo audio de introducción...'));
        await this.audioManager.playGodzillaRoar();
        // Simular detección de Godzilla
        setTimeout(() => {
            scenes_1.SceneManager.showGodzillaDetectedScene();
        }, 2000);
        await this.waitForUserInput('Presiona ENTER para continuar...');
    }
    /**
     * Bucle principal del juego
     */
    async mainGameLoop() {
        this.gameState = 'playing';
        while (this.gameState === 'playing') {
            await this.showMainMenu();
        }
    }
    /**
     * Muestra el menú principal
     */
    async showMainMenu() {
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
    async verificarPropulsores() {
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
    async calcularDistancia() {
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
        let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
        while (!coordenadasValidas) {
            try {
                x1 = parseInt(readlineSync.question('Coordenada X1: ')) || 0;
                y1 = parseInt(readlineSync.question('Coordenada Y1: ')) || 0;
                x2 = parseInt(readlineSync.question('Coordenada X2: ')) || 0;
                y2 = parseInt(readlineSync.question('Coordenada Y2: ')) || 0;
                const validacion = calculos_1.CalculosManager.validarCoordenadas(x1, y1, x2, y2);
                if (validacion.valido) {
                    coordenadasValidas = true;
                    console.log(chalk.green(validacion.mensaje));
                }
                else {
                    console.log(chalk.red(validacion.mensaje));
                    console.log(chalk.yellow('Intenta nuevamente...\n'));
                }
            }
            catch (error) {
                console.log(chalk.red('❌ Error: Ingresa números válidos.'));
            }
        }
        const distancia = calculos_1.CalculosManager.calcularDistancia(x1, y1, x2, y2);
        calculos_1.CalculosManager.mostrarCalculoDistancia(x1, y1, x2, y2);
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
        }
        else {
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
    async generarCodigoSeguridad() {
        console.clear();
        scenes_1.SceneManager.showSecurityCodeScene();
        console.log(chalk.blue('Generando código de seguridad...'));
        // Simular tiempo de generación
        for (let i = 0; i < 3; i++) {
            console.log(chalk.yellow(`Procesando... ${i + 1}/3`));
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        const codigo = calculos_1.CalculosManager.generarCodigoSeguridad();
        const validacion = calculos_1.CalculosManager.validarCodigoSeguridad(codigo);
        console.log(chalk.green(validacion.mensaje));
        calculos_1.CalculosManager.mostrarCodigoSeguridad(codigo);
        await this.waitForUserInput('Presiona ENTER para continuar...');
    }
    /**
     * Intenta el despegue
     */
    async intentarDespegue() {
        console.clear();
        scenes_1.SceneManager.showEscapeScene();
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
            scenes_1.SceneManager.showGameOverScene();
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
        let potencia = 0;
        while (!potenciaValida) {
            try {
                potencia = parseInt(readlineSync.question('Potencia (unidades): ')) || 0;
                if (potencia > 0) {
                    potenciaValida = true;
                }
                else {
                    console.log(chalk.red('❌ Error: La potencia debe ser mayor a 0.'));
                }
            }
            catch (error) {
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
        }
        else {
            console.log(chalk.red('El despegue no es posible con la potencia actual.'));
            await this.waitForUserInput('Presiona ENTER para continuar...');
        }
    }
    /**
     * Ejecuta la secuencia de despegue
     */
    async ejecutarSecuenciaDespegue() {
        console.clear();
        scenes_1.SceneManager.showLaunchSequenceScene();
        await this.audioManager.playRocketIgnition();
        const opcion = readlineSync.keyInSelect(['✅ Confirmar despegue', '❌ Cancelar'], '¿Confirmas el despegue?');
        if (opcion === 0) {
            // Mostrar animación de despegue
            await animations_1.AnimationManager.animateShipLaunch();
            // Mostrar efectos de partículas
            await effects_1.EffectsManager.showParticleEffect('fire');
            await this.audioManager.playLaunchSound();
            await calculos_1.CalculosManager.simularSecuenciaDespegue(2, (progreso, tiempoSimulado) => {
                // Callback para mostrar progreso adicional
                if (tiempoSimulado % 30 === 0) {
                    console.log(chalk.green(`✅ Sistema ${Math.floor(tiempoSimulado / 30)} verificado`));
                }
            });
            this.gameState = 'victory';
        }
        else {
            console.log(chalk.yellow('Despegue cancelado.'));
            await this.waitForUserInput('Presiona ENTER para continuar...');
        }
    }
    /**
     * Entra en combate con Godzilla
     */
    async entrarEnCombate() {
        console.clear();
        scenes_1.SceneManager.showCombatScene();
        await this.audioManager.playGodzillaRoar();
        const opcion = readlineSync.keyInSelect(['⚔️  Atacar directamente', '🛡️  Defender', '🏃 Intentar huir'], '¿Qué acción tomas?');
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
    async combatirDirectamente() {
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
        await animations_1.AnimationManager.animateGodzillaWalking();
        // Mostrar efectos de explosión
        await effects_1.EffectsManager.chainExplosionEffect();
        // Mostrar efecto de pantalla temblorosa
        await effects_1.EffectsManager.screenShake(5);
        await this.audioManager.playAttackSound();
        // Godzilla contraataca
        this.godzilla.executeAllAttacks();
        // Mostrar pantalla de GAME OVER por combate
        await this.waitForUserInput('Presiona ENTER para ver el GAME OVER...');
        scenes_1.SceneManager.showCombatGameOverScene();
        this.gameState = 'defeat';
    }
    /**
     * Intenta defender
     */
    async defender() {
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
        scenes_1.SceneManager.showCombatGameOverScene();
        this.gameState = 'defeat';
    }
    /**
     * Intenta huir
     */
    async intentarHuir() {
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
        scenes_1.SceneManager.showCombatGameOverScene();
        this.gameState = 'defeat';
    }
    /**
     * Pide consejo a la IA
     */
    async pedirConsejoIA() {
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
                aiHelper_1.AIHelper.getPropulsorAdvice();
                break;
            case 1:
                aiHelper_1.AIHelper.getDistanceAdvice();
                break;
            case 2:
                aiHelper_1.AIHelper.getSecurityCodeAdvice();
                break;
            case 3:
                aiHelper_1.AIHelper.getCombatAdvice();
                break;
            case 4:
                aiHelper_1.AIHelper.getEscapeAdvice();
                break;
            case 5:
                aiHelper_1.AIHelper.getGeneralAdvice();
                break;
            default:
                console.log(chalk.yellow('Operación cancelada.'));
        }
        await this.waitForUserInput('Presiona ENTER para continuar...');
    }
    /**
     * Muestra el mini mapa
     */
    async mostrarMiniMapa() {
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
    async mostrarHUDCompleto() {
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
    calcularDistanciaEntrePuntos(pos1, pos2) {
        const dx = pos1.x - pos2.x;
        const dy = pos1.y - pos2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    /**
     * Genera alertas basadas en el estado del juego
     */
    generarAlertas() {
        const alertas = [];
        const propulsores = this.propulsorManager.getPropulsoresState();
        const godzillaPos = this.godzilla.getPosition();
        const distancia = this.calcularDistanciaEntrePuntos(this.shipPosition, godzillaPos);
        if (!propulsores.izquierdo || !propulsores.derecho) {
            alertas.push('Propulsor fallido detectado');
        }
        if (distancia < 100) {
            alertas.push('Godzilla en rango de ataque crítico');
        }
        else if (distancia < 300) {
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
    async mostrarEstadisticas() {
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
        aiHelper_1.AIHelper.showAIStats();
        await this.waitForUserInput('Presiona ENTER para continuar...');
    }
    /**
     * Espera la entrada del usuario
     */
    async waitForUserInput(message) {
        readlineSync.question(chalk.yellow(`\n${message}`));
    }
    /**
     * Finaliza el juego
     */
    async endGame() {
        console.clear();
        if (this.gameState === 'victory') {
            scenes_1.SceneManager.showVictoryScene();
        }
        else {
            scenes_1.SceneManager.showDefeatScene();
        }
        console.log(chalk.yellow.bold('\n¡Gracias por jugar! El destino del mundo estaba en tus manos.'));
        console.log(chalk.blue('Presiona ENTER para salir...'));
        readlineSync.question();
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map