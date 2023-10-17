const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 4;
let offset = 0;

function loadPokemonItems(offset,limit){
    pokeApi.getPokemons(offset,limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon">
                <div class="card ${pokemon.type}">
                    <div class="front ">
                        <span class="number">#${pokemon.number}</span>
                        <span class="name">${pokemon.name}</span>
                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>
                            <img src="${pokemon.image}" alt="${pokemon.name}">
                        </div>
                    </div>
                    <div class="back ">
                        <span class="name">${pokemon.name}</span>
                        <span class="number">#${pokemon.number}</span>
                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>
                            <img src="${pokemon.image}" alt="${pokemon.name}">
                        </div>
                        <div class="about">
                            <h3>About</h3>
                            <ul>
                                <li>Species: ${pokemon.species}</li>
                                <li>Height: ${pokemon.height} decimetres</li>
                                <li>Weight: ${pokemon.weight} hectograms</li>
                                <li>Abilities: ${pokemon.abilities.join(', ')}</li>
                            </ul>
                            <h3>Base Stats</h3>
                            <ul>
                                <li>HP: ${pokemon.baseStats.hp}</li>
                                <li>Attack: ${pokemon.baseStats.attack}</li>
                                <li>Defense: ${pokemon.baseStats.defense}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </li>
    `).join('');
    
    pokemonList.innerHTML += newHtml
    })
    .catch((error) => console.error(error))
}

loadPokemonItems(offset,limit)

loadMoreButton.addEventListener('click',() =>{
    offset += limit
    const recordCount = offset + limit
    if(recordCount >= maxRecords){
        const newLimit = maxRecords-offset
        loadPokemonItems(offset, newLimit)
        const pagination = loadMoreButton.parentElement
        pagination.removeChild(loadMoreButton)
        pagination.innerHTML += "end"
    } else {
        loadPokemonItems(offset,limit)
    }
})