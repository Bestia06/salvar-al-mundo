export interface HUDData {
    shipHealth: number;
    leftEngine: boolean;
    rightEngine: boolean;
    powerLevel: number;
    distance: number;
    timeRemaining: number;
    alerts: string[];
}
export declare class HUDManager {
    private data;
    constructor();
    /**
     * Actualiza los datos del HUD
     */
    updateData(newData: Partial<HUDData>): void;
    /**
     * Renderiza el HUD completo
     */
    render(): void;
    /**
     * Renderiza el HUD principal
     */
    private renderMainHUD;
    /**
     * Renderiza la barra de salud
     */
    private renderHealthBar;
    /**
     * Renderiza el estado de los propulsores
     */
    private renderEngineStatus;
    /**
     * Renderiza el nivel de potencia
     */
    private renderPowerLevel;
    /**
     * Renderiza la distancia a Godzilla
     */
    private renderDistance;
    /**
     * Renderiza el tiempo restante
     */
    private renderTimeRemaining;
    /**
     * Renderiza el estado general
     */
    private renderGeneralStatus;
    /**
     * Renderiza las alertas
     */
    private renderAlerts;
    /**
     * Crea una barra de progreso
     */
    private createProgressBar;
    /**
     * Agrega una alerta
     */
    addAlert(alert: string): void;
    /**
     * Limpia las alertas
     */
    clearAlerts(): void;
    /**
     * Actualiza el tiempo restante
     */
    updateTimeRemaining(seconds: number): void;
    /**
     * Obtiene los datos actuales
     */
    getData(): HUDData;
}
//# sourceMappingURL=hud.d.ts.map