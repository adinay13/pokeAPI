

const pokeList = document.querySelector('.main_page')
const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(response => response.json()))
    }
    Promise.all(promises).then((results => {
        const pokemon = results.map(data => ({
            id: data.id,
            name: data.name,
            image: data.sprites['front_default'],
            type: data.types.map(type => type.type.name).join('')
        }));
        displayPokemon(pokemon);
    }));
};
const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon.map(pokemon =>
        `<div class="pokemon">
            <img class="pokemon__img" src="${pokemon.image}" alt="${pokemon.name}">
            <h2>${pokemon.name}</h2>
            <p>Type: ${pokemon.type}</p>
            
        </div>
`).join('')
    pokeList.innerHTML = pokemonHTMLString;
}
fetchPokemon()