const chalk = require('chalk');

export interface PropulsorState {
    izquierdo: boolean;
    derecho: boolean;
}

export class PropulsorManager {
    private hidroPropulsor: number = 5000;
    private potencia: number = 10000;
    private propulsores: PropulsorState;

    constructor() {
        this.propulsores = {
            izquierdo: true,
            derecho: true
        };
    }

    /**
     * Obtiene el poder base del sistema
     */
    getPoderBase(): number {
        return this.hidroPropulsor + this.potencia;
    }

    /**
     * Obtiene el estado de los propulsores
     */
    getPropulsoresState(): PropulsorState {
        return { ...this.propulsores };
    }

    /**
     * Establece el estado de los propulsores
     */
    setPropulsoresState(izquierdo: boolean, derecho: boolean): void {
        this.propulsores.izquierdo = izquierdo;
        this.propulsores.derecho = derecho;
    }

    /**
     * Simula fallo en los propulsores
     */
    simularFalloPropulsores(): void {
        const falloIzquierdo = Math.random() < 0.3; // 30% probabilidad de fallo
        const falloDerecho = Math.random() < 0.3; // 30% probabilidad de fallo
        
        if (falloIzquierdo) {
            this.propulsores.izquierdo = false;
            console.log(chalk.red('⚠️  Propulsor izquierdo ha fallado!'));
        }
        
        if (falloDerecho) {
            this.propulsores.derecho = false;
            console.log(chalk.red('⚠️  Propulsor derecho ha fallado!'));
        }
    }

    /**
     * Calcula el umbral de despegue
     */
    calcularUmbralDespegue(): number {
        if (this.propulsores.izquierdo && this.propulsores.derecho) {
            return 0.75; // 75% si ambos funcionan
        } else {
            return 0.90; // 90% en cualquier otro caso
        }
    }

    /**
     * Calcula el requisito adicional para propulsor derecho
     */
    calcularRequeridoDerecho(): number {
        const poderBase = this.getPoderBase();
        // requeridoDerecho = (90%^4 / 2) * hidroPropulsor
        const calculo = (Math.pow(0.90, 4) / 2) * this.hidroPropulsor;
        return calculo;
    }

    /**
     * Calcula el requisito adicional para propulsor izquierdo
     */
    calcularRequeridoIzquierdo(): number {
        // requeridoIzquierdo = (90%^2 / 3) * potencia
        const calculo = (Math.pow(0.90, 2) / 3) * this.potencia;
        return calculo;
    }

    /**
     * Verifica si el despegue es posible
     */
    verificarDespegue(potenciaAplicada: number): { autorizado: boolean; mensaje: string; potenciaRequerida: number } {
        const umbral = this.calcularUmbralDespegue();
        const poderBase = this.getPoderBase();
        const potenciaRequeridaBase = poderBase * umbral;
        
        // Si ambos propulsores funcionan
        if (this.propulsores.izquierdo && this.propulsores.derecho) {
            if (potenciaAplicada >= potenciaRequeridaBase) {
                return {
                    autorizado: true,
                    mensaje: "✅ Despegue autorizado - Ambos propulsores operativos",
                    potenciaRequerida: potenciaRequeridaBase
                };
            } else {
                return {
                    autorizado: false,
                    mensaje: "❌ Fallo: Potencia insuficiente para despegue con ambos propulsores",
                    potenciaRequerida: potenciaRequeridaBase
                };
            }
        }
        
        // Si solo el propulsor derecho funciona
        if (!this.propulsores.izquierdo && this.propulsores.derecho) {
            const requeridoDerecho = this.calcularRequeridoDerecho();
            const potenciaTotalRequerida = potenciaRequeridaBase + requeridoDerecho;
            
            if (potenciaAplicada >= potenciaTotalRequerida) {
                return {
                    autorizado: true,
                    mensaje: "✅ Despegue autorizado - Solo propulsor derecho operativo",
                    potenciaRequerida: potenciaTotalRequerida
                };
            } else {
                return {
                    autorizado: false,
                    mensaje: "❌ Fallo: Potencia insuficiente para despegue con solo propulsor derecho",
                    potenciaRequerida: potenciaTotalRequerida
                };
            }
        }
        
        // Si solo el propulsor izquierdo funciona
        if (this.propulsores.izquierdo && !this.propulsores.derecho) {
            const requeridoIzquierdo = this.calcularRequeridoIzquierdo();
            const potenciaTotalRequerida = potenciaRequeridaBase + requeridoIzquierdo;
            
            if (potenciaAplicada >= potenciaTotalRequerida) {
                return {
                    autorizado: true,
                    mensaje: "✅ Despegue autorizado - Solo propulsor izquierdo operativo",
                    potenciaRequerida: potenciaTotalRequerida
                };
            } else {
                return {
                    autorizado: false,
                    mensaje: "❌ Fallo: Potencia insuficiente para despegue con solo propulsor izquierdo",
                    potenciaRequerida: potenciaTotalRequerida
                };
            }
        }
        
        // Si ningún propulsor funciona
        return {
            autorizado: false,
            mensaje: "💀 SOLDADO... Cuando los 2 propulsores no estén en funcionamiento... temo que debemos prepararnos para lo peor...",
            potenciaRequerida: Infinity
        };
    }

    /**
     * Verifica si se debe activar Super Charge
     */
    debeActivarSuperCharge(): boolean {
        return !this.propulsores.izquierdo && !this.propulsores.derecho;
    }

    /**
     * Muestra el estado de los propulsores
     */
    mostrarEstadoPropulsores(): void {
        console.log(chalk.blue.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                          🚀 ESTADO DE PROPULSORES 🚀                        ║
    ║                                                                              ║
    ║  HidroPropulsor: ${this.hidroPropulsor.toLocaleString()} unidades                                    ║
    ║  Potencia Sistema: ${this.potencia.toLocaleString()} unidades                                ║
    ║  Poder Base Total: ${this.getPoderBase().toLocaleString()} unidades                              ║
    ║                                                                              ║
    ║  Propulsor Izquierdo: ${this.propulsores.izquierdo ? '✅ Operativo' : '❌ Fallido'}                    ║
    ║  Propulsor Derecho: ${this.propulsores.derecho ? '✅ Operativo' : '❌ Fallido'}                      ║
    ║                                                                              ║
    ║  Umbral de Despegue: ${(this.calcularUmbralDespegue() * 100).toFixed(0)}%                                    ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }

    /**
     * Muestra los cálculos detallados
     */
    mostrarCalculosDetallados(): void {
        const umbral = this.calcularUmbralDespegue();
        const poderBase = this.getPoderBase();
        const potenciaRequeridaBase = poderBase * umbral;
        
        console.log(chalk.yellow.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                          📊 CÁLCULOS DETALLADOS 📊                          ║
    ║                                                                              ║
    ║  Fórmulas aplicadas:                                                        ║
    ║                                                                              ║
    ║  • Poder Base = HidroPropulsor + Potencia                                   ║
    ║    = ${this.hidroPropulsor.toLocaleString()} + ${this.potencia.toLocaleString()} = ${poderBase.toLocaleString()} unidades                    ║
    ║                                                                              ║
    ║  • Umbral = ${umbral === 0.75 ? '75% (ambos propulsores)' : '90% (caso especial)'}                    ║
    ║                                                                              ║
    ║  • Potencia Requerida Base = ${potenciaRequeridaBase.toLocaleString()} unidades                    ║
        `));
        
        if (!this.propulsores.izquierdo && this.propulsores.derecho) {
            const requeridoDerecho = this.calcularRequeridoDerecho();
            console.log(chalk.yellow(`
    ║                                                                              ║
    ║  • Requerido Derecho = (90%^4 / 2) * HidroPropulsor                        ║
    ║    = (${Math.pow(0.90, 4).toFixed(4)} / 2) * ${this.hidroPropulsor.toLocaleString()} = ${requeridoDerecho.toFixed(2)} unidades              ║
    ║                                                                              ║
    ║  • Total Requerido = ${(potenciaRequeridaBase + requeridoDerecho).toFixed(2)} unidades                    ║
            `));
        }
        
        if (this.propulsores.izquierdo && !this.propulsores.derecho) {
            const requeridoIzquierdo = this.calcularRequeridoIzquierdo();
            console.log(chalk.yellow(`
    ║                                                                              ║
    ║  • Requerido Izquierdo = (90%^2 / 3) * Potencia                            ║
    ║    = (${Math.pow(0.90, 2).toFixed(4)} / 3) * ${this.potencia.toLocaleString()} = ${requeridoIzquierdo.toFixed(2)} unidades              ║
    ║                                                                              ║
    ║  • Total Requerido = ${(potenciaRequeridaBase + requeridoIzquierdo).toFixed(2)} unidades                    ║
            `));
        }
        
        console.log(chalk.yellow(`
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }
}
