# 🎮 Demo del Juego "Salvar Mundo"

## 🚀 Cómo Ejecutar el Juego

```bash
# Instalar dependencias
npm install

# Ejecutar el juego
npm run dev
```

## 🎯 Múltiples Finales Disponibles

### Final 1: Victoria por Escape Exitoso 🏆

**Pasos para lograr la victoria:**

1. **Verificar propulsores** - Asegurar que al menos uno funcione
2. **Calcular distancia** - Mantener distancia > 300 metros
3. **Generar código de seguridad** - Obtener código válido
4. **Intentar despegue** - Aplicar potencia suficiente (≥ 11,250 unidades)
5. **Confirmar despegue** - Ejecutar secuencia de 2 minutos

**Resultado:** ✅ Humanidad salvada, escape exitoso

### Final 2: Derrota por Fallo de Propulsores 💀

**Condición:** Ambos propulsores fallan

**Resultado:** 
- Godzilla activa Super Charge
- Ataques multiplicados x10
- Humanidad destruida

### Final 3: Derrota por Combate Directo ⚔️

**Pasos que llevan a la derrota:**
1. Elegir "Entrar en combate"
2. Seleccionar cualquier opción de combate:
   - Atacar directamente
   - Defender
   - Intentar huir

**Resultado:** 
- Pantalla de GAME OVER épica con ASCII art
- Estadísticas de la derrota
- Lecciones aprendidas y consejos estratégicos
- Godzilla destruye la nave, humanidad perdida

### Final 4: Derrota por Fallo Total de Propulsores 💀

**Condición:** Ambos propulsores fallan durante el despegue

**Resultado:**
- Godzilla activa Super Charge
- Pantalla de GAME OVER con estadísticas detalladas
- Ataques multiplicados x10
- Humanidad destruida

## 🧮 Ejemplos de Cálculos

### Cálculo de Distancia
```
Coordenadas de entrada: (50, 70) y (600, 300)
Multiplicadas por 100: (5000, 7000) y (60000, 30000)
Fórmula: √[(60000-5000)² + (30000-7000)²]
Resultado: 59,615.43 metros
```

### Código de Seguridad
```
Números que cumplen n % 50 == 1:
Ejemplo: 951, 901, 851, 801, 751, 701, 651, 601, 551, 501
Ordenados de forma descendente
```

### Potencia de Propulsores
```
Poder Base: 5000 + 10000 = 15000 unidades
Umbral normal: 75% = 11,250 unidades
Umbral especial: 90% = 13,500 unidades
```

## 🎭 Escenas Principales

1. **Escena de Inicio** - Presentación épica con ASCII art
2. **Escena de Combate** - Batalla contra Godzilla
3. **Escena de Escape** - Preparación para despegue
4. **Escena de Victoria** - Humanidad salvada
5. **Escena de Derrota** - Humanidad destruida
6. **GAME OVER por Combate** - Pantalla épica con estadísticas
7. **GAME OVER por Propulsores** - Super Charge activado

## 🤖 Consejos de la IA

La IA aliada proporciona consejos estratégicos sobre:
- Estado de propulsores
- Cálculos de distancia
- Generación de códigos
- Estrategias de combate
- Procedimientos de escape

## 🔊 Sistema de Audio

El juego incluye reproducción de audio para:
- Rugido de Godzilla
- Encendido de propulsores
- Sonidos de ataque
- Secuencia de despegue

*Nota: Los archivos de audio son simulados. Para audio real, reemplaza los archivos en la carpeta `sounds/`*

## 🎮 Controles

- **Números 0-9** - Selección de opciones
- **Enter** - Confirmar acciones
- **Teclado** - Entrada de coordenadas y valores

## 🏆 Objetivo Final

**¡Salvar a la humanidad de la destrucción de Godzilla!**

Cada decisión cuenta. Usa todos los recursos disponibles para asegurar la supervivencia de la humanidad.

---

*¡Disfruta el juego y recuerda: el destino del mundo está en tus manos!* 🌍
