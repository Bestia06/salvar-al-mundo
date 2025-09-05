export interface Position {
    x: number;
    y: number;
}
export declare class MiniMap {
    private width;
    private height;
    private shipPosition;
    private godzillaPosition;
    private dangerZone;
    constructor();
    /**
     * Actualiza las posiciones
     */
    updatePositions(shipPos: Position, godzillaPos: Position): void;
    /**
     * Renderiza el mini mapa
     */
    render(): void;
    /**
     * Convierte coordenadas del mundo a coordenadas del mapa
     */
    private worldToMap;
    /**
     * Verifica si una posición está dentro de los límites del mapa
     */
    private isInMapBounds;
    /**
     * Dibuja la zona de peligro alrededor de la nave
     */
    private drawDangerZone;
    /**
     * Dibuja los bordes del mapa
     */
    private drawMapBorders;
    /**
     * Muestra el mapa en la consola
     */
    private displayMap;
    /**
     * Muestra información del mapa
     */
    private displayInfo;
    /**
     * Calcula la distancia entre la nave y Godzilla
     */
    private calculateDistance;
    /**
     * Simula el movimiento de Godzilla hacia la nave
     */
    simulateGodzillaMovement(): void;
    /**
     * Verifica si Godzilla está en rango de ataque
     */
    isGodzillaInAttackRange(): boolean;
    /**
     * Obtiene la posición actual de Godzilla
     */
    getGodzillaPosition(): Position;
    /**
     * Obtiene la posición actual de la nave
     */
    getShipPosition(): Position;
    /**
     * Establece la posición de la nave
     */
    setShipPosition(pos: Position): void;
    /**
     * Establece la posición de Godzilla
     */
    setGodzillaPosition(pos: Position): void;
}
//# sourceMappingURL=minimap.d.ts.map