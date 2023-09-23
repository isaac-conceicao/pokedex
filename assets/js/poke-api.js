

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeApiDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeApiDetail.order
    pokemon.name = pokeApiDetail.name
    
    const types = pokeApiDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    pokemon.image = pokeApiDetail.sprites.other.dream_world.front_default

    return pokemon;
}

pokeApi.getPokemonDetial = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0,limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map((pokeApi.getPokemonDetial)))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonDetails) => pokemonDetails)
}