const chalk = require('chalk');

export class CalculosManager {
    
    /**
     * Calcula la distancia usando la fórmula de Pitágoras
     * @param x1 Coordenada X del primer punto
     * @param y1 Coordenada Y del primer punto
     * @param x2 Coordenada X del segundo punto
     * @param y2 Coordenada Y del segundo punto
     * @returns Distancia en metros (multiplicada por 100)
     */
    static calcularDistancia(x1: number, y1: number, x2: number, y2: number): number {
        // Aplicar multiplicador de 100 para convertir a metros
        const x1M = x1 * 100;
        const y1M = y1 * 100;
        const x2M = x2 * 100;
        const y2M = y2 * 100;
        
        // Fórmula de Pitágoras: sqrt((x2-x1)^2 + (y2-y1)^2)
        const dx = x2M - x1M;
        const dy = y2M - y1M;
        const distancia = Math.sqrt(dx * dx + dy * dy);
        
        return distancia;
    }

    /**
     * Valida las coordenadas de entrada
     * @param x1 Coordenada X del primer punto
     * @param y1 Coordenada Y del primer punto
     * @param x2 Coordenada X del segundo punto
     * @param y2 Coordenada Y del segundo punto
     * @returns Objeto con validación y mensaje
     */
    static validarCoordenadas(x1: number, y1: number, x2: number, y2: number): { valido: boolean; mensaje: string } {
        // Verificar rango [50-1000]
        if (x1 < 50 || x1 > 1000 || y1 < 50 || y1 > 1000 || x2 < 50 || x2 > 1000 || y2 < 50 || y2 > 1000) {
            return {
                valido: false,
                mensaje: "❌ Error: Todas las coordenadas deben estar entre 50 y 1000"
            };
        }

        // Verificar que todos los valores sean diferentes
        const valores = [x1, y1, x2, y2];
        const valoresUnicos = new Set(valores);
        
        if (valoresUnicos.size !== 4) {
            return {
                valido: false,
                mensaje: "❌ Error: Todas las coordenadas deben ser diferentes entre sí"
            };
        }

        return {
            valido: true,
            mensaje: "✅ Coordenadas válidas"
        };
    }

    /**
     * Genera un código de seguridad con 10 números aleatorios
     * @returns Array de números ordenados de forma descendente
     */
    static generarCodigoSeguridad(): number[] {
        const codigo: number[] = [];
        
        // Generar 10 números que cumplan n % 50 == 1
        while (codigo.length < 10) {
            // Generar número aleatorio entre 1 y 1000
            const numeroAleatorio = Math.floor(Math.random() * 1000) + 1;
            
            // Verificar congruencia n % 50 == 1
            if (numeroAleatorio % 50 === 1) {
                // Verificar que no esté duplicado
                if (!codigo.includes(numeroAleatorio)) {
                    codigo.push(numeroAleatorio);
                }
            }
        }
        
        // Ordenar de forma estrictamente descendente
        codigo.sort((a, b) => b - a);
        
        return codigo;
    }

    /**
     * Valida el código de seguridad generado
     * @param codigo Array de números a validar
     * @returns Objeto con validación y mensaje
     */
    static validarCodigoSeguridad(codigo: number[]): { valido: boolean; mensaje: string } {
        // Verificar longitud
        if (codigo.length !== 10) {
            return {
                valido: false,
                mensaje: "❌ Error: El código debe tener exactamente 10 números"
            };
        }

        // Verificar congruencia n % 50 == 1
        for (const numero of codigo) {
            if (numero % 50 !== 1) {
                return {
                    valido: false,
                    mensaje: `❌ Error: El número ${numero} no cumple la congruencia n % 50 == 1`
                };
            }
        }

        // Verificar orden descendente
        for (let i = 0; i < codigo.length - 1; i++) {
            if (codigo[i] <= codigo[i + 1]) {
                return {
                    valido: false,
                    mensaje: "❌ Error: El código no está ordenado de forma estrictamente descendente"
                };
            }
        }

        // Verificar unicidad
        const numerosUnicos = new Set(codigo);
        if (numerosUnicos.size !== 10) {
            return {
                valido: false,
                mensaje: "❌ Error: El código contiene números duplicados"
            };
        }

        return {
            valido: true,
            mensaje: "✅ Código de seguridad válido"
        };
    }

    /**
     * Simula la secuencia de despegue con escala 5x
     * @param duracionMinutos Duración en minutos (por defecto 2)
     * @param callback Función a llamar en cada actualización
     */
    static async simularSecuenciaDespegue(duracionMinutos: number = 2, callback?: (progreso: number, tiempoSimulado: number) => void): Promise<void> {
        const duracionSegundos = duracionMinutos * 60; // 2 minutos = 120 segundos
        const escala = 5; // Escala 5x
        const duracionReal = duracionSegundos / escala; // 24 segundos reales
        const intervaloReal = 1000; // 1 segundo real
        const incrementoTiempoSimulado = 5; // 5 segundos simulados por segundo real
        
        console.log(chalk.green.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  🚀 INICIANDO SECUENCIA DE DESPEGUE 🚀                                     ║
    ║                                                                              ║
    ║  Duración: ${duracionMinutos} minutos (escala ${escala}x)                                    ║
    ║  Tiempo real: ${duracionReal} segundos                                      ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));

        let tiempoSimulado = 0;
        const totalPasos = Math.ceil(duracionSegundos / incrementoTiempoSimulado);
        
        for (let paso = 0; paso < totalPasos; paso++) {
            tiempoSimulado = Math.min(paso * incrementoTiempoSimulado, duracionSegundos);
            const progreso = (tiempoSimulado / duracionSegundos) * 100;
            
            // Mostrar progreso
            const barraProgreso = this.generarBarraProgreso(progreso);
            console.log(chalk.blue(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  ⏱️  Tiempo Simulado: ${tiempoSimulado.toString().padStart(3)}s / ${duracionSegundos}s                    ║
    ║  📊 Progreso: ${progreso.toFixed(1).padStart(5)}% ${barraProgreso}                    ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
            `));
            
            // Llamar callback si se proporciona
            if (callback) {
                callback(progreso, tiempoSimulado);
            }
            
            // Esperar 1 segundo real
            await new Promise(resolve => setTimeout(resolve, intervaloReal));
        }
        
        console.log(chalk.green.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  ✅ DESPEGUE COMPLETO ✅                                                    ║
    ║                                                                              ║
    ║  La nave ha despegado exitosamente!                                         ║
    ║  La humanidad está a salvo!                                                 ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }

    /**
     * Genera una barra de progreso visual
     * @param porcentaje Porcentaje de progreso (0-100)
     * @returns String con la barra de progreso
     */
    private static generarBarraProgreso(porcentaje: number): string {
        const longitudBarra = 20;
        const caracteresLlenos = Math.floor((porcentaje / 100) * longitudBarra);
        const caracteresVacios = longitudBarra - caracteresLlenos;
        
        const barra = '█'.repeat(caracteresLlenos) + '░'.repeat(caracteresVacios);
        return `[${barra}]`;
    }

    /**
     * Muestra los cálculos de distancia de forma detallada
     * @param x1 Coordenada X del primer punto
     * @param y1 Coordenada Y del primer punto
     * @param x2 Coordenada X del segundo punto
     * @param y2 Coordenada Y del segundo punto
     */
    static mostrarCalculoDistancia(x1: number, y1: number, x2: number, y2: number): void {
        const distancia = this.calcularDistancia(x1, y1, x2, y2);
        
        console.log(chalk.blue.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  📐 CÁLCULO DE DISTANCIA (FÓRMULA DE PITÁGORAS) 📐                         ║
    ║                                                                              ║
    ║  Punto 1: (${x1}, ${y1}) → (${x1 * 100}, ${y1 * 100}) metros                        ║
    ║  Punto 2: (${x2}, ${y2}) → (${x2 * 100}, ${y2 * 100}) metros                        ║
    ║                                                                              ║
    ║  Fórmula: dist = √[(x2-x1)² + (y2-y1)²]                                    ║
    ║                                                                              ║
    ║  Cálculo:                                                                   ║
    ║    dx = ${x2 * 100} - ${x1 * 100} = ${(x2 - x1) * 100} metros                              ║
    ║    dy = ${y2 * 100} - ${y1 * 100} = ${(y2 - y1) * 100} metros                              ║
    ║    dist = √[${(x2 - x1) * 100}² + ${(y2 - y1) * 100}²] = √[${Math.pow((x2 - x1) * 100, 2)} + ${Math.pow((y2 - y1) * 100, 2)}] = ${distancia.toFixed(2)} metros ║
    ║                                                                              ║
    ║  📏 DISTANCIA FINAL: ${distancia.toFixed(2)} metros                                    ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }

    /**
     * Muestra el código de seguridad generado
     * @param codigo Array de números del código
     */
    static mostrarCodigoSeguridad(codigo: number[]): void {
        console.log(chalk.blue.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  🔐 CÓDIGO DE SEGURIDAD GENERADO 🔐                                         ║
    ║                                                                              ║
    ║  Criterios cumplidos:                                                       ║
    ║  ✅ 10 números generados                                                    ║
    ║  ✅ Todos cumplen n % 50 == 1                                               ║
    ║  ✅ Ordenados de forma estrictamente descendente                            ║
    ║  ✅ Sin duplicados                                                          ║
    ║                                                                              ║
    ║  Código: ${codigo.join(' - ')}                                    ║
    ║                                                                              ║
    ║  ⚠️  Este código es esencial para el despegue                               ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }
}
