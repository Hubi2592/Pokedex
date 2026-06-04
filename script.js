async function init() {
    const pokemonData = await fetchPokemonList(0, 10);
    console.log("Daten in script.js:", pokemonData);
}

async function renderPokemonList(offset = 0, limit = 20) {
    const pokemonData = await fetchPokemonList(offset, limit);
    const container = document.getElementById("pokemonContainer");

   pokemonData.forEach(pokemon => { container.innerHTML += pokemonCardTemplate(pokemon)});
}

function loadNextPokemonBatch() {
    const currentCount = document.querySelectorAll(".pokemonCard").length;
    renderPokemonList(currentCount, 20);
}

function getPokemonById(id) {
    for (const pokemon of pokedex.values()) {
        if (pokemon.id === id) {
            return pokemon;
        }
    }
}

// ------------------ Overlay Funktionen ------------------

 async function openOverlay(id) {
    currentPokemonId = id;
    const pokemon = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const overlay = document.getElementById("overlayPokemonDetails");

    overlay.innerHTML = overlayTemplate(pokemon);
    document.body.classList.add("noScroll");

    overlay.classList.remove("hidden");
    overlay.focus();
}

function closeOverlay() {
    document.getElementById("overlayPokemonDetails").classList.add("hidden");
    document.body.classList.remove("noScroll");
}

async function previousPokemon() {
    if (currentPokemonId <= 1){
        return;
    }
    currentPokemonId--;
    await openOverlay(currentPokemonId);
    
}

async function nextPokemon() {
    currentPokemonId++;
    await openOverlay(currentPokemonId);
}

function handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
        previousPokemon();
    } else if (event.key === "ArrowRight") {
        nextPokemon();
    } else if (event.key === "Escape") {
        closeOverlay();
    }
}

function clickOutside(event) {
    if (event.target === document.getElementById("overlayPokemonDetails")) {
        closeOverlay();
    }
}

renderPokemonList();

console.log(pokedex);