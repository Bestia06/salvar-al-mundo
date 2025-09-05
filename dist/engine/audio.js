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
exports.AudioManager = void 0;
// @ts-ignore
const player = __importStar(require("play-sound"));
const path = __importStar(require("path"));
class AudioManager {
    constructor() {
        this.player = player;
        this.soundsPath = path.join(__dirname, '../../sounds');
    }
    /**
     * Reproduce el rugido de Godzilla
     */
    async playGodzillaRoar() {
        try {
            const soundPath = path.join(this.soundsPath, 'roar.mp3');
            console.log('🔊 Reproduciendo rugido de Godzilla...');
            this.player(soundPath, (err) => {
                if (err) {
                    console.log('⚠️  No se pudo reproducir el rugido (archivo no encontrado)');
                }
            });
        }
        catch (error) {
            console.log('⚠️  Error al reproducir audio de rugido');
        }
    }
    /**
     * Reproduce el sonido de encendido de propulsores
     */
    async playRocketIgnition() {
        try {
            const soundPath = path.join(this.soundsPath, 'rocket.mp3');
            console.log('🚀 Reproduciendo encendido de propulsores...');
            this.player(soundPath, (err) => {
                if (err) {
                    console.log('⚠️  No se pudo reproducir el sonido de propulsores (archivo no encontrado)');
                }
            });
        }
        catch (error) {
            console.log('⚠️  Error al reproducir audio de propulsores');
        }
    }
    /**
     * Reproduce el sonido de ataque
     */
    async playAttackSound() {
        try {
            const soundPath = path.join(this.soundsPath, 'attack.mp3');
            console.log('💥 Reproduciendo sonido de ataque...');
            this.player(soundPath, (err) => {
                if (err) {
                    console.log('⚠️  No se pudo reproducir el sonido de ataque (archivo no encontrado)');
                }
            });
        }
        catch (error) {
            console.log('⚠️  Error al reproducir audio de ataque');
        }
    }
    /**
     * Reproduce el sonido de despegue
     */
    async playLaunchSound() {
        try {
            const soundPath = path.join(this.soundsPath, 'launch.mp3');
            console.log('🚀 Reproduciendo sonido de despegue...');
            this.player(soundPath, (err) => {
                if (err) {
                    console.log('⚠️  No se pudo reproducir el sonido de despegue (archivo no encontrado)');
                }
            });
        }
        catch (error) {
            console.log('⚠️  Error al reproducir audio de despegue');
        }
    }
    /**
     * Reproduce un sonido personalizado
     */
    async playCustomSound(filename) {
        try {
            const soundPath = path.join(this.soundsPath, filename);
            this.player(soundPath, (err) => {
                if (err) {
                    console.log(`⚠️  No se pudo reproducir ${filename} (archivo no encontrado)`);
                }
            });
        }
        catch (error) {
            console.log(`⚠️  Error al reproducir ${filename}`);
        }
    }
}
exports.AudioManager = AudioManager;
//# sourceMappingURL=audio.js.map