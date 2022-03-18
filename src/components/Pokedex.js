import React, { useState } from "react";
import "../styles/pokedex.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Pokedex() {
  let navigate = useNavigate();
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const sendFavouritePokemon = () => {
    const request = new XMLHttpRequest();
    request.open("POST", `/sendFavouritePokemon/${pokemon.name}`);
    request.onload = () => {
      const response = request.responseText;
      console.log(response);
    };
    request.send();
  };

  const searchPokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        setPokemon({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
      });
  };

  const goToFavourites = () => {
    navigate("/favourites");
  };

  return (
    <div className="pokedex-main">
      <div className="title-section">
        <h1>Pokedex</h1>
        <input
          type="text"
          onChange={(e) => {
            setPokemonName(e.target.value);
          }}
        />
        <button
          type="button"
          onClick={searchPokemon}
          class="btn btn-primary btn-sm"
        >
          Search Pokemon
        </button>
        {/* <button onClick={searchPokemon}>Search Pokemon</button> */}
        <button onClick={goToFavourites} className="btn btn-primary btn-sm">
          View Favourites
        </button>
      </div>
      <div className="display-section">
        {!pokemonChosen ? (
          <h1>Please choose a Pokemon</h1>
        ) : (
          <>
            <h1>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h1>
            <img src={pokemon.img} alt="" />
            {/* <h3>Species: {pokemon.species}</h3> */}
            <h3>
              Type: {pokemon.type[0].toUpperCase() + pokemon.type.slice(1)}
            </h3>
            <h4>HP: {pokemon.hp}</h4>
            <h4>Attack: {pokemon.attack}</h4>
            <h4>Defense: {pokemon.defense}</h4>
            <br />
            <button
              className="btn btn-primary btn-sm"
              onClick={sendFavouritePokemon}
            >
              Add to favourites
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Pokedex;
