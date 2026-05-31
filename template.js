function pokemonCardTemplate(pokemon) {
    const mainType = pokemon.types[0].type.name;
    return `
        <div class="pokemonCard" style="background-color: ${typeColorsBackground[mainType]};">
            <span class="pokemonId">#${pokemon.id}</span>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h2>${pokemon.name.toUpperCase()}</h2>
            <div class="pokemonTypes">
                ${pokemon.types.map(type => `<span class="type ${type.type.name}" style="background-color: ${typeBadgeColors[type.type.name]};">
                ${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>`).join('')}
            </div>
        </div>
    `;
}