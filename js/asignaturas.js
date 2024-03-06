// Escuchar el evento 'submit' del formulario
document.getElementById("asignatura").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el envío por defecto del formulario
    
    // Obtener los valores de los campos
    var nombreasignatura = document.getElementById("asignatura").value;
    
    // Mostrar la información ingresada
    alert("Nombre del Departamento: " + nombreasignatura);
    
    // Puedes enviar los datos a un servidor o hacer cualquier otra operación aquí
    
    // Limpiar los campos del formulario
    document.getElementById("nombreDepartamento").value = "";
    document.getElementById("codigoDepartamento").value = "";
});