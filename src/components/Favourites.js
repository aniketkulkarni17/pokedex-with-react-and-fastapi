import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Favourites() {
  let navigate = useNavigate();
  var pokemonName = "";
  var pokemonChosen = false;
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const getFavouritePokemon = () => {
    const request = new XMLHttpRequest();
    request.open("GET", `/getFavouritePokemon`);
    request.onload = () => {
      const response = request.responseText;
      console.log(response);
      pokemonName = response;
      searchPokemon();
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
        pokemonChosen = true;
      });
  };

  const goToPokedex = () => {
    navigate("/pokedex");
  };

  getFavouritePokemon();

  return (
    <div className="pokedex-main">
      <div className="title-section">
        <h1>Favourites</h1>
        <div className="display-section">
          {!pokemonChosen ? (
            <h1>No favourites</h1>
          ) : (
            <>
              <h1>{pokemon.name}</h1>
              <img src={pokemon.img} alt="" />
              <h3>Species: {pokemon.species}</h3>
              <h3>Type: {pokemon.type}</h3>
              <h4>HP: {pokemon.hp}</h4>
              <h4>Attack: {pokemon.attack}</h4>
              <h4>Defense: {pokemon.defense}</h4>
              <br />
            </>
          )}
        </div>
        <button onClick={goToPokedex}>Go back</button>
      </div>
    </div>
  );
}

export default Favourites;
