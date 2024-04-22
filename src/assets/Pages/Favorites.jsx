import React, { useState, useEffect } from "react";
import axios from "axios";

const Favorites = ({ userId }) => {
  const [favorites, setFavorites] = useState([]);
  console.log("userId", userId);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/favorites/${userId}`
        );
        console.log("Favorites Response:", response.data);
        setFavorites(response.data.favorites);
      } catch (error) {
        console.error("Erreur lors de la récupération des favoris :", error);
      }
    };

    fetchFavorites();
  }, [userId]);

  console.log("Favorites State:", favorites);
  return (
    <div className="container">
      <h1>My Favorites</h1>
      {favorites && favorites.length > 0 ? (
        favorites.map((character) => (
          <div key={character._id}>
            <h2>{character.name}</h2>
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              className="character-image"
            />
            <p
              className={`character-description ${
                !character.description ? "no-description" : ""
              }`}
            >
              {character.description ? character.description : "No description"}
            </p>
          </div>
        ))
      ) : (
        <p>No favorites added yet</p>
      )}
    </div>
  );
};

export default Favorites;
