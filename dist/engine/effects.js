"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EffectsManager = void 0;
const chalk = require('chalk');
class EffectsManager {
    /**
     * Efecto de partículas
     */
    static async showParticleEffect(type) {
        const particles = {
            fire: '🔥',
            smoke: '💨',
            spark: '✨',
            energy: '⚡'
        };
        const particle = particles[type];
        const frames = 5;
        for (let i = 0; i < frames; i++) {
            console.clear();
            // Crear efecto de partículas
            let effect = '';
            for (let y = 0; y < 10; y++) {
                effect += '    ';
                for (let x = 0; x < 20; x++) {
                    if (Math.random() < 0.3) {
                        effect += particle;
                    }
                    else {
                        effect += ' ';
                    }
                }
                effect += '\n';
            }
            console.log(chalk.yellow.bold(effect));
            await this.delay(200);
        }
    }
    /**
     * Efecto de pantalla temblorosa
     */
    static async screenShake(intensity = 3) {
        const frames = 10;
        for (let i = 0; i < frames; i++) {
            console.clear();
            // Simular temblor moviendo el contenido
            const offset = Math.floor(Math.random() * intensity) - Math.floor(intensity / 2);
            const spaces = ' '.repeat(Math.max(0, offset));
            console.log(chalk.red.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  ${spaces}💥 IMPACTO DETECTADO 💥${spaces}                                    ║
    ║                                                                              ║
    ║  ${spaces}⚠️  LA NAVE ESTÁ TEMBLANDO ⚠️${spaces}                              ║
    ║                                                                              ║
    ║  ${spaces}🚨 SISTEMAS CRÍTICOS AFECTADOS 🚨${spaces}                         ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
            `));
            await this.delay(100);
        }
    }
    /**
     * Efecto de flash de pantalla
     */
    static async screenFlash(color) {
        const flashFrames = 3;
        for (let i = 0; i < flashFrames; i++) {
            console.clear();
            // Crear flash de pantalla
            let flash = '';
            for (let y = 0; y < 20; y++) {
                flash += '█'.repeat(80) + '\n';
            }
            console.log(chalk[color].bold(flash));
            await this.delay(150);
        }
    }
    /**
     * Efecto de ondas de choque
     */
    static async shockwaveEffect() {
        const frames = 8;
        for (let i = 0; i < frames; i++) {
            console.clear();
            const radius = i * 2;
            const centerX = 40;
            const centerY = 10;
            let effect = '';
            for (let y = 0; y < 20; y++) {
                effect += '    ';
                for (let x = 0; x < 80; x++) {
                    const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
                    if (Math.abs(distance - radius) < 1) {
                        effect += '💥';
                    }
                    else {
                        effect += ' ';
                    }
                }
                effect += '\n';
            }
            console.log(chalk.yellow.bold(effect));
            await this.delay(200);
        }
    }
    /**
     * Efecto de rayo de energía
     */
    static async energyBeamEffect() {
        const frames = 6;
        for (let i = 0; i < frames; i++) {
            console.clear();
            let beam = '';
            for (let y = 0; y < 20; y++) {
                beam += '    ';
                for (let x = 0; x < 80; x++) {
                    if (x >= 20 && x <= 60 && Math.abs(y - 10) < 2) {
                        beam += '⚡';
                    }
                    else if (x >= 15 && x <= 65 && Math.abs(y - 10) < 3) {
                        beam += '✨';
                    }
                    else {
                        beam += ' ';
                    }
                }
                beam += '\n';
            }
            console.log(chalk.cyan.bold(beam));
            await this.delay(300);
        }
    }
    /**
     * Efecto de humo
     */
    static async smokeEffect() {
        const frames = 10;
        for (let i = 0; i < frames; i++) {
            console.clear();
            let smoke = '';
            for (let y = 0; y < 20; y++) {
                smoke += '    ';
                for (let x = 0; x < 80; x++) {
                    if (Math.random() < 0.2 && y > 15) {
                        smoke += '💨';
                    }
                    else {
                        smoke += ' ';
                    }
                }
                smoke += '\n';
            }
            console.log(chalk.gray.bold(smoke));
            await this.delay(250);
        }
    }
    /**
     * Efecto de explosión en cadena
     */
    static async chainExplosionEffect() {
        const explosions = [
            { x: 20, y: 10 },
            { x: 40, y: 8 },
            { x: 60, y: 12 },
            { x: 30, y: 15 },
            { x: 50, y: 6 }
        ];
        for (const explosion of explosions) {
            await this.showExplosionAt(explosion.x, explosion.y);
            await this.delay(300);
        }
    }
    /**
     * Muestra una explosión en una posición específica
     */
    static async showExplosionAt(x, y) {
        const frames = 4;
        for (let i = 0; i < frames; i++) {
            console.clear();
            const radius = i * 2;
            let explosion = '';
            for (let py = 0; py < 20; py++) {
                explosion += '    ';
                for (let px = 0; px < 80; px++) {
                    const distance = Math.sqrt((px - x) ** 2 + (py - y) ** 2);
                    if (distance <= radius) {
                        explosion += '💥';
                    }
                    else {
                        explosion += ' ';
                    }
                }
                explosion += '\n';
            }
            console.log(chalk.red.bold(explosion));
            await this.delay(150);
        }
    }
    /**
     * Efecto de carga de energía
     */
    static async energyChargeEffect() {
        const frames = 8;
        for (let i = 0; i < frames; i++) {
            console.clear();
            const intensity = i / frames;
            let charge = '';
            for (let y = 0; y < 20; y++) {
                charge += '    ';
                for (let x = 0; x < 80; x++) {
                    if (Math.random() < intensity * 0.5) {
                        charge += '⚡';
                    }
                    else {
                        charge += ' ';
                    }
                }
                charge += '\n';
            }
            console.log(chalk.blue.bold(charge));
            await this.delay(200);
        }
    }
    /**
     * Función de delay
     */
    static delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
exports.EffectsManager = EffectsManager;
//# sourceMappingURL=effects.js.map