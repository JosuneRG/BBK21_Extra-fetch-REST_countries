
const countriesNode = document.getElementById("countries");

const cardTemplate = function (country) {
  const flag = country?.flags?.png || 'https://via.placeholder.com/200x100?text=No+Flag';
  const name = country?.name?.common || 'Nombre desconocido';

  return `<div class="card">
            <img src="${flag}" alt="Flag of ${name}" />
            <h1 class="center">${name}</h1>
          </div>`;
};


fetch(`https://restcountries.com/v3.1/all`)
  .then(response => response.json())
  .then(countries => {
    countries.forEach(country => {
      countriesNode.innerHTML += cardTemplate(country);
    });
  })
  .catch(error => {
    console.error("Error al obtener los países:", error);
    countriesNode.innerHTML = `<p>Error cargando los países.</p>`;
  });

 
