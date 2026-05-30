const pokedex = new Map();

function getPokemon(key) {
    return pokedex.get(key);
}

function addPokemon(key, value) {
    pokedex.set(key, value);
}

function hasPokemon(key) {
    return pokedex.has(key);
}