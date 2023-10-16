

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeApiDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeApiDetail.id
    pokemon.name = pokeApiDetail.name
    
    const types = pokeApiDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    pokemon.image = pokeApiDetail.sprites.other.dream_world.front_default

    // Novas propriedades adicionais
    pokemon.species = pokeApiDetail.species.name;
    pokemon.height = pokeApiDetail.height;
    pokemon.weight = pokeApiDetail.weight;
    pokemon.abilities = pokeApiDetail.abilities.map(ability => ability.ability.name);

    // Processamento das estatísticas de base
    pokeApiDetail.stats.forEach(stat => {
        pokemon.baseStats[stat.stat.name] = stat.base_stat;
    });
    
    return pokemon;
}

pokeApi.getPokemonDetial = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset,limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map((pokeApi.getPokemonDetial)))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonDetails) => pokemonDetails)
}