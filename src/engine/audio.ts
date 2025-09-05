// @ts-ignore
import * as player from 'play-sound';
import * as path from 'path';

export class AudioManager {
    private player: any;
    private soundsPath: string;

    constructor() {
        this.player = player;
        this.soundsPath = path.join(__dirname, '../../sounds');
    }

    /**
     * Reproduce el rugido de Godzilla
     */
    async playGodzillaRoar(): Promise<void> {
        try {
            const soundPath = path.join(this.soundsPath, 'roar.mp3');
            console.log('🔊 Reproduciendo rugido de Godzilla...');
            this.player(soundPath, (err: any) => {
                if (err) {
                    console.log('⚠️  No se pudo reproducir el rugido (archivo no encontrado)');
                }
            });
        } catch (error) {
            console.log('⚠️  Error al reproducir audio de rugido');
        }
    }

    /**
     * Reproduce el sonido de encendido de propulsores
     */
    async playRocketIgnition(): Promise<void> {
        try {
            const soundPath = path.join(this.soundsPath, 'rocket.mp3');
            console.log('🚀 Reproduciendo encendido de propulsores...');
            this.player(soundPath, (err: any) => {
                if (err) {
                    console.log('⚠️  No se pudo reproducir el sonido de propulsores (archivo no encontrado)');
                }
            });
        } catch (error) {
            console.log('⚠️  Error al reproducir audio de propulsores');
        }
    }

    /**
     * Reproduce el sonido de ataque
     */
    async playAttackSound(): Promise<void> {
        try {
            const soundPath = path.join(this.soundsPath, 'attack.mp3');
            console.log('💥 Reproduciendo sonido de ataque...');
            this.player(soundPath, (err: any) => {
                if (err) {
                    console.log('⚠️  No se pudo reproducir el sonido de ataque (archivo no encontrado)');
                }
            });
        } catch (error) {
            console.log('⚠️  Error al reproducir audio de ataque');
        }
    }

    /**
     * Reproduce el sonido de despegue
     */
    async playLaunchSound(): Promise<void> {
        try {
            const soundPath = path.join(this.soundsPath, 'launch.mp3');
            console.log('🚀 Reproduciendo sonido de despegue...');
            this.player(soundPath, (err: any) => {
                if (err) {
                    console.log('⚠️  No se pudo reproducir el sonido de despegue (archivo no encontrado)');
                }
            });
        } catch (error) {
            console.log('⚠️  Error al reproducir audio de despegue');
        }
    }

    /**
     * Reproduce un sonido personalizado
     */
    async playCustomSound(filename: string): Promise<void> {
        try {
            const soundPath = path.join(this.soundsPath, filename);
            this.player(soundPath, (err: any) => {
                if (err) {
                    console.log(`⚠️  No se pudo reproducir ${filename} (archivo no encontrado)`);
                }
            });
        } catch (error) {
            console.log(`⚠️  Error al reproducir ${filename}`);
        }
    }
}
