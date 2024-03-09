let listaPeriodos = [];

const mostrarListadoPeriodos = async () => {
    listaPeriodos = await load("periodos");
    const listadoPeriodos = document.getElementById('listado-periodos');

    const ul = document.createElement('ul');

    for (const periodo of listaPeriodos) {
        const li = document.createElement('li');
        li.textContent = `ID: ${periodo.id}, Código: ${periodo.codigo}, Año: ${periodo.ano}, Semestre: ${periodo.semestre}`;
        ul.appendChild(li);
    }

    listadoPeriodos.innerHTML = '';
    listadoPeriodos.appendChild(ul);
}

let listaProgramas = [];

const mostrarListadoProgramas = async () => {
    listaProgramas = await load("programas");
    const listadoProgramas = document.getElementById('listado-programas');

    const ul = document.createElement('ul');

    for (const programa of listaProgramas) {
        const li = document.createElement('li');
        li.textContent = `ID: ${programa.id}, Nombre: ${programa.nombre}, Nivel: ${programa.nivel}`;
        ul.appendChild(li);
    }

    listadoProgramas.innerHTML = '';
    listadoProgramas.appendChild(ul);

}

let listaTarifas = [];

const mostrarListadoTarifas = async () => {
    listaTarifas = await load("tarifas");
    const tarifasForm = document.getElementById('tarifas-crear');
    const listadoTarifas = document.getElementById('listado-tarifas');
    listadoTarifas.style.display = 'block';

    const ul = document.createElement('ul');

    for (const tarifa of listaTarifas) {
        const li = document.createElement('li');
        li.textContent = `ID: ${tarifa.id}, Costo por Crédito: ${tarifa.costo_credito}, ID del Periodo: ${tarifa.periodo_id}, ID del Programa: ${tarifa.programa_id}`;
        ul.appendChild(li);
    }

    listadoTarifas.innerHTML = '';
    listadoTarifas.appendChild(ul);

}

let listaDepartamentos = [];

const mostrarListadoDepartamentos = async () => {
    listaDepartamentos = await load("departamentos");
    const listadoDepartamentos = document.getElementById('listado-departamentos');

    const ul = document.createElement('ul');

    for (const departamento of listaDepartamentos) {
        const li = document.createElement('li');
        li.textContent = `ID: ${departamento.id}, Nombre: ${departamento.nombre}`;
        ul.appendChild(li);
    }

    listadoDepartamentos.innerHTML = '';
    listadoDepartamentos.appendChild(ul);

}

let listaSalones = [];

const mostrarListadoSalones = async () => {

    listaSalones = await load("salones");
    const listadoSalones = document.getElementById('listado-salones');

    const ul = document.createElement('ul');

    for (const salon of listaSalones) {
        const li = document.createElement('li');
        li.textContent = `ID: ${salon.id}, Capacidad: ${salon.capacidad_alumnos}, Edificio: ${salon.edificio}, Piso: ${salon.piso}, Número de Identificación: ${salon.numero_identificacion}`;
        ul.appendChild(li);
    }

    listadoSalones.innerHTML = '';
    listadoSalones.appendChild(ul); 
}