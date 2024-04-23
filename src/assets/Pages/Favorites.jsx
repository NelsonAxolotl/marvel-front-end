import React, { useState, useEffect } from "react";
import axios from "axios";

const Favorites = ({ userId }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log("userId", userId);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/favorites/${userId}`
        );
        console.log(response);
        setFavorites(response.data.favorites);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur pendant la récupération des favoris :", error);
      }
    };
    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  return isLoading ? (
    <div
      className="loading"
      style={{ minHeight: isLoading ? "100vh" : "auto" }}
    >
      <p>Loading....</p>
    </div>
  ) : (
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
