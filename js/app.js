document.addEventListener('DOMContentLoaded',async ()=>{
    listaAlumnos = await load("alumnos");
    cargarFormularioAlumnos();
    listaPeriodos = await  load("periodos");
    mostrarListadoPeriodos();
    listaDepartamentos = await load("departamentos");
    mostrarListadoDepartamentos();
    listaProgramas = await load("programas");
    mostrarListadoProgramas();
    listaAsignaturas = await load("asignaturas");
    listaCursos = await load("cursos");
    cargarFormularioAsignaturas();
    listaMatriculas= await load("matriculas");
    cargarFormularioMatriculas();
    listaSalones= await load("salones");
    mostrarListadoSalones();
    listaTarifas= await load("tarifas");
    mostrarListadoTarifas();


    /*await loadProductos();
    cargarFormularioProductos();
    await loadFacturas();
    cargarFormularioFacturas();
    */


})