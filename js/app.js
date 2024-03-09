document.addEventListener('DOMContentLoaded',async ()=>{
    await load("alumnos");
    cargarFormularioAlumnos();
    await  load("periodos");
    cargarFormularioPeriodos();
    /*await loadProductos();
    cargarFormularioProductos();
    await loadFacturas();
    cargarFormularioFacturas();
    */


})