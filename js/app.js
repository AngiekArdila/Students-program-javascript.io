document.addEventListener('DOMContentLoaded',async ()=>{
    listaAlumnos = await load("alumnos");
    cargarFormularioAlumnos();
    listaPeriodos = await  load("periodos");
    cargarFormularioPeriodos();
    listaDepartamentos = await load("departamentos");
    cargarFormularioDepartamentos();
    listaProgramas = await load("programas");
    cargarFormularioProgramas();
    listaAsignaturas = await load("asignaturas");
    listaCursos = await load("cursos");
    cargarFormularioAsignaturas();


    /*await loadProductos();
    cargarFormularioProductos();
    await loadFacturas();
    cargarFormularioFacturas();
    */


})