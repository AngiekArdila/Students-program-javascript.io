let listaDepartamentos = [];

const cargarFormularioDepartamentos = () => {
    const departamentosForm = document.getElementById('departamentos-form');
    departamentosForm.innerHTML = `
        <form>
            <label for="nombreDepartamento">Nombre del Departamento:</label>
            <input type="text" id="nombreDepartamento" required>
            <button type="button" onclick="crearDepartamento()">Crear Departamento</button>
            <button type="button" onclick="mostrarListadoDepartamentos()">Ver Listado de Departamentos</button>
        </form>
    `;
    const listadoDepartamentos = document.getElementById('listado-departamentos');
    listadoDepartamentos.style.display = 'none';
}

const crearDepartamento = async () => {
    const nombreInput = document.getElementById('nombreDepartamento').value;

    const nuevoDepartamento = {
        nombre: nombreInput
    };

    await guardarDepartamento(nuevoDepartamento);
    listaDepartamentos = await load("departamentos");

    const form = document.querySelector('form');
    form.reset();

    alert('Departamento creado con éxito!');
}

const guardarDepartamento = async (nuevoDepartamento) => {
    try {
        const respuesta = await fetch('http://localhost:3000/departamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoDepartamento),
        });

        if (!respuesta.ok) {
            throw new Error('Error al crear el departamento. Estado: ' + respuesta.status);
        }
        const departamentoCreado = await respuesta.json();
        console.log('Departamento creado:', departamentoCreado);
    } catch (error) {
        console.error("Error al crear departamento", error.message);
    }
}

const mostrarListadoDepartamentos = async () => {
    listaDepartamentos = await load("departamentos");
    const departamentosForm = document.getElementById('departamentos-form');
    const listadoDepartamentos = document.getElementById('listado-departamentos');
    departamentosForm.style.display = 'none';
    listadoDepartamentos.style.display = 'block';

    const ul = document.createElement('ul');

    for (const departamento of listaDepartamentos) {
        const li = document.createElement('li');
        li.textContent = `ID: ${departamento.id}, Nombre: ${departamento.nombre}`;
        ul.appendChild(li);
    }

    listadoDepartamentos.innerHTML = '';
    listadoDepartamentos.appendChild(ul);

    const volverButton = document.createElement('button');
    volverButton.textContent = 'Volver al Formulario';
    volverButton.addEventListener('click', volverFormularioDepartamentos);
    listadoDepartamentos.appendChild(volverButton);
}

const volverFormularioDepartamentos = () => {
    const departamentosForm = document.getElementById('departamentos-form');
    const listadoDepartamentos = document.getElementById('listado-departamentos');

    listadoDepartamentos.style.display = 'none';
    departamentosForm.style.display = 'block';
}

// Cargar la lista de departamentos al iniciar la página
load("departamentos").then(departamentos => listaDepartamentos = departamentos);
