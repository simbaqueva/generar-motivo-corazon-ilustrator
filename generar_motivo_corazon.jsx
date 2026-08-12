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
