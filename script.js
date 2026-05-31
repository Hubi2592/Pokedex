async function init() {
    const pokemonData = await fetchPokemonList(0, 10);
    console.log("Daten in script.js:", pokemonData);
}

async function renderPokemonList(offset = 0, limit = 10) {
    const pokemonData = await fetchPokemonList(offset, limit);
    const container = document.getElementById("pokemonContainer");

   pokemonData.forEach(pokemon => { container.innerHTML += pokemonCardTemplate(pokemon)});
}

function loadNextPokemonBatch() {
    const currentCount = document.querySelectorAll(".pokemonCard").length;
    renderPokemonList(currentCount, 10);
}

renderPokemonList();

console.log(pokedex);