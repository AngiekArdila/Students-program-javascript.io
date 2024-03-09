let listaMatriculas = [];

const cargarFormularioMatriculas = () => {
    const matriculasForm = document.getElementById('matriculas-crear');
    matriculasForm.innerHTML = `
        <form>
            <label for="estudianteIdMatricula">ID del Estudiante:</label>
            <input type="number" id="estudianteIdMatricula" required>
            <label for="asignaturaIdMatricula">ID de la Asignatura:</label>
            <input type="number" id="asignaturaIdMatricula" required>
            <label for="periodoIdMatricula">ID del Periodo:</label>
            <input type="number" id="periodoIdMatricula" required>
            <label for="precioMatricula">Precio:</label>
            <input type="number" id="precioMatricula" required>
            <button type="button" onclick="crearMatricula()">Crear Matrícula</button>
            <button type="button" onclick="mostrarListadoMatriculas()">Ver Listado de Matrículas</button>
        </form>
    `;
    const listadoMatriculas = document.getElementById('listado-matriculas');
}

const crearMatricula = async () => {
    const estudianteIdInput = document.getElementById('estudianteIdMatricula').value;
    const asignaturaIdInput = document.getElementById('asignaturaIdMatricula').value;
    const periodoIdInput = document.getElementById('periodoIdMatricula').value;
    const precioInput = document.getElementById('precioMatricula').value;

    const nuevaMatricula = {
        estudiante_id: parseInt(estudianteIdInput),
        asignatura_id: parseInt(asignaturaIdInput),
        periodo_id: parseInt(periodoIdInput),
        precio: parseFloat(precioInput)
    };

    await guardarMatricula(nuevaMatricula);
    listaMatriculas = await load("matriculas");

    const form = document.querySelector('form');
    form.reset();

    alert('Matrícula creada con éxito!');
}

const guardarMatricula = async (nuevaMatricula) => {
    try {
        const respuesta = await fetch('http://localhost:3000/matriculas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaMatricula),
        });

        if (!respuesta.ok) {
            throw new Error('Error al crear la matrícula. Estado: ' + respuesta.status);
        }
        const matriculaCreada = await respuesta.json();
        console.log('Matrícula creada:', matriculaCreada);
    } catch (error) {
        console.error("Error al crear matrícula", error.message);
    }
}

const mostrarListadoMatriculas = async () => {
    listaMatriculas = await load("matriculas");
    const matriculasForm = document.getElementById('matriculas-crear');
    const listadoMatriculas = document.getElementById('listado-matriculas');
    matriculasForm.style.display = 'none';
    listadoMatriculas.style.display = 'block';

    const ul = document.createElement('ul');

    for (const matricula of listaMatriculas) {
        const li = document.createElement('li');
        li.textContent = `ID: ${matricula.id}, Estudiante ID: ${matricula.estudiante_id}, Asignatura ID: ${matricula.asignatura_id}, Periodo ID: ${matricula.periodo_id}, Precio: ${matricula.precio}`;
        ul.appendChild(li);
    }

    listadoMatriculas.innerHTML = '';
    listadoMatriculas.appendChild(ul);

    const volverButton = document.createElement('button');
    volverButton.textContent = 'Volver al Formulario';
    volverButton.addEventListener('click', volverFormularioMatriculas);
    listadoMatriculas.appendChild(volverButton);
}

const volverFormularioMatriculas = () => {
    const matriculasForm = document.getElementById('matriculas-crear');
    const listadoMatriculas = document.getElementById('listado-matriculas');

    listadoMatriculas.style.display = 'none';
    matriculasForm.style.display = 'block';
}

// Cargar la lista de matrículas al iniciar la página
load("matriculas").then(matriculas => listaMatriculas = matriculas);
