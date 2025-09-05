export declare class AnimationManager {
    /**
     * Animación de despegue de la nave
     */
    static animateShipLaunch(): Promise<void>;
    /**
     * Animación de Godzilla caminando
     */
    static animateGodzillaWalking(): Promise<void>;
    /**
     * Animación de explosión
     */
    static animateExplosion(): Promise<void>;
    /**
     * Animación de rayo de energía
     */
    static animateEnergyBeam(): Promise<void>;
    /**
     * Animación de barra de progreso
     */
    static animateProgressBar(progress: number, label: string): Promise<void>;
    /**
     * Función de delay
     */
    private static delay;
}
//# sourceMappingURL=animations.d.ts.map