const digimonSelect = document.getElementById('digimon-select');
const digimonTableBody = document.getElementById('digimon-table-body');

// Función para cargar todos los Digimon en la lista de selección
function loadAllDigimon() {
    const url = 'https://digimon-api.vercel.app/api/digimon';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.forEach(digimon => {
                const option = document.createElement('option');
                option.value = digimon.name;
                option.textContent = digimon.name;
                digimonSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener información de todos los Digimon:', error));
}

// Función para obtener y mostrar la información de un Digimon seleccionado
function getDigimon() {
    const digimonName = digimonSelect.value;

    const url = `https://digimon-api.vercel.app/api/digimon/name/${encodeURIComponent(digimonName)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayDigimon(data[0]);
            addDigimonToTable(data[0]);
        })
        .catch(error => console.error('Error al obtener información del Digimon:', error));
}

// Función para mostrar la información de un Digimon en el área de información
function displayDigimon(digimon) {
    const digimonInfo = document.getElementById('digimon-info');
    digimonInfo.innerHTML = '';

    if (digimon) {
        const digimonElement = document.createElement('div');
        digimonElement.innerHTML = `
                    <h2>${digimon.name}</h2>
                    <p>Nivel: ${digimon.level}</p>
                    <p>Tipo: ${digimon.type}</p>
                    <img src="${digimon.img}" alt="${digimon.name}">
                    <h3>Historia:</h3>
                    <p>${digimon.description ? digimon.description : 'No hay información de la historia disponible.'}</p>
                    <h3>Habilidades:</h3>
                    <ul>
                        ${digimon.skills ? digimon.skills.map(skill => `<li>${skill}</li>`).join('') : 'No hay información de habilidades disponibles.'}
                    </ul>
                `;
        digimonInfo.appendChild(digimonElement);
    } else {
        digimonInfo.textContent = 'Digimon no encontrado.';
    }
}

// Función para agregar un Digimon a la tabla
function addDigimonToTable(digimon) {
    const row = digimonTableBody.insertRow();
    row.innerHTML = `
                <td>${digimon.name}</td>
                <td>${digimon.level}</td>
                <td>${digimon.type}</td>
                <td><img src="${digimon.img}" alt="${digimon.name}" style="width: 50px; height: 50px;"></td>
            `;
}


// Cargar todos los Digimon al cargar la página
loadAllDigimon();
// Función para cargar todos los personajes de Digimon en la tabla
function loadAllCharacters() {
    const url = 'https://digimon-api.vercel.app/api/characters';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.forEach(character => {
                addCharacterToTable(character);
            });
        })
        .catch(error => console.error('Error al obtener información de los personajes de Digimon:', error));
}


