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

            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
            <div class="pokemonTypes">
                ${pokemon.types.map(type => `<span class="type ${type.type.name}" style="background-color: ${typeBadgeColors[type.type.name]};">
                ${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>`).join('')}
            </div>

            <div class="overlayTabs">
                 <button id="aboutButton" onclick="showTab('about', ${pokemon.id})">About</button>
                <button onclick="showTab('stats', ${pokemon.id})">Base Stats</button>
                <button onclick="showTab('evolution', ${pokemon.id})">Evolution</button>
                <button onclick="showTab('moves', ${pokemon.id})">Moves</button>
            </div>
            <div id="tabContent" class="pokemonInfo">
               ${aboutTemplate(pokemon)}
            </div>
            <button id="previousPokemon" onclick="previousPokemon()">
                 ←
            </button>
            <button id="nextPokemon" onclick="nextPokemon()">
                →
            </button>
        </div>
    `;
}

async function aboutTemplate(pokemon) {
         const species = await fetchJson(pokemon.species.url);
      return `
        <div>
            <p><b>ID:</b> #${pokemon.id}</p>
            <p><b>Height:</b> ${pokemon.height}</p>
            <p><b>Weight:</b> ${pokemon.weight}</p>
            <p><b>Abilities:</b> ${pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
            <h3>Breeding</h3>
            <p><b>Gender:</b> ${getGenderText(species.gender_rate)}</p>
            <p><b>Egg Groups:</b> ${species.egg_groups.map(group => group.name).join(", ")}</p>
            <p><b>Egg Cycle:</b> ${species.hatch_counter}</p>
        </div>
    `;
}

function statsTemplate(pokemon) {
    return `
        <div>
            ${pokemon.stats.map(stat => `
                <p>
                    <b>${stat.stat.name}:</b> ${stat.base_stat}
                </p>
            `).join("")}
        </div>
    `;
}

function movesTemplate(pokemon) {
    return `
        <div>
            ${pokemon.moves.slice(0, 20).map(move => `
                <span class="moveBadge">${move.move.name}</span>
            `).join("")}
        </div>
    `;
}

function evolutionTemplate(evolutionPokemon) {
    return `
        <div class="evolutionChain">
            ${evolutionPokemon.map(pokemon => `
                <div class="evolutionCard">
                    <img src="${pokemon.sprites.other["official-artwork"].front_default}"alt="${pokemon.name}">
                    <p>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                </div>
                ${pokemon !== evolutionPokemon[evolutionPokemon.length - 1] ? `<span class="evolutionArrow">>>></span>` : ""}
            `).join("")}
        </div>
    `;
}