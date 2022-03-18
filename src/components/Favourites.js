import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Favourites() {
  let navigate = useNavigate();
  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const [pokemonChosen, setPokemonChosen] = useState(false);

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

  const getFavouritePokemon = () => {
    axios.get(`/getFavouritePokemon`).then((response) => {
      setPokemonName(response.data);
    });
  };

  useEffect(() => {
    getFavouritePokemon();
    searchPokemon();
  }, [pokemonName]);

  const redirectToPokedex = () => {
    navigate("/pokedex");
  };

  return (
    <>
      <div className="pokedex-main">
        <div className="display-section">
          {!pokemonChosen ? (
            <h1>Please choose a Pokemon</h1>
          ) : (
            <>
              <h1>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h1>
              <img src={pokemon.img} alt="" />
              <h3>
                Species:{" "}
                {pokemon.species[0].toUpperCase() + pokemon.name.slice(1)}
              </h3>
              <h3>
                Type: {pokemon.type[0].toUpperCase() + pokemon.type.slice(1)}
              </h3>
              <h4>HP: {pokemon.hp}</h4>
              <h4>Attack: {pokemon.attack}</h4>
              <h4>Defense: {pokemon.defense}</h4>
            </>
          )}
        </div>
      </div>

      <button
        className="btn btn-primary btn-sm go-back-to-pokedex"
        onClick={redirectToPokedex}
      >
        Go Back
      </button>
    </>
  );
}

export default Favourites;
