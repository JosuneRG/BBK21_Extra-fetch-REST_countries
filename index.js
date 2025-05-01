const countriesNode = document.getElementById("countries");
const selectContinent = document.getElementById("continentSelect");

let allCountries = []; // Guardamos todos los países aquí

const cardTemplate = function (country) {
  const flag = country?.flags?.png || 'https://via.placeholder.com/200x100?text=No+Flag';
  const name = country?.name?.common || 'Nombre desconocido';

  return `<div class="card">
            <img src="${flag}" alt="Flag of ${name}" />
            <h1 class="center">${name}</h1>
          </div>`;
};

// Función para mostrar los países (todos o filtrados)
function mostrarPaises(lista) {
  countriesNode.innerHTML = ""; // limpiamos
  lista.forEach(country => {
    countriesNode.innerHTML += cardTemplate(country);
  });
}

// Llamamos a la API y guardamos todos los países
fetch(`https://restcountries.com/v3.1/all`)
  .then(response => response.json())
  .then(countries => {
    allCountries = countries;1
    mostrarPaises(allCountries); // Mostrar todos al inicio
    // countries.forEach(country => {
    //   countriesNode.innerHTML += cardTemplate(country);
    // });
  })
  .catch(error => {
    console.error("Error al obtener los países:", error);
    countriesNode.innerHTML = `<p>Error cargando los países.</p>`;
  });

 
// Escuchamos el cambio del filtro de continente
selectContinent.addEventListener("change", () => {
  const continenteSeleccionado = selectContinent.value;

  if (continenteSeleccionado === "all") {
    mostrarPaises(allCountries);
  } else {
    const filtrados = allCountries.filter(pais => pais.continents && pais.continents.includes(continenteSeleccionado));
    mostrarPaises(filtrados);
  }
});