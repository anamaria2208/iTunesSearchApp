const _ = require("lodash");

const baseURL =
  "https://itunes.apple.com/search?";
const input = document.querySelector("input");
const noData = document.querySelector(".no-data");
const tbody = document.querySelector("tbody")

const getData = async (userInput) => {
  const response = await fetch(
    baseURL + new URLSearchParams({ term: userInput, entity: "song" }),
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

input.addEventListener(
  "input",
  _.debounce(async (e) => {
    debugger;
    const userInput = e.target.value.trim();
    console.log(userInput);
    let fetchedData = []
    if (userInput !=="") fetchedData = await getData(userInput);

    if (fetchedData.resultCount === 0 || userInput === '') {
      tbody.innerHTML = ""
      noData.innerHTML = `<main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div class="text-center">
          <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Data not found</h1>
          <p class="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the song you’re looking for.</p>
        </div>
      </main>`;
    } else {
      noData.innerHTML = "";
      tbody.innerHTML = ''
      fetchedData.results.forEach((result,index) => {
        const tbody = document.querySelector("tbody")
        tbody.innerHTML += `
        <tr class="border-b px-6 ">
        <td class="text-center font-bold">${++index}</td>
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center lg:block hidden"><img src=${result.artworkUrl100} alt="albumImage" class="mx-auto"></td>
        <td class="text-sm text-gray-900 font-light px-6 py-4  max-w-xl">${result.artistName}</td>
        <td class="text-sm text-gray-900 font-light px-6 py-4  max-w-xl">${result.trackName}</td>
        <td class="text-sm font-bold text-gray-900  px-6 py-4 whitespace-nowrap text-center">${result.trackPrice || 'N/A'}</td>
        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center"><a target="_blank" class="inline-block p-2 bg-blue-500 w-24 text-white text-center rounded-md" href=${result.collectionViewUrl}>Buy</a></td>
        </tr>
        `
      })
    }
  }, 250)
);
