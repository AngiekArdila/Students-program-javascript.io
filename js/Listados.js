let listaPeriodos = [];

const mostrarListadoPeriodos = async () => {
    listaPeriodos = await load("periodos");
    const listadoPeriodos = document.getElementById('listado-periodos');

    const ul = document.createElement('ul');

    for (const periodo of listaPeriodos) {
        const li = document.createElement('li');
        li.innerHTML="";
        li.innerHTML = createCard(periodo)
        // li.textContent = `ID: ${alumno.id}, Nombre: ${alumno.nombre}, Apellido: ${alumno.apellido}, Documento: ${alumno.tipo_documento}, Ciudad: ${alumno.ciudad_residencia}, Dirección: ${alumno.direccion}, Teléfono: ${alumno.telefono}, Fecha de Nacimiento: ${alumno.fecha_nacimiento}, Sexo: ${alumno.sexo}, ID Programa: ${alumno.programa_id}`;
        ul.appendChild(li);
        
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
        li.innerHTML="";
        li.innerHTML = createCard(programa)
        
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
        li.innerHTML="";
        li.innerHTML = createCard(tarifa)
        
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
        li.innerHTML="";
        li.innerHTML = createCard(departamento)
        
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

    for (const salones of listaSalones) {
        const li = document.createElement('li');
        li.innerHTML="";
        li.innerHTML = createCard(salones)
        
        ul.appendChild(li);
    }

    listadoSalones.innerHTML = '';
    listadoSalones.appendChild(ul); 
}

  