const chalk = require('chalk');

export interface HUDData {
    shipHealth: number;
    leftEngine: boolean;
    rightEngine: boolean;
    powerLevel: number;
    distance: number;
    timeRemaining: number;
    alerts: string[];
}

export class HUDManager {
    private data: HUDData;

    constructor() {
        this.data = {
            shipHealth: 100,
            leftEngine: true,
            rightEngine: true,
            powerLevel: 0,
            distance: 0,
            timeRemaining: 120,
            alerts: []
        };
    }

    /**
     * Actualiza los datos del HUD
     */
    updateData(newData: Partial<HUDData>): void {
        this.data = { ...this.data, ...newData };
    }

    /**
     * Renderiza el HUD completo
     */
    render(): void {
        console.clear();
        
        // Mostrar HUD principal
        this.renderMainHUD();
        
        // Mostrar alertas si las hay
        if (this.data.alerts.length > 0) {
            this.renderAlerts();
        }
    }

    /**
     * Renderiza el HUD principal
     */
    private renderMainHUD(): void {
        console.log(chalk.blue.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  🎮 HUD - SISTEMA DE NAVEGACIÓN 🎮                                        ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));

        // Barra de salud de la nave
        this.renderHealthBar();
        
        // Estado de los propulsores
        this.renderEngineStatus();
        
        // Nivel de potencia
        this.renderPowerLevel();
        
        // Distancia a Godzilla
        this.renderDistance();
        
        // Tiempo restante
        this.renderTimeRemaining();
        
        // Estado general
        this.renderGeneralStatus();
    }

    /**
     * Renderiza la barra de salud
     */
    private renderHealthBar(): void {
        const healthBar = this.createProgressBar(this.data.shipHealth, 20);
        const healthColor = this.data.shipHealth > 70 ? 'green' : 
                           this.data.shipHealth > 30 ? 'yellow' : 'red';
        
        console.log(chalk[healthColor].bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  🚀 SALUD DE LA NAVE: ${this.data.shipHealth.toFixed(0)}%                                    ║
    ║  [${healthBar}]                                                           ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }

    /**
     * Renderiza el estado de los propulsores
     */
    private renderEngineStatus(): void {
        const leftStatus = this.data.leftEngine ? '✅ OPERATIVO' : '❌ FALLIDO';
        const rightStatus = this.data.rightEngine ? '✅ OPERATIVO' : '❌ FALLIDO';
        const leftColor = this.data.leftEngine ? 'green' : 'red';
        const rightColor = this.data.rightEngine ? 'green' : 'red';
        
        console.log(chalk.blue.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  🔧 ESTADO DE PROPULSORES:                                                  ║
    ║                                                                              ║
    ║  Propulsor Izquierdo: ${chalk[leftColor](leftStatus)}                    ║
    ║  Propulsor Derecho: ${chalk[rightColor](rightStatus)}                      ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }

    /**
     * Renderiza el nivel de potencia
     */
    private renderPowerLevel(): void {
        const powerBar = this.createProgressBar(this.data.powerLevel, 20);
        const powerColor = this.data.powerLevel > 75 ? 'green' : 
                          this.data.powerLevel > 50 ? 'yellow' : 'red';
        
        console.log(chalk[powerColor].bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  ⚡ NIVEL DE POTENCIA: ${this.data.powerLevel.toFixed(0)}%                                    ║
    ║  [${powerBar}]                                                           ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }

    /**
     * Renderiza la distancia a Godzilla
     */
    private renderDistance(): void {
        const distanceColor = this.data.distance > 300 ? 'green' : 
                             this.data.distance > 100 ? 'yellow' : 'red';
        const status = this.data.distance > 300 ? 'SEGURO' : 
                      this.data.distance > 100 ? 'PELIGRO' : 'CRÍTICO';
        
        console.log(chalk[distanceColor].bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  🦕 DISTANCIA A GODZILLA: ${this.data.distance.toFixed(1)} metros                                    ║
    ║  ESTADO: ${status}                                                          ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }

    /**
     * Renderiza el tiempo restante
     */
    private renderTimeRemaining(): void {
        const minutes = Math.floor(this.data.timeRemaining / 60);
        const seconds = this.data.timeRemaining % 60;
        const timeColor = this.data.timeRemaining > 60 ? 'green' : 
                         this.data.timeRemaining > 30 ? 'yellow' : 'red';
        
        console.log(chalk[timeColor].bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  ⏰ TIEMPO RESTANTE: ${minutes}:${seconds.toString().padStart(2, '0')}                                    ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }

    /**
     * Renderiza el estado general
     */
    private renderGeneralStatus(): void {
        let overallStatus = 'OPERATIVO';
        let statusColor = 'green';
        
        if (!this.data.leftEngine || !this.data.rightEngine) {
            overallStatus = 'PROPULSORES FALLIDOS';
            statusColor = 'red';
        } else if (this.data.distance < 100) {
            overallStatus = 'PELIGRO INMINENTE';
            statusColor = 'red';
        } else if (this.data.distance < 300) {
            overallStatus = 'ALERTA';
            statusColor = 'yellow';
        }
        
        console.log(chalk[statusColor].bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  📊 ESTADO GENERAL: ${overallStatus}                                    ║
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }

    /**
     * Renderiza las alertas
     */
    private renderAlerts(): void {
        console.log(chalk.red.bold(`
    ╔══════════════════════════════════════════════════════════════════════════════╗
    ║                                                                              ║
    ║  🚨 ALERTAS DEL SISTEMA 🚨                                                 ║
    ║                                                                              ║
        `));
        
        this.data.alerts.forEach(alert => {
            console.log(chalk.red(`    ║  ⚠️  ${alert}                                                      ║`));
        });
        
        console.log(chalk.red.bold(`
    ║                                                                              ║
    ╚══════════════════════════════════════════════════════════════════════════════╝
        `));
    }

    /**
     * Crea una barra de progreso
     */
    private createProgressBar(value: number, length: number): string {
        const filledLength = Math.floor((value / 100) * length);
        const bar = '█'.repeat(filledLength) + '░'.repeat(length - filledLength);
        return bar;
    }

    /**
     * Agrega una alerta
     */
    addAlert(alert: string): void {
        this.data.alerts.push(alert);
    }

    /**
     * Limpia las alertas
     */
    clearAlerts(): void {
        this.data.alerts = [];
    }

    /**
     * Actualiza el tiempo restante
     */
    updateTimeRemaining(seconds: number): void {
        this.data.timeRemaining = seconds;
    }

    /**
     * Obtiene los datos actuales
     */
    getData(): HUDData {
        return { ...this.data };
    }
}
