

const pokeApi = {}

pokeApi.getPokemonDetial = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
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