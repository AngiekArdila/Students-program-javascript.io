let listaPeriodos = [];


const cargarFormularioPeriodos = () => {
    const periodosForm = document.getElementById('periodos-form');
    periodosForm.innerHTML = `
        <form>
            <label for="codigoPeriodo">Código del Periodo:</label>
            <input type="text" id="codigoPeriodo" required>
            <label for="anoPeriodo">Año:</label>
            <input type="number" id="anoPeriodo" required>
            <label for="semestrePeriodo">Semestre:</label>
            <input type="number" id="semestrePeriodo" required>
            <button type="button" onclick="crearPeriodo()">Crear Periodo</button>
            <button type="button" onclick="mostrarListadoPeriodos()">Ver Listado de Periodos</button>
        </form>
    `;
    const listadoPeriodos = document.getElementById('listado-periodos');
    listadoPeriodos.style.display = 'none';
}

const crearPeriodo = async () => {
    const codigoInput = document.getElementById('codigoPeriodo').value;
    const anoInput = document.getElementById('anoPeriodo').value;
    const semestreInput = document.getElementById('semestrePeriodo').value;

    const nuevoPeriodo = {
        codigo: codigoInput,
        ano: parseInt(anoInput),
        semestre: parseInt(semestreInput)
    };

    await guardarPeriodo(nuevoPeriodo);
    listaPeriodos = await load("periodos");

    const form = document.querySelector('form');
    form.reset();

    alert('Periodo creado con éxito!');
}

const guardarPeriodo = async (nuevoPeriodo) => {
    try {
        const respuesta = await fetch('http://localhost:3000/periodos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoPeriodo),
        });

        if (!respuesta.ok) {
            throw new Error('Error al crear el periodo. Estado: ' + respuesta.status);
        }
        const periodoCreado = await respuesta.json();
        console.log('Periodo creado:', periodoCreado);
    } catch (error) {
        console.error("Error al crear periodo", error.message);
    }
}

const mostrarListadoPeriodos = async () => {
    listaPeriodos = await load("periodos");
    const periodosForm = document.getElementById('periodos-form');
    const listadoPeriodos = document.getElementById('listado-periodos');
    periodosForm.style.display = 'none';
    listadoPeriodos.style.display = 'block';

    const ul = document.createElement('ul');

    for (const periodo of listaPeriodos) {
        const li = document.createElement('li');
        li.textContent = `ID: ${periodo.id}, Código: ${periodo.codigo}, Año: ${periodo.ano}, Semestre: ${periodo.semestre}`;
        ul.appendChild(li);
    }

    listadoPeriodos.innerHTML = '';
    listadoPeriodos.appendChild(ul);

    const volverButton = document.createElement('button');
    volverButton.textContent = 'Volver al Formulario';
    volverButton.addEventListener('click', volverFormularioPeriodos);
    listadoPeriodos.appendChild(volverButton);
}

const volverFormularioPeriodos = () => {
    const periodosForm = document.getElementById('periodos-form');
    const listadoPeriodos = document.getElementById('listado-periodos');

    listadoPeriodos.style.display = 'none';
    periodosForm.style.display = 'block';
}

// Cargar la lista de periodos al iniciar la página
load("periodos").then(periodos => listaPeriodos = periodos);
