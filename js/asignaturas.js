let listaAsignaturas = [];
let listaCursos = [];


const cargarFormularioAsignaturas = async () => {
  const AsignaturasForm = document.getElementById('asignaturas-crear');
  AsignaturasForm.innerHTML = `<h2>Crear Asignaturas</h2>
      <form>
          <label for="CursoAsignatura">Seleccione el Curso:</label>
          <div class="search-container.cursoasign">
            <input type="text" id="search-input-cursoasign" placeholder="Buscar Cursos...">
            <ul id="search-results-cursoasign"></ul>
          </div>
          <label for="codigoASIGN">Codigo de Asignatura: (NOMBRE-PERIODO-AÑO)</label>
          <input type="text" id="codigoASIGN" required>
          <label for="cantcreditosasign">Ingrese cantidad de Creditos:</label>
          <input type="number" id="cantcreditosasign" required>
          <label for="DocenteAsign">Seleccione Al Docente Encargado:</label>
          <div class="search-container.DocenteAsign">
            <input type="text" id="search-input-DocenteAsign" placeholder="Buscar Docentes...">
            <ul id="search-results-DocenteAsign"></ul>
          </div>
          <label for="cuposAsign">Max de Cupos Disponibles:</label>
          <input type="number" id="cuposAsign" required> 
          <label for="ProgramaAsign">Seleccione un Programa:</label>
          <div class="search-container.ProgramaAsign">
            <input type="text" id="search-input-ProgramaAsign" placeholder="Buscar Programas...">
            <ul id="search-results-ProgramaAsign"></ul>
          </div>
          <label for="HorarioAsign">Seleccione un Horario:</label>
            <div id="horarioscont">
              <label for="dia-1">Día:</label>
              <select id="HorarioDia" required>
                ${cargardias()}
              </select>
              <label for="hora-1">Horario:</label>
              <select id="HorarioHoras" required>
                ${cargarHorarios()}
              </select>
              <label for="salon-1">Salón:</label>
              <select id="HorarioSalon" required>
                ${selectSalones()}
              </select>
            </div>
            <button type="button" onclick="crearAsignatura()">Crear Asignatura</button>
            <button type="button" onclick="mostrarListaAsignaturas()">Ver Listado de asignaturas</button>
            </form>  
  `;

  buscadorDocentes('search-input-DocenteAsign', 'search-results-DocenteAsign')
  buscadorCursos('search-input-cursoasign', 'search-results-cursoasign')
  buscadorProgramas('search-input-ProgramaAsign', 'search-results-ProgramaAsign')
}

const crearAsignatura = async () => {

  const cursoInput = document.getElementById('search-input-cursoasign');
  const codigoInput = document.getElementById('codigoASIGN');
  const creditosInput = document.getElementById('cantcreditosasign');
  const DocenteInput = document.getElementById('search-input-DocenteAsign');
  const cuposInput = document.getElementById('cuposAsign');
  const ProgramaAInput = document.getElementById('search-input-ProgramaAsign');
  const DiaInput = document.getElementById('HorarioDia');
  const HoraInput = document.getElementById('HorarioHoras');
  const SalonInput = document.getElementById('HorarioSalon');

  const cursoAs = cursoInput.value;
  const codigoAs = codigoInput.value;
  const creditosAs = creditosInput.value;
  const DocenteAs = DocenteInput.value;
  const cuposAs = cuposInput.value;
  const programaAs = ProgramaAInput.value;
  const Dia = DiaInput.value;
  const Hora = HoraInput.value;
  const Salon = SalonInput.value;

  const Horarios = {dia: Dia, horario: Hora, salon_id: Salon}
 
  // const horarioOcupado = listaAsignaturas.some(asignatura => {
  //   return asignatura.horario_clases.some(horario => {
  //     return horario.dia === Dia && horario.horario === Hora && horario.salon_id === Salon;
  //   });
  // });
  
  // if (horarioOcupado) {
  //   alert('El horario seleccionado ya está ocupado. Por favor elija otro.');
  //   return null;
  // }

  const getId = (entity, list) => {
    const result = list.find(element => entity === element.nombre);
    return result ? result.id : "Id no encontrada o la lista no existe";
  }

  const nuevaAsignatura = {
    id: Number(listaAsignaturas.length + 1),
    curso_id: Number(getId(cursoAs, listaCursos)),
    codigo: codigoAs,
    creditos: creditosAs,
    profesor_id: Number(getId(DocenteAs, listaDocentes)),
    cupos_disponibles: cuposAs,
    programa_id: Number(getId(programaAs, listaProgramas)),
    horario_clases: [Horarios],
  };

  await guardarAsignatura(nuevaAsignatura);
  await cargarCursos();

  alert('Asignatura creada con éxito!');

  return nuevaAsignatura;
}

const guardarAsignatura = async (nuevaAsignatura) => {
  try {

    const respuesta = await fetch('http://localhost:3000/asignaturas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaAsignatura),
    });

    if (!respuesta.ok) {
      throw new Error('Error al crear la Asignatura. Estado: ', respuesta.status);
    }

    const AsignaturaCreada = await respuesta.json();

    console.log('Asignatura creada:', AsignaturaCreada);

  } catch (error) {
    console.error("Error al cargar Asignaturas", error.message);
  }
}

const mostrarListaAsignaturas = async () => {
  await load("asignaturas")

  
  const busquedaAsignaturas = document.getElementById('listado-asignaturas');  

  busquedaAsignaturas.innerHTML = `
    <div class="search-container.Asignaturas">
      <input type="text" class="input-gestion" id="search-input-Asignaturas" placeholder="Buscar Asignaturas...">
      <ul class="results-lists" id="search-results-Asignaturas"></ul>
    </div>
  `;

  const searchInputAsignaturas = document.getElementById('search-input-Asignaturas');
  const searchResultsAsignaturas = document.getElementById('search-results-Asignaturas');

  function displayResultsAsignaturas(results) {
    searchResultsAsignaturas.innerHTML = '';

    results.forEach(result => {
      const li = document.createElement('li');
      li.textContent = `ID: ${result.id}, Codigo: ${result.codigo}, Horario: ${result.horario_clases}, Creditos: ${result.creditos}, Docente ID: ${result.profesor_id}, Programa ID: ${result.programa_id}, Cupos: ${result.cupos_disponibles}`;
      searchResultsAsignaturas.appendChild(li);
    });

  if (results.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No se encontraron Asignaturas';
    searchResultsAsignaturas.appendChild(li);
    return;
  }
  busquedaAsignaturas.style.display = "block";
}

searchInputAsignaturas.addEventListener('input', function() {
  const inputValue = this.value;
  const filteredItems = listaAsignaturas.filter(asignatura => 
    asignatura.codigo.includes(inputValue)
  );

  displayResultsAsignaturas(filteredItems);
});


  displayResultsAsignaturas(listaAsignaturas);
};

// HORARIOS

const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"]

const cargardias=()=>{
    let options= ''
    for (let i = 0; i < dias.length; i++){
        options += `<option value="${dias[i]}">${dias[i]}</option>`
    }
    return options
}

const horarios = [
  { "horario1": '06:00 - 08:00' },
  { "horario1": '08:00 - 10:00' },
  { "horario2": '10:00 - 12:00' },
  { "horario3": '14:00 - 16:00' },
  { "horario4": '16:00 - 18:00' },
  { "horario5": '18:30 - 20:30' },
];

const cargarHorarios = () => {
let options = '';
for (let i = 0; i < horarios.length; i++) {
    const horarioObj = horarios[i];
    const horarioKey = Object.keys(horarioObj)[0];
    const horarioValue = horarioObj[horarioKey];
    options += `<option value="${horarioValue}">${horarioValue}</option>`;
}
return options;
};

//BUSCADORES

function buscadorProgramas(searchInput, searchResults) {
  const searchInputPROG = document.getElementById(searchInput);
  const searchResultsPROG = document.getElementById(searchResults);

  function displayResultsDOCS(results) {
      searchResultsPROG.innerHTML = '';

      if (results.length === 0) {
          const li = document.createElement('li');
          li.textContent = 'No se encontraron programas';
          searchResultsPROG.appendChild(li);
          return;
      }

      results.forEach(result => {
          const li = document.createElement('li');
          li.textContent = result.nombre;
          li.addEventListener('click', function () {
              searchInputPROG.value = result.nombre;
              searchResultsPROG.innerHTML = '';
          });
          searchResultsPROG.appendChild(li);
      });
  }

  searchInputPROG.addEventListener('input', function () {
      const inputValue = this.value.toLowerCase();
      const filteredPrograms = listaProgramas.filter(programa => programa.nombre.toLowerCase().includes(inputValue));
      displayResultsDOCS(filteredPrograms);
  });
}

function buscadorCursos(searchInput2, searchResults2){
    const searchInputCursos = document.getElementById(searchInput2);
    const searchResultsCursos = document.getElementById(searchResults2);

    function displayResultsDOCS(results) {
        searchResultsCursos.innerHTML = '';

        if (results.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No se encontraron programas';
            searchResultsCursos.appendChild(li);
            return;
        }

        results.forEach(result => {
            const li = document.createElement('li');
            li.textContent = result.nombre;
            li.addEventListener('click', function () {
              searchInputCursos.value = result.nombre;
                searchResultsCursos.innerHTML = '';
            });
            searchResultsCursos.appendChild(li);
        });
    }

    searchInputCursos.addEventListener('input', function () {
        const inputValue = this.value.toLowerCase();
        const filteredCurses = listaCursos.filter(curso => curso.nombre.toLowerCase().includes(inputValue));
        displayResultsDOCS(filteredCurses);
    });
}

function buscadorDocentes(searchInput3, searchResults3) {
  const searchInputDOCNT = document.getElementById(searchInput3);
  const searchResultsDOCNT = document.getElementById(searchResults3);

  function displayResultsDOCS(results) {
    searchResultsDOCNT.innerHTML = '';

    if (results.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No se encontraron docentes';
        searchResultsDOCNT.appendChild(li);
        return;
    }

    results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = `${result.nombre} ${result.apellido}`;
        li.addEventListener('click', function () {
            searchInputDOCNT.value = `${result.nombre}`;
            searchResultsDOCNT.innerHTML = '';
        });
        searchResultsDOCNT.appendChild(li);
    });
}

  searchInputDOCNT.addEventListener('input', function () {
      const inputValue = this.value.toLowerCase();
      const filteredDcnts = listaDocentes.filter(docente => docente.nombre.toLowerCase().includes(inputValue));
      displayResultsDOCS(filteredDcnts);
  });
}

const selectSalones = () => {
  let options = '';
  for (let i = 0; i < listaSalones.length; i++) {
    const salon = listaSalones[i];
    options += `<option value="${salon.id}">Salón ${salon.numero_identificacion}, ${salon.edificio}, Piso ${salon.piso}</option>`;
  }
  return options;
}

