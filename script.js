async function init() {
    const pokemonData = await fetchPokemonList(0, 20);
    console.log("Daten in script.js:", pokemonData);
}

async function renderPokemonList(){
    const pokemonData = await fetchPokemonList(0, 20);
    const container = document.getElementById("pokemonContainer");

    container.innerHTML = "";

   pokemonData.forEach(pokemon => { container.innerHTML += pokemonCardTemplate(pokemon)});

}

renderPokemonList();