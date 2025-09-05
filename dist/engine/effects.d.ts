export declare class EffectsManager {
    /**
     * Efecto de partículas
     */
    static showParticleEffect(type: 'fire' | 'smoke' | 'spark' | 'energy'): Promise<void>;
    /**
     * Efecto de pantalla temblorosa
     */
    static screenShake(intensity?: number): Promise<void>;
    /**
     * Efecto de flash de pantalla
     */
    static screenFlash(color: 'red' | 'white' | 'yellow' | 'blue'): Promise<void>;
    /**
     * Efecto de ondas de choque
     */
    static shockwaveEffect(): Promise<void>;
    /**
     * Efecto de rayo de energía
     */
    static energyBeamEffect(): Promise<void>;
    /**
     * Efecto de humo
     */
    static smokeEffect(): Promise<void>;
    /**
     * Efecto de explosión en cadena
     */
    static chainExplosionEffect(): Promise<void>;
    /**
     * Muestra una explosión en una posición específica
     */
    private static showExplosionAt;
    /**
     * Efecto de carga de energía
     */
    static energyChargeEffect(): Promise<void>;
    /**
     * Función de delay
     */
    private static delay;
}
//# sourceMappingURL=effects.d.ts.map