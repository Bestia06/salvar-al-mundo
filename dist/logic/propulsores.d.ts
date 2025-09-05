export interface PropulsorState {
    izquierdo: boolean;
    derecho: boolean;
}
export declare class PropulsorManager {
    private hidroPropulsor;
    private potencia;
    private propulsores;
    constructor();
    /**
     * Obtiene el poder base del sistema
     */
    getPoderBase(): number;
    /**
     * Obtiene el estado de los propulsores
     */
    getPropulsoresState(): PropulsorState;
    /**
     * Establece el estado de los propulsores
     */
    setPropulsoresState(izquierdo: boolean, derecho: boolean): void;
    /**
     * Simula fallo en los propulsores
     */
    simularFalloPropulsores(): void;
    /**
     * Calcula el umbral de despegue
     */
    calcularUmbralDespegue(): number;
    /**
     * Calcula el requisito adicional para propulsor derecho
     */
    calcularRequeridoDerecho(): number;
    /**
     * Calcula el requisito adicional para propulsor izquierdo
     */
    calcularRequeridoIzquierdo(): number;
    /**
     * Verifica si el despegue es posible
     */
    verificarDespegue(potenciaAplicada: number): {
        autorizado: boolean;
        mensaje: string;
        potenciaRequerida: number;
    };
    /**
     * Verifica si se debe activar Super Charge
     */
    debeActivarSuperCharge(): boolean;
    /**
     * Muestra el estado de los propulsores
     */
    mostrarEstadoPropulsores(): void;
    /**
     * Muestra los cálculos detallados
     */
    mostrarCalculosDetallados(): void;
}
//# sourceMappingURL=propulsores.d.ts.map