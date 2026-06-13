async function init() {
    const pokemonData = await fetchPokemonList(0, 10);
    console.log("Daten in script.js:", pokemonData);
    renderPokemonList();
    getAllPokemonNames();
    console.log(pokedex);
    isLoading = false;
}

async function renderPokemonList(offset = 0, limit = 40) {
    const pokemonData = await fetchPokemonList(offset, limit);
    const container = document.getElementById("pokemonContainer");
   pokemonData.forEach(pokemon => { container.innerHTML += pokemonCardTemplate(pokemon)});
}

async function loadNextPokemonBatch() {
    isLoading = true;
    const loadingScreen = document.getElementById("loadingScreen");
    const loadMoreBtn = document.getElementById("loadMoreBtn");

    loadingScreen.classList.remove("hidden");
    loadMoreBtn.disabled = true;

    const currentCount = document.querySelectorAll(".pokemonCard").length;
    await renderPokemonList(currentCount, 100);
    loadingScreen.classList.add("hidden");
    loadMoreBtn.disabled = false;

    isLoading = false;
}

async function backToStart() {
    const container = document.getElementById("pokemonContainer");
    document.getElementById("backToStartBtn").classList.add("hidden");
    document.getElementById("loadMoreBtn").disabled = false;
    document.getElementById("searchInput").value = "";
    container.innerHTML = "";
    await renderPokemonList(0, 40);
}

function getPokemonById(id) {
    for (const pokemon of pokedex.values()) {
        if (pokemon.id === id) {
            return pokemon;
        }
    }
}

// ------------------ Overlay Functions ------------------

 async function openOverlay(id) {
    if (isLoading) return;
    currentPokemonId = id;
    const pokemon = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const overlay = document.getElementById("overlayPokemonDetails");

    overlay.innerHTML = overlayTemplate(pokemon);
    document.body.classList.add("noScroll");
    overlay.classList.remove("hidden");
    overlay.focus();
    await showTab("about", id, document.getElementById("aboutButton"));
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

async function showTab(tabName, pokemonId, button) {
    const pokemon = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const tabContent = document.getElementById("tabContent");
    document.querySelectorAll(".overlayTab").forEach(btn => btn.classList.remove("activeTab"));
    if (button) button.classList.add("activeTab");
    if (tabName === "about") tabContent.innerHTML = await aboutTemplate(pokemon);
    if (tabName === "stats") tabContent.innerHTML = statsTemplate(pokemon);
    if (tabName === "moves") tabContent.innerHTML = await movesTemplate(pokemon);
    if (tabName === "evolution") tabContent.innerHTML = await evolutionTemplate(pokemon);
}

function getGenderText(genderRate) {
    if (genderRate === -1) {
        return "Genderless";
    }

    const female = (genderRate / 8) * 100;
    const male = 100 - female;

    return `${male}% male / ${female}% female`;
}

function getEvolutionNames(chain) {
    const evolutions = [];
    evolutions.push(chain.species.name);
    if (chain.evolves_to.length > 0) {
        const secondEvolution = chain.evolves_to[0];
        evolutions.push(secondEvolution.species.name);

        if (secondEvolution.evolves_to.length > 0) {
            const thirdEvolution = secondEvolution.evolves_to[0];
            evolutions.push(thirdEvolution.species.name);
        }
    }
    return evolutions;
}

// ------------------- Filter Functions ------------------

async function getAllPokemonNames() {
    const names = await fetchJson("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
    allPokemonNameList = names.results;
}

 async function searchPokemonByName(){
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const container = document.getElementById("pokemonContainer");
    loadMoreBtn.disabled = true;
    backToStartBtn.classList.remove("hidden");

    if (searchInput.length < 3) {
        container.innerHTML = "Need at least 3 characters to search.";
        return;
    }
    const filteredPokemon = allPokemonNameList.filter(pokemon => pokemon.name.includes(searchInput));
    const pokemonData = await Promise.all(filteredPokemon.map(pokemon => fetchJson(pokemon.url)));

    container.innerHTML = "";
    pokemonData.forEach(pokemon => { container.innerHTML += pokemonCardTemplate(pokemon)});
}

// --------------------Base Stats Colors--------------------

function getStatColor(statValue) {
    if (statValue < 50) return "red";
    if (statValue < 90) return "orange";
    return "green";
}

// ---------------------Move Name Formatting---------------------

function formatMoveName(moveName) {
    return moveName.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

