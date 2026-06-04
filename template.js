function pokemonCardTemplate(pokemon) {
    const mainType = pokemon.types[0].type.name;
    return `
        <div class="pokemonCard" 
        onclick = "openOverlay(${pokemon.id})" 
        style="background-color: ${typeColorsBackground[mainType]};">
            <span class="pokemonId">#${pokemon.id}</span>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <div class="pokemonTypes">
                ${pokemon.types.map(type => `<span class="type ${type.type.name}" style="background-color: ${typeBadgeColors[type.type.name]};">
                ${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>`).join('')}
            </div>
        </div>
    `;
}

function overlayTemplate(pokemon) {
    const mainType = pokemon.types[0].type.name;
    return `
        <div class="overlayContent"
        style="background-color: ${typeColorsBackground[mainType]};">
            <button id="closeOverlay" onclick="closeOverlay()">
                ✕
            </button>

            <h2>${pokemon.name.toUpperCase()}</h2>

            <img
                src="${pokemon.sprites.other["official-artwork"].front_default}"
                alt="${pokemon.name}"
            >

            <p>ID: #${pokemon.id}</p>

            <div class="pokemonTypes">
                ${pokemon.types.map(type => `<span class="type ${type.type.name}" style="background-color: ${typeBadgeColors[type.type.name]};">
                ${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>`).join('')}
            </div>

            <p>Größe: ${pokemon.height}</p>

            <p>Gewicht: ${pokemon.weight}</p>
            <button id="previousPokemon" onclick="previousPokemon()">
                 ←
            </button>
            <button id="nextPokemon" onclick="nextPokemon()">
                →
            </button>
        </div>
    `;
}
