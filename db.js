const pokedex = new Map();

function getPokemon(key) {
    return pokedex.get(key);
}

function addPokemon(key, value) {
    pokedex.set(key, value);

  console.log(pokedex.size);
}

function hasPokemon(key) {
    return pokedex.has(key);
}

const typeColorsBackground = {
    grass: "#7AC74C",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    bug: "#A6B91A",
    normal: "#A8A77A",
    poison: "#A33EA1",
    ground: "#E2BF65",
    fairy: "#D685AD",
    fighting: "#C22E28",
    psychic: "#F95587",
    rock: "#B6A136",
    ghost: "#735797",
    ice: "#96D9D6",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    flying: "#A98FF3"
};

const typeBadgeColors = {
    normal: "#8A8A59",
    fire: "#D96A1A",
    water: "#3E6FD1",
    electric: "#D8B100",
    grass: "#5EA834",
    ice: "#69B8B5",
    fighting: "#9E221D",
    poison: "#7F2F7D",
    ground: "#C29F4A",
    flying: "#8570D4",
    psychic: "#D9386E",
    bug: "#7C8D14",
    rock: "#8F7D28",
    ghost: "#58437F",
    dragon: "#5120D1",
    dark: "#4F3D30",
    steel: "#8F8FA8",
    fairy: "#B85E8D"
};