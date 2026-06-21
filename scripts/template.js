function pokemonCardTemplate(pokemon) {
    const mainType = pokemon.types[0].type.name;
    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    return `
        <li>
            <button
                data-id="card" data-pokemon-id="${pokemon.id}" class="pokemonCard arial-label ="Open Details for ${name}" 
                onclick = "openOverlay(${pokemon.id})" 
                style="background-color: ${typeColorsBackground[mainType]};">
                <span class="pokemonId">#${pokemon.id}</span>
                <img data-id="card-image" src="${pokemon.sprites.front_default}" alt="${name}">
                <h2>${name}</h2>
                <div class="pokemonTypes">
                     ${pokemon.types.map(type => `<span class="type ${type.type.name}" style="background-color: ${typeBadgeColors[type.type.name]};">
                     ${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>`).join('')}
                </div>
            </button>
        </li>        
    `;
}

function overlayTemplate(pokemon) {
    const mainType = pokemon.types[0].type.name;
    return `
        <div data-id="overlay-pokemon-name" class="overlayContent" style="background-color: ${typeColorsBackground[mainType]};">
            <button data-id="close-dialog-button" id="closeOverlay" aria-label="Close Pokémon details" onclick="closeOverlay()">&times;</button>
            <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <img data-id="dialog-image" class="overlayImage" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
            <div class="pokemonTypes">${pokemon.types.map(type => `<span class="type ${type.type.name}" style="background-color: ${typeBadgeColors[type.type.name]};">
                ${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>`).join('')}
            </div>
            <div class="overlayTabs">
                <button class="overlayTab activeTab" id="aboutButton" aria-label="Show About information" onclick="showTab('about', ${pokemon.id}, this)">About</button>
                <button class="overlayTab" id="statsButton" aria-label="Show Stats" onclick="showTab('stats', ${pokemon.id}, this)">Base Stats</button>
                <button class="overlayTab" id="evolutionButton" aria-label="Show Evolutions" onclick="showTab('evolution', ${pokemon.id}, this)">Evolution</button>
                <button class="overlayTab" id="movesButton" aria-label="Show Moves" onclick="showTab('moves', ${pokemon.id}, this)">Moves</button>
            </div>
            <div id="tabContent" class="pokemonInfo">
                ${aboutTemplate(pokemon)}
            </div>
            <div class="navigationButtons">
                <button data-id="prev-button" id="previousPokemon" aria-label="Previous Pokémon" onclick="previousPokemon()"><img class="arrowLeft" src="./assets/icons/right-arrow.png" alt="Previous"></button>
                <button data-id="next-button" id="nextPokemon" aria-label="Next Pokémon" onclick="nextPokemon()"><img class="arrowRight" src="./assets/icons/right-arrow.png" alt="Next"></button>
            </div>
        </div>
    `;
}

async function aboutTemplate(pokemon) {
    const species = await fetchJson(pokemon.species.url);
    const genderData = getGenderData(species.gender_rate);
    return `
        <div class="aboutContainer">
            <div class="aboutRow"><span class="aboutLabel">ID</span><span class="aboutValue">#${pokemon.id}</span></div>
            <div class="aboutRow"><span class="aboutLabel">Height</span><span class="aboutValue">${(pokemon.height / 10).toFixed(1)} m</span></div>
            <div class="aboutRow"><span class="aboutLabel">Weight</span><span class="aboutValue">${(pokemon.weight / 10).toFixed(1)} kg</span></div>
            <div class="aboutRow"><span class="aboutLabel">Abilities</span><span class="aboutValue">${pokemon.abilities.map(a => a.ability.name).join(", ")}</span></div>
            <h3>Breeding</h3>
            <div class="aboutRow"><span class="aboutLabel">Gender</span><span class="aboutValue">${genderData ? genderTemplate(genderData.male, genderData.female) : "Genderless"}</span></div>
            <div class="aboutRow"><span class="aboutLabel">Egg Groups</span><span class="aboutValue">${species.egg_groups.map(g => g.name).join(", ")}</span></div>
            <div class="aboutRow"><span class="aboutLabel">Egg Cycle</span><span class="aboutValue">${species.hatch_counter}</span></div>
        </div>
    `;
}

function statsTemplate(pokemon) {
    return `
        <div class="statsContainer">${pokemon.stats.map(stat => `
                <div class="statRow">
                    <span class="statName">${stat.stat.name}</span>
                    <span class="statValue">${stat.base_stat}</span>
                    <div class="statBarBackground">
                        <div class="statBar" style="width:${Math.min(stat.base_stat, 150) / 150 * 100}%;
                        background-color: ${getStatColor(stat.base_stat)};"></div>
                    </div>
                </div>
            `).join("")}
        </div>
    `;
}

async function movesTemplate(pokemon) {
    const moves = await Promise.all(pokemon.moves.slice(0, 30).map(move =>fetchJson(move.move.url)));
    return `
        <div class="movesContainer">
            ${moves.map(move => `<span class="moveBadge"style="background-color: ${typeBadgeColors[move.type.name]};">
            ${formatMoveName(move.name)}
            </span>
            `).join("")}
        </div>
    `;
}

async function evolutionTemplate(pokemon) {
    const species = await fetchJson(pokemon.species.url);
    const evolutionChain = await fetchJson(species.evolution_chain.url);
    const evolutionNames = getEvolutionNames(evolutionChain.chain);
    const evolutionPokemon = await Promise.all(evolutionNames.map(name =>
            fetchJson(`https://pokeapi.co/api/v2/pokemon/${name}`)));
    return `
        <div class="evolutionChain">
            ${evolutionPokemon.map((pokemon, index) => `
                <div class="evolutionCard">
                    <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
                    <p> ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                </div>
                ${index < evolutionPokemon.length - 1 ? `<div class="evolutionArrow">→</div>`: ""}
            `).join("")}
        </div>
    `;
}

function noResultsTemplate(searchInput){
    return`
    <div data-id="not-found" class="noResults">
    <p> Sorry We couldn't find anything matching "${searchInput}".</p>
     <img src ="./assets/images/searchPikachu.png" alt="Searching Pikachu">
    </div>
    `;
}

function minCharactersTemplate() {
    return `
        <div class="noResults">
           <p> Need at least 3 characters to search.</p>
        </div>
    `;
}

function genderTemplate(male, female) {
    return `
        <span class="genderIcon">
            <img src="./assets/icons/male.png" alt="Pokemon Gender Male">
            ${male}%
        </span>
        /
        <span class="genderIcon">
            <img src="./assets/icons/female.png" alt="Pokemon Gender Female">
            ${female}%
        </span>
    `;
}
