const listaEstudiantes = [];

const cargarEstudiantes = async () => {
    try {
        listaEstudiantes.length = 0;
        const respuesta = await fetch('http://localhost:3000/estudiantes');

        if (!respuesta.ok) {
            throw new Error('Error al cargar estudiantes. Estado: ' + respuesta.status);
        }

        const estudiantes = await respuesta.json();
        listaEstudiantes.push(...estudiantes);

    } catch (error) {
        console.error("Error al cargar estudiantes", error.message);
    }
}

const guardarEstudiante = async (nuevoEstudiante) => {
    try {

        const respuesta = await fetch('http://localhost:3000/estudiantes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoEstudiante),
        });

        if (!respuesta.ok) {
            throw new Error('Error al crear el estudiante. Estado: ' + respuesta.status);
        }
        const estudianteCreado = await respuesta.json();


        console.log('Estudiante creado:', estudianteCreado);

    } catch (error) {
        console.error("Error al cargar estudiantes", error.message);
    }
}

const cargarFormularioEstudiantes = () => {
    const estudiantesForm = document.getElementById('estudiantes-form');
    estudiantesForm.innerHTML = `
        <form>
            <label for="nombreEstudiante">Nombre del Estudiante:</label>
            <input type="text" id="nombreEstudiante" required>
            <label for="edadEstudiante">Edad del Estudiante:</label>
            <input type="number" id="edadEstudiante" required>
            <label for="emailEstudiante">Correo Electrónico del Estudiante:</label>
            <input type="email" id="emailEstudiante" required>
            <button type="button" onclick="crearEstudiante()">Crear Estudiante</button>
            <button type="button" onclick="mostrarListado()">Ver Listado de Estudiantes</button>
            <!-- Aquí se puede añadir más funcionalidad, como modificar y eliminar estudiantes -->
        </form>
    `;
    const listadoEstudiantes = document.getElementById('listado-estudiantes');
    listadoEstudiantes.style.display = 'none';
}

const crearEstudiante = async () => {
    const nombreInput = document.getElementById('nombreEstudiante');
    const edadInput = document.getElementById('edadEstudiante');
    const emailInput = document.getElementById('emailEstudiante');

    const nombre = nombreInput.value;
    const edad = edadInput.value;
    const email = emailInput.value;

    const nuevoEstudiante = {
        id: listaEstudiantes.length + 1,
        nombre: nombre,
        edad: edad,
        email: email
    }


    await guardarEstudiante(nuevoEstudiante);
    await cargarEstudiantes();

    nombreInput.value = '';
    edadInput.value = '';
    emailInput.value = '';

    alert('Estudiante creado con éxito!');

    return nuevoEstudiante;

}

const mostrarListado = async () => {
    await cargarEstudiantes();
    const estudiantesForm = document.getElementById('estudiantes-form');
    const listadoEstudiantes = document.getElementById('listado-estudiantes');

    estudiantesForm.style.display = 'none';
    listadoEstudiantes.style.display = 'block';

    const ul = document.createElement('ul');

    for (const estudiante of listaEstudiantes) {
        const li = document.createElement('li');
        li.textContent = `ID: ${estudiante.id}, Nombre: ${estudiante.nombre}, Edad: ${estudiante.edad}, Email: ${estudiante.email}`;
        ul.appendChild(li);
    }

    listadoEstudiantes.innerHTML = '';
    listadoEstudiantes.appendChild(ul);

    const volverButton = document.createElement('button');
    volverButton.textContent = 'Volver al Formulario';
    volverButton.addEventListener('click', volverFormulario);
    listadoEstudiantes.appendChild(volverButton);

}

const volverFormulario = () => {
    const estudiantesForm = document.getElementById('estudiantes-form');
    const listadoEstudiantes = document.getElementById('listado-estudiantes');

    listadoEstudiantes.style.display = 'none';
    estudiantesForm.style.display = 'block';

}

console.log(listaEstudiantes);
