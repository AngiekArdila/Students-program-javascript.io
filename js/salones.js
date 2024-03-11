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

/* Mejoras */ 

