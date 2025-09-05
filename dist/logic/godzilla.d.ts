export interface GodzillaAttack {
    name: string;
    basePower: number;
    description: string;
    emoji: string;
}
export declare class Godzilla {
    private attacks;
    private superChargeActive;
    private currentPosition;
    constructor();
    /**
     * Obtiene todos los ataques de Godzilla
     */
    getAttacks(): GodzillaAttack[];
    /**
     * Activa Super Charge (multiplica ataques x10)
     */
    activateSuperCharge(): void;
    /**
     * Verifica si Super Charge está activo
     */
    isSuperChargeActive(): boolean;
    /**
     * Ejecuta un ataque específico
     */
    executeAttack(attackIndex: number): {
        attack: GodzillaAttack;
        power: number;
    };
    /**
     * Ejecuta todos los ataques en secuencia
     */
    executeAllAttacks(): void;
    /**
     * Establece la posición de Godzilla
     */
    setPosition(x: number, y: number): void;
    /**
     * Obtiene la posición actual de Godzilla
     */
    getPosition(): {
        x: number;
        y: number;
    };
    /**
     * Simula el movimiento de Godzilla hacia la nave
     */
    moveTowardsShip(shipX: number, shipY: number): void;
    /**
     * Muestra el estado de Godzilla
     */
    showStatus(): void;
    /**
     * Calcula la distancia a un punto específico
     */
    calculateDistanceTo(x: number, y: number): number;
    /**
     * Verifica si Godzilla está en rango de ataque
     */
    isInAttackRange(shipX: number, shipY: number, range?: number): boolean;
    /**
     * Resetea el estado de Godzilla
     */
    reset(): void;
}
//# sourceMappingURL=godzilla.d.ts.map