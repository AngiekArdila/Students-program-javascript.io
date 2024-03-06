const listadepartamentos = [];

const loaddepartamentos = async () => {
    try {
        listadepartamentos.length = 0;
        const respuesta = await fetch('http://localhost:3000/departamentos');

        if (!respuesta.ok) {
            throw new Error('Error al cargar departamentos. Estado: ' + respuesta.status);
        }

        const departamentos = await respuesta.json();
        listadepartamentos.push(...departamentos);

    } catch (error) {
        console.error("Error al cargar departamentos", error.message);
    }
}

const mostrarListadept = async () => {
    await cargarDepartamentos(); // Cambio de cargarEstudiantes a cargarDepartamentos
  
    const busquedaEstudiantes = document.getElementById('busqueda-Estudiantes');  
  
    busquedaEstudiantes.innerHTML = `
      <div class="search-container est">
        <input type="text" id="search-input" placeholder="Buscar Estudiantes...">
        <ul id="search-results"></ul>
      </div>
    `;
  
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
  
    function displayResults(results) {
      searchResults.innerHTML = '';
  
      if (results.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No se encontraron Estudiantes';
        searchResults.appendChild(li);
        return;
      }
  
      results.forEach(result => {
        const li = document.createElement('li');
        li.textContent = `ID: ${result.id}, Nombre: ${result.nombre}, Apellido: ${result.apellido}, Documento: ${result.numero_documento}, Programa ID: ${result.programa_id}`;
        searchResults.appendChild(li);
      });
    }
  
    searchInput.addEventListener('input', function() {
      const inputValue = this.value.trim().toLowerCase();
      const filteredItems = listaEstudiantes.filter(estudiante => 
        estudiante.numero_documento.toLowerCase().includes(inputValue)
      );
  
      displayResults(filteredItems);
    });
  
    displayResults(listaEstudiantes);
  };
  