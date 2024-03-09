let listaAlumnos = [];

const load = async (url) => {
    try {
        lista = [];
        const respuesta = await fetch(`http://localhost:3000/${url}`);

        if (!respuesta.ok) {
            throw new Error(`Error al cargar ${url}. Estado: ` + respuesta.status);
        }
        const listaJson = await respuesta.json();
        lista.push(...listaJson);
        return lista;
    } catch (error) {
        console.error(`Error al cargar ${url}`, error.message);
    }
}

const guardarAlumno = async (nuevoAlumno) => {
    try {
        const respuesta = await fetch('http://localhost:3000/alumnos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoAlumno),
        });

        if (!respuesta.ok) {
            throw new Error('Error al crear el alumno. Estado: ' + respuesta.status);
        }
        const alumnoCreado = await respuesta.json();
        console.log('Alumno creado:', alumnoCreado);
    } catch (error) {
        console.error("Error al crear alumno", error.message);
    }
}

const cargarFormularioAlumnos = () => {
    const alumnosForm = document.getElementById('estudiantes-crear');
    alumnosForm.innerHTML = `
        <form>
            <label for="nombreAlumno">Nombre del Alumno:</label>
            <input type="text" id="nombreAlumno" required>
            <label for="apellidoAlumno">Apellido del Alumno:</label>
            <input type="text" id="apellidoAlumno" required>
            <label for="tipoDocumentoAlumno">Tipo de Documento:</label>
            <input type="text" id="tipoDocumentoAlumno" required>
            <label for="numeroDocumentoAlumno">Número de Documento:</label>
            <input type="text" id="numeroDocumentoAlumno" required>
            <label for="ciudadResidenciaAlumno">Ciudad de Residencia:</label>
            <input type="text" id="ciudadResidenciaAlumno" required>
            <label for="direccionAlumno">Dirección:</label>
            <input type="text" id="direccionAlumno" required>
            <label for="telefonoAlumno">Teléfono:</label>
            <input type="text" id="telefonoAlumno" required>
            <label for="fechaNacimientoAlumno">Fecha de Nacimiento:</label>
            <input type="date" id="fechaNacimientoAlumno" required>
            <label for="sexoAlumno">Sexo:</label>
            <select id="sexoAlumno" required>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
            </select>
            <label for="programaIdAlumno">ID del Programa:</label>
            <input type="number" id="programaIdAlumno" required>
            <button type="button" onclick="crearAlumno()">Crear Alumno</button>
            <button type="button" onclick="mostrarListadoAlumnos()">Ver Listado de Alumnos</button>
        </form>
    `;
    const listadoAlumnos = document.getElementById('listado-alumnos');
}

const crearAlumno = async () => {
    const nombreInput = document.getElementById('nombreAlumno').value;
    const apellidoInput = document.getElementById('apellidoAlumno').value;
    const tipoDocumentoInput = document.getElementById('tipoDocumentoAlumno').value;
    const numeroDocumentoInput = document.getElementById('numeroDocumentoAlumno').value;
    const ciudadResidenciaInput = document.getElementById('ciudadResidenciaAlumno').value;
    const direccionInput = document.getElementById('direccionAlumno').value;
    const telefonoInput = document.getElementById('telefonoAlumno').value;
    const fechaNacimientoInput = document.getElementById('fechaNacimientoAlumno').value;
    const sexoInput = document.getElementById('sexoAlumno').value;
    const programaIdInput = document.getElementById('programaIdAlumno').value;

    const nuevoAlumno = {
        nombre: nombreInput,
        apellido: apellidoInput,
        tipo_documento: tipoDocumentoInput,
        numero_documento: numeroDocumentoInput,
        ciudad_residencia: ciudadResidenciaInput,
        direccion: direccionInput,
        telefono: telefonoInput,
        fecha_nacimiento: fechaNacimientoInput,
        sexo: sexoInput,
        programa_id: parseInt(programaIdInput)
    };

    await guardarAlumno(nuevoAlumno);
    listaAlumnos = await load("alumnos");

    const form = document.querySelector('form');
    form.reset();

    alert('Alumno creado con éxito!');
}

const mostrarListadoAlumnos = async () => {
    listaAlumnos = await load("alumnos");
    const alumnosForm = document.getElementById('estudiantes-crear');
    const listadoAlumnos = document.getElementById('listado-alumnos');
    alumnosForm.style.display = 'none';
    listadoAlumnos.style.display = 'block';

    const ul = document.createElement('ul');

    for (const alumno of listaAlumnos) {
        const li = document.createElement('li');
        li.textContent = `ID: ${alumno.id}, Nombre: ${alumno.nombre}, Apellido: ${alumno.apellido}, Documento: ${alumno.tipo_documento}, Ciudad: ${alumno.ciudad_residencia}, Dirección: ${alumno.direccion}, Teléfono: ${alumno.telefono}, Fecha de Nacimiento: ${alumno.fecha_nacimiento}, Sexo: ${alumno.sexo}, ID Programa: ${alumno.programa_id}`;
        ul.appendChild(li);
    }

    listadoAlumnos.innerHTML = '';
    listadoAlumnos.appendChild(ul);

    const volverButton = document.createElement('button');
    volverButton.textContent = 'Volver al Formulario';
    volverButton.addEventListener('click', volverFormularioAlumnos);
    listadoAlumnos.appendChild(volverButton);
}

const volverFormularioAlumnos = () => {
    const alumnosForm = document.getElementById('alumnos-form');
    const listadoAlumnos = document.getElementById('listado-alumnos');

    listadoAlumnos.style.display = 'none';
    alumnosForm.style.display = 'block';
}

