"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIHelper = void 0;
const chalk = require('chalk');
class AIHelper {
    /**
     * Proporciona consejo estratégico al jugador
     */
    static provideAdvice(context) {
        this.adviceCount++;
        const advice = this.getAdviceByContext(context);
        console.log(chalk.cyan.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  🤖 CONSEJO DE LA IA ALIADA 🤖                                              ║
    ║                                                                              ║
    ║  ${advice}                                                                   ║
    ║                                                                              ║
    ║  Recuerda: La decisión final es tuya, soldado.                               ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
        return advice;
    }
    /**
     * Obtiene consejo específico según el contexto
     */
    static getAdviceByContext(context) {
        const adviceMap = {
            'propulsores': [
                'Analiza el estado de ambos propulsores antes de decidir. Si ambos están funcionando, necesitarás solo 75% de potencia.',
                'Si solo un propulsor funciona, los cálculos se vuelven más complejos. Considera la fórmula especial requerida.',
                'NUNCA intentes despegar sin al menos un propulsor funcional. Es una misión suicida.',
                'La potencia base es la suma del hidroPropulsor (5000) y la potencia del sistema (10000).'
            ],
            'distancia': [
                'Mantén la distancia por encima de 300 metros para evitar la detección de Godzilla.',
                'Usa la fórmula de Pitágoras para calcular distancias precisas. Cada metro cuenta.',
                'El velo de invisibilidad solo funciona a distancias superiores a 300 metros.',
                'Recuerda multiplicar las coordenadas por 100 para obtener la distancia real en metros.'
            ],
            'codigo': [
                'El código de seguridad debe contener 10 números que cumplan la congruencia n % 50 == 1.',
                'Los números deben estar ordenados de forma estrictamente descendente.',
                'Sin este código, la secuencia de despegue no puede iniciarse.',
                'Cada número debe ser único para mayor seguridad.'
            ],
            'combate': [
                'Si ambos propulsores fallan, Godzilla activará Super Charge y sus ataques se multiplicarán x10.',
                'Los tres ataques de Godzilla son: Aliento Atómico, Rayo Espiral y Golpe de Cola.',
                'En combate directo, las posibilidades de supervivencia son mínimas. Evita el enfrentamiento.',
                'La mejor estrategia es el escape, no el combate directo.'
            ],
            'escape': [
                'El escape es la opción más segura para salvar a la humanidad.',
                'Asegúrate de que todos los sistemas estén funcionando antes del despegue.',
                'La secuencia de despegue toma 2 minutos en escala 5x (24 segundos reales).',
                'Una vez iniciado el despegue, no hay vuelta atrás.'
            ],
            'general': [
                'Mantén la calma y analiza cada situación cuidadosamente.',
                'Cada decisión que tomes afectará el destino de la humanidad.',
                'Usa todos los recursos disponibles, incluyendo mis consejos.',
                'La supervivencia de la humanidad depende de tu éxito en esta misión.'
            ]
        };
        const contextAdvice = adviceMap[context] || adviceMap['general'];
        const randomIndex = Math.floor(Math.random() * contextAdvice.length);
        return contextAdvice[randomIndex];
    }
    /**
     * Proporciona consejo sobre propulsores
     */
    static getPropulsorAdvice() {
        return this.provideAdvice('propulsores');
    }
    /**
     * Proporciona consejo sobre distancia
     */
    static getDistanceAdvice() {
        return this.provideAdvice('distancia');
    }
    /**
     * Proporciona consejo sobre código de seguridad
     */
    static getSecurityCodeAdvice() {
        return this.provideAdvice('codigo');
    }
    /**
     * Proporciona consejo sobre combate
     */
    static getCombatAdvice() {
        return this.provideAdvice('combate');
    }
    /**
     * Proporciona consejo sobre escape
     */
    static getEscapeAdvice() {
        return this.provideAdvice('escape');
    }
    /**
     * Proporciona consejo general
     */
    static getGeneralAdvice() {
        return this.provideAdvice('general');
    }
    /**
     * Obtiene el número de consejos dados
     */
    static getAdviceCount() {
        return this.adviceCount;
    }
    /**
     * Muestra estadísticas de la IA
     */
    static showAIStats() {
        console.log(chalk.cyan.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  📊 ESTADÍSTICAS DE LA IA ALIADA 📊                                         ║
    ║                                                                              ║
    ║  Consejos proporcionados: ${this.adviceCount}                                ║
    ║  Estado: Operativo                                                           ║
    ║  Misión: Asistir en la salvación de la humanidad                             ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }
}
exports.AIHelper = AIHelper;
AIHelper.adviceCount = 0;
//# sourceMappingURL=aiHelper.js.map