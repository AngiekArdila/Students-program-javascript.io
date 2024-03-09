document.addEventListener('DOMContentLoaded',async ()=>{
    await loadAlumnos();
    cargarFormularioAlumnos();
    await  loadPeriodos();
    cargarFormularioPeriodos();
    /*await loadProductos();
    cargarFormularioProductos();
    await loadFacturas();
    cargarFormularioFacturas();
    */


})