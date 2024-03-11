let listaProfesores = []; // Declaración global de la lista de profesores

const cargarFormularioProfesores = () => {
    const profesoresForm = document.getElementById('profesores-crear');
    profesoresForm.innerHTML = `
        <form>
            <label for="nombreProfesor">Nombre del Profesor:</label>
            <input type="text" id="nombreProfesor" required>
            <label for="apellidoProfesor">Apellido del Profesor:</label>
            <input type="text" id="apellidoProfesor" required>
            <label for="tipoDocumentoProfesor">Tipo de Documento:</label>
            <input type="text" id="tipoDocumentoProfesor" required>
            <label for="numeroDocumentoProfesor">Número de Documento:</label>
            <input type="text" id="numeroDocumentoProfesor" required>
            <label for="departamentoProfesor">Departamento:</label>
            <input type="text" id="departamentoProfesor" required>
            <button type="button" onclick="crearProfesor()">Crear Profesor</button>
            <button type="button" onclick="mostrarListadoProfesores()">Ver Listado de Profesores</button>
        </form>
    `;
    const listadoProfesores = document.getElementById('listado-profesores');
}

const crearProfesor = async () => {
    const nombreInput = document.getElementById('nombreProfesor').value;
    const apellidoInput = document.getElementById('apellidoProfesor').value;
    const tipoDocumentoInput = document.getElementById('tipoDocumentoProfesor').value;
    const numeroDocumentoInput = document.getElementById('numeroDocumentoProfesor').value;
    const departamentoInput = document.getElementById('departamentoProfesor').value;

    const nuevoProfesor = {
        nombre: nombreInput,
        apellido: apellidoInput,
        tipo_documento: tipoDocumentoInput,
        numero_documento: numeroDocumentoInput,
        departamento_id: departamentoInput
    };

    await guardarProfesor(nuevoProfesor);
    listaProfesores = await load("profesores");

    const form = document.querySelector('form');
    form.reset();

    alert('Profesor creado con éxito!');
}

const guardarProfesor = async (nuevoProfesor) => {
    try {
        const respuesta = await fetch('http://localhost:3000/profesores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoProfesor),
        });

        if (!respuesta.ok) {
            throw new Error('Error al crear el alumno. Estado: ' + respuesta.status);
        }
        const profesorCreado = await respuesta.json();
        console.log('profesor creado:', profesorCreado);
    } catch (error) {
        console.error("Error al crear profesor", error.message);
    }
}

const mostrarListadoProfesores = async () => {
    listaProfesores = await load("profesores");
    const profesoresForm = document.getElementById('profesores-crear');
    const listadoProfesores = document.getElementById('listado-profesores');
    profesoresForm.style.display = 'none';
    listadoProfesores.style.display = 'block';

    const ul = document.createElement('ul');

    for (const profesor of listaProfesores) {
        const li = document.createElement('li');
        li.innerHTML="";
        li.innerHTML = createCard(profesor)
        
        ul.appendChild(li);
    }

    listadoProfesores.innerHTML = '';
    listadoProfesores.appendChild(ul);

    const volverButton = document.createElement('button');
    volverButton.textContent = 'Volver al Formulario';
    volverButton.addEventListener('click', volverFormularioProfesores);
    listadoProfesores.appendChild(volverButton);
}

const volverFormularioProfesores = () => {
    const profesoresForm = document.getElementById('profesores-crear');
    const listadoProfesores = document.getElementById('listado-profesores');

    listadoProfesores.style.display = 'none';
    profesoresForm.style.display = 'block';
}
