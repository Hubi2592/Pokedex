function pokemonCardTemplate(pokemon) {
    const mainType = pokemon.types[0].type.name;
    return `
        <div class="pokemonCard ${mainType}">
            <span class="pokemonId">#${pokemon.id}</span>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>Type: ${mainType}</p>
            <h2>${pokemon.name.toUpperCase()}</h2>
            <div class="pokemonTypes">
                ${pokemon.types.map(type => `<span class="type ${type.type.name}">
                ${type.type.name}</span>`).join('')}
            </div>
        </div>
    `;
}