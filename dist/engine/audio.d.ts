export declare class AudioManager {
    private player;
    private soundsPath;
    constructor();
    /**
     * Reproduce el rugido de Godzilla
     */
    playGodzillaRoar(): Promise<void>;
    /**
     * Reproduce el sonido de encendido de propulsores
     */
    playRocketIgnition(): Promise<void>;
    /**
     * Reproduce el sonido de ataque
     */
    playAttackSound(): Promise<void>;
    /**
     * Reproduce el sonido de despegue
     */
    playLaunchSound(): Promise<void>;
    /**
     * Reproduce un sonido personalizado
     */
    playCustomSound(filename: string): Promise<void>;
}
//# sourceMappingURL=audio.d.ts.map