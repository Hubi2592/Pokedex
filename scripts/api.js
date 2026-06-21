const pokeApiUrl = "https://pokeapi.co/api/v2/pokemon";

async function fetchJson(url) {
    if (hasPokemon(url)) {
        return getPokemon(url);
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    addPokemon(url, data);
    return data;
}

async function fetchPokemonList(offset = 0, limit = 10) {
    const list = await fetchJson(`${pokeApiUrl}?offset=${offset}&limit=${limit}`);

    const pokemonData = await Promise.all(
        list.results.map(pokemon => fetchJson(pokemon.url))
    );

    console.log("Pokemon-Daten:", pokemonData);
    return pokemonData;
}