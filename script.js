'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// Old school ways..

// const getCountryData = (country) => {
//   const request = new XMLHttpRequest();

//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   // asynchronusly --- load event is emitted.. 
//   request.send();
//   console.log(request.responseText);

//   request.addEventListener('load', function () {

//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html =
//       `<article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//           </div>
//         </article>`

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;



//   });
// }

// getCountryData('portugal');
// getCountryData('russia');
// getCountryData('germany');


const renderCountry = (data, className = '') => {
  const html =
    `<article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>`

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;

}

// const getCountryAndNeighbour = (country) => {

//   // Ajax call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}?fullText=true`);
//   // asynchronusly --- load event is emitted.. 
//   request.send();
//   console.log(request.responseText);

//   // Callback Hell
//   request.addEventListener('load', function () {

//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     // render country 1
//     renderCountry(data);

//     // Get neighbour Country
//     const [neighbour] = data.borders;

//     if (!neighbour) return

//     // Ajax call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     // Asynchronusly --- load event is emitted.. 
//     request2.send();

//     request2.addEventListener('load', function () {
//       // No longer array
//       const data2 = JSON.parse(this.responseText);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// }

// getCountryAndNeighbour('usa');


// const request = new XMLHttpRequest();

// request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
// // asynchronusly --- load event is emitted.. 
// request.send();

// // Promise
// const request = fetch(`https://restcountries.eu/rest/v2/name/portugal`);
// console.log(request);

// const getCountryData = (country) => {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`).then((response) => {
//     console.log(response);
//     // Json method is avaliable on the all the response object that is comming from a promise
//     // Json method is also an asynchronous method hence returns promise
//     return response.json();
//   }).then(data => {
//     console.log(data);
//     renderCountry(data[0]);
//   });
// }

const getCountryData = (country) => {
  // Country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`).then((response) => response.json(), err => alert(err)
  ).then(data => {
    renderCountry(data[0])
    const neighbour = data[0].borders[0];

    if (!neighbour) return;

    // Country 2 
    return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
  }).then(response => response.json()).then(data => renderCountry(data, 'neighbour'))
}


btn.addEventListener('click', function () {
  getCountryData('china');
});
