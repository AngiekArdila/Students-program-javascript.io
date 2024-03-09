let listaProgramas = [];

const cargarFormularioProgramas = () => {
    const programasForm = document.getElementById('programas-form');
    programasForm.innerHTML = `
        <form>
            <label for="nombrePrograma">Nombre del Programa:</label>
            <input type="text" id="nombrePrograma" required>
            <label for="nivelPrograma">Nivel del Programa:</label>
            <input type="text" id="nivelPrograma" required>
            <button type="button" onclick="crearPrograma()">Crear Programa</button>
            <button type="button" onclick="mostrarListadoProgramas()">Ver Listado de Programas</button>
        </form>
    `;
    const listadoProgramas = document.getElementById('listado-programas');
    listadoProgramas.style.display = 'none';
}

const crearPrograma = async () => {
    const nombreInput = document.getElementById('nombrePrograma').value;
    const nivelInput = document.getElementById('nivelPrograma').value;

    const nuevoPrograma = {
        nombre: nombreInput,
        nivel: nivelInput
    };

    await guardarPrograma(nuevoPrograma);
    listaProgramas = await load("programas");

    const form = document.querySelector('form');
    form.reset();

    alert('Programa creado con éxito!');
}

const guardarPrograma = async (nuevoPrograma) => {
    try {
        const respuesta = await fetch('http://localhost:3000/programas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoPrograma),
        });

        if (!respuesta.ok) {
            throw new Error('Error al crear el programa. Estado: ' + respuesta.status);
        }
        const programaCreado = await respuesta.json();
        console.log('Programa creado:', programaCreado);
    } catch (error) {
        console.error("Error al crear programa", error.message);
    }
}

const mostrarListadoProgramas = async () => {
    listaProgramas = await load("programas");
    const programasForm = document.getElementById('programas-form');
    const listadoProgramas = document.getElementById('listado-programas');
    programasForm.style.display = 'none';
    listadoProgramas.style.display = 'block';

    const ul = document.createElement('ul');

    for (const programa of listaProgramas) {
        const li = document.createElement('li');
        li.textContent = `ID: ${programa.id}, Nombre: ${programa.nombre}, Nivel: ${programa.nivel}`;
        ul.appendChild(li);
    }

    listadoProgramas.innerHTML = '';
    listadoProgramas.appendChild(ul);

    const volverButton = document.createElement('button');
    volverButton.textContent = 'Volver al Formulario';
    volverButton.addEventListener('click', volverFormularioProgramas);
    listadoProgramas.appendChild(volverButton);
}

const volverFormularioProgramas = () => {
    const programasForm = document.getElementById('programas-form');
    const listadoProgramas = document.getElementById('listado-programas');

    listadoProgramas.style.display = 'none';
    programasForm.style.display = 'block';
}

// Cargar la lista de programas al iniciar la página
load("programas").then(programas => listaProgramas = programas);
