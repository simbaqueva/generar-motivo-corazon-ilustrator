# 📜 Script: `generar_motivo_corazon.jsx`

**Generador de Motivo de Corazones para Adobe Illustrator**

---

## 📜 ¿Qué hace el script?

`generar_motivo_corazon.jsx` es un **script para Adobe Illustrator** que automatiza dos tareas:

1. **Crea un corazón vectorial** estilizado (color rojo "premium" RGB 235, 45, 85) dibujándolo punto por punto con curvas Bézier.
2. **Activa automáticamente el creador de motivos** (Pattern Maker) de Illustrator, para que el usuario pueda convertir ese corazón en un motivo repetible.

Al final muestra un mensaje/alert con instrucciones para guardar el motivo en las Muestras (Swatches).

---

## 🖥️ ¿Para qué programa es?

- **Programa:** Adobe Illustrator (versión CS6 o superior, incluyendo CC).
- **Lenguaje:** ExtendScript (JSX), que es el lenguaje de scripting nativo de Adobe.
- **Formato de archivo:** `.jsx`

---

## ✅ Requisitos previos

| Requisito | Detalle |
|-----------|---------|
| **Adobe Illustrator** | Instalado y funcionando (CS6+ o cualquier versión CC) |
| **Archivo .jsx** | El archivo `generar_motivo_corazon.jsx` en tu computadora |
| **Documento abierto (opcional)** | Si hay un documento abierto, lo usa. Si no, crea uno nuevo de 800×800 px automáticamente |
| **Idioma de Illustrator** | El comando `'Adobe Make Pattern'` depende del idioma. En versiones en español podría fallar, pero el script tiene un fallback con instrucciones manuales |

---

## 🚀 ¿Cómo ejecutarlo?

Hay **3 formas** de ejecutar scripts en Illustrator:

### Opción 1: Menú Archivo (la más común)
1. Abre Adobe Illustrator.
2. Ve a **Archivo → Scripts → Otro script…** (File → Scripts → Other Script…).
3. Busca y selecciona `generar_motivo_corazon.jsx`.
4. Haz clic en **Abrir** para ejecutarlo.

### Opción 2: Panel de Scripts
1. Ve a **Archivo → Scripts** y coloca el `.jsx` en la carpeta de scripts de Illustrator (por ejemplo `C:\Program Files\Adobe\Adobe Illustrator [versión]\Presets\es_MX\Scripts\`).
2. Reinicia Illustrator.
3. Aparecerá en **Archivo → Scripts** y podrás ejecutarlo con un clic.

### Opción 3: Atajo personalizado
1. **Edición → Atajos de teclado**.
2. Asigna un atajo al script para ejecutarlo con teclas.

---

## ⚙️ ¿Cómo funciona? (Explicación técnica paso a paso)

| # | Líneas | Qué hace |
|---|--------|----------|
| 1 | 11–15 | **Verifica documento**: Si hay uno abierto lo usa; si no, crea uno nuevo RGB de 800×800 px |
| 2 | 17–20 | Obtiene la capa activa y **deselecciona todo** para evitar errores con objetos vinculados |
| 3 | 23–26 | **Define el color rojo** del corazón (RGB: 235, 45, 85) |
| 4 | 29–33 | **Crea el trazado** (path) del corazón: cerrado, relleno, sin contorno |
| 5 | 41–62 | **Dibuja el corazón con 4 puntos de ancla** y sus manejadores Bézier: |
|   | 41–44 | `p1` – Vértice inferior (punta del corazón) |
|   | 47–50 | `p2` – Lado izquierdo (curva exterior) |
|   | 53–56 | `p3` – Hendidura superior (centro, la "V" del corazón) |
|   | 59–62 | `p4` – Lado derecho (curva exterior) |
| 6 | 64–65 | **Selecciona el corazón** recién creado |
| 7 | 68–70 | **Invoca el creador de motivos** de Illustrator (`Adobe Make Pattern`) y muestra instrucciones para guardarlo |
| 8 | 71–73 | **Fallback**: si el comando automático falla, muestra instrucciones manuales: *Seleccionar corazón → Objeto → Motivo → Crear* |

---

## 🎯 ¿Cuál es el objetivo del script?

**Generar un motivo decorativo de corazones para Illustrator de forma rápida y automática**, ideal para:

- 🔴 Crear **patrones repetibles** (fondos de folletos, invitaciones, papelería).
- 🖌️ Ahorrar tiempo manual dibujando el corazón y buscando el menú de motivos.
- 🎨 Un solo clic → corazón dibujado + editor de motivos abierto.

Dado que el archivo se encuentra en una carpeta llamada *"folleto 29 de abril 2026 Andina Express"*, es probable que se use para crear un **patrón de corazones decorativo para un folleto o material promocional**.

---

## ⚠️ Notas importantes

- En versiones de Illustrator **en español**, el comando `'Adobe Make Pattern'` podría no reconocerse. En ese caso el script mostrará el mensaje de fallback con las instrucciones manuales.
- El corazón se dibuja centrado en unas coordenadas (400, 430 aprox.) que asumen un documento de gran tamaño; si tu documento es pequeño, el corazón podría quedar fuera del lienzo visible.
- El archivo es **`.jsx`** (ExtendScript), no es JavaScript de navegador ni se ejecuta en Node.js. **Solo funciona dentro de Adobe Illustrator**.

---

## 📄 Contenido del script original

```jsx
/*
  Script: Generador de Motivo de Corazones para Illustrator
  Descripción: Crea un corazón vectorial estilizado y activa el creador de motivos.
  Autor: Antigravity AI
*/

function crearMotivoCorazon() {
    var doc;
    
    // 1. Verificar si hay un documento abierto, si no, crear uno nuevo
    if (app.documents.length > 0) {
        doc = app.activeDocument;
    } else {
        doc = app.documents.add(DocumentColorSpace.RGB, 800, 800);
    }

    var capa = doc.activeLayer;

    // Deseleccionar todo para evitar errores con objetos vinculados existentes en el documento
    doc.selection = null;

    // 2. Definir un color rojo "Premium" (RGB)
    var colorCorazon = new RGBColor();
    colorCorazon.red = 235;
    colorCorazon.green = 45;
    colorCorazon.blue = 85;

    // 3. Crear el trazado del corazón
    var corazon = capa.pathItems.add();
    corazon.closed = true;
    corazon.filled = true;
    corazon.fillColor = colorCorazon;
    corazon.stroked = false;

    /* 
       Definición de los puntos del corazón (Anclajes y Manejadores)
       Usamos 4 puntos estratégicos para una forma suave.
    */
    
    // Punto Inferior (Vértice)
    var p1 = corazon.pathPoints.add();
    p1.anchor = [400, 350];
    p1.leftDirection = [400, 350];
    p1.rightDirection = [400, 350];

    // Lado Izquierdo
    var p2 = corazon.pathPoints.add();
    p2.anchor = [330, 420];
    p2.leftDirection = [330, 380];
    p2.rightDirection = [330, 460];

    // Hendidura Superior (Centro)
    var p3 = corazon.pathPoints.add();
    p3.anchor = [400, 430];
    p3.leftDirection = [370, 460];
    p3.rightDirection = [430, 460];

    // Lado Derecho
    var p4 = corazon.pathPoints.add();
    p4.anchor = [470, 420];
    p4.leftDirection = [470, 460];
    p4.rightDirection = [470, 380];

    // 4. Centrar y seleccionar el corazón
    corazon.selected = true;

    // 5. Invocar el creador de Motivos de Illustrator
    try {
        app.executeMenuCommand('Adobe Make Pattern');
        alert("¡Corazón creado con éxito!\n\nSe ha abierto el modo de edición de Motivos.\n1. Ajusta el nombre o el espaciado si lo deseas.\n2. Haz clic en 'Hecho' (Done) en la barra superior gris para guardarlo en tus Muestras (Swatches).");
    } catch (e) {
        alert("El corazón se creó, pero no se pudo iniciar el creador automático.\n\nPara hacerlo manualmente:\nSelecciona el corazón > Objeto > Motivo > Crear.");
    }
}

crearMotivoCorazon();
```

---

*Documentación generada automáticamente.*