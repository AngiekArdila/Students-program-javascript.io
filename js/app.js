document.addEventListener('DOMContentLoaded',async ()=>{
    listaAlumnos = await load("alumnos");
    cargarFormularioAlumnos();
    listaPeriodos = await  load("periodos");
    mostrarListadoPeriodos();
    listaDepartamentos = await load("departamentos");
    mostrarListadoDepartamentos();
    listaProgramas = await load("programas");
    mostrarListadoProgramas();
    listaSalones= await load("salones");
    mostrarListadoSalones();
    listaAsignaturas = await load("asignaturas");
    listaCursos = await load("cursos");
    cargarFormularioAsignaturas();
    listaMatriculas= await load("matriculas");
    cargarFormularioMatriculas();
    listaTarifas= await load("tarifas");
    mostrarListadoTarifas();
    listaProfesores= await load("profesores");
    mostrarListadoProfesores();
    cargarFormularioProfesores();
   



    /*await loadProductos();
    cargarFormularioProductos();
    await loadFacturas();
    cargarFormularioFacturas();
    */


})