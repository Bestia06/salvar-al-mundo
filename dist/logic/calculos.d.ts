export declare class CalculosManager {
    /**
     * Calcula la distancia usando la fórmula de Pitágoras
     * @param x1 Coordenada X del primer punto
     * @param y1 Coordenada Y del primer punto
     * @param x2 Coordenada X del segundo punto
     * @param y2 Coordenada Y del segundo punto
     * @returns Distancia en metros (multiplicada por 100)
     */
    static calcularDistancia(x1: number, y1: number, x2: number, y2: number): number;
    /**
     * Valida las coordenadas de entrada
     * @param x1 Coordenada X del primer punto
     * @param y1 Coordenada Y del primer punto
     * @param x2 Coordenada X del segundo punto
     * @param y2 Coordenada Y del segundo punto
     * @returns Objeto con validación y mensaje
     */
    static validarCoordenadas(x1: number, y1: number, x2: number, y2: number): {
        valido: boolean;
        mensaje: string;
    };
    /**
     * Genera un código de seguridad con 10 números aleatorios
     * @returns Array de números ordenados de forma descendente
     */
    static generarCodigoSeguridad(): number[];
    /**
     * Valida el código de seguridad generado
     * @param codigo Array de números a validar
     * @returns Objeto con validación y mensaje
     */
    static validarCodigoSeguridad(codigo: number[]): {
        valido: boolean;
        mensaje: string;
    };
    /**
     * Simula la secuencia de despegue con escala 5x
     * @param duracionMinutos Duración en minutos (por defecto 2)
     * @param callback Función a llamar en cada actualización
     */
    static simularSecuenciaDespegue(duracionMinutos?: number, callback?: (progreso: number, tiempoSimulado: number) => void): Promise<void>;
    /**
     * Genera una barra de progreso visual
     * @param porcentaje Porcentaje de progreso (0-100)
     * @returns String con la barra de progreso
     */
    private static generarBarraProgreso;
    /**
     * Muestra los cálculos de distancia de forma detallada
     * @param x1 Coordenada X del primer punto
     * @param y1 Coordenada Y del primer punto
     * @param x2 Coordenada X del segundo punto
     * @param y2 Coordenada Y del segundo punto
     */
    static mostrarCalculoDistancia(x1: number, y1: number, x2: number, y2: number): void;
    /**
     * Muestra el código de seguridad generado
     * @param codigo Array de números del código
     */
    static mostrarCodigoSeguridad(codigo: number[]): void;
}
//# sourceMappingURL=calculos.d.ts.map