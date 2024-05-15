import React, { useState, useEffect } from "react";
import axios from "axios";

const Favorites = ({ userId }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // console.log("userId", userId);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/favorites/character/${userId}`
          // "https://site--marvel-backend-v3--l75gkv7mvq6s.code.run/favorites/character/${userId}"
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
    <div className="perso-container">
      <h1>My Favorites</h1>
      {favorites && favorites.length > 0 ? (
        favorites.map((favorite, index) => (
          <div key={favorite?._id || index} className="card-link">
            <div className="card" key={favorite?._id}>
              <div className="card-content">
                <div className="card-pic">
                  {favorite?.thumbnail && (
                    <img
                      src={`${favorite.thumbnail.path}.${favorite.thumbnail.extension}`}
                      alt={favorite.name || "Character Image"}
                      className="character-image"
                    />
                  )}
                </div>
                <div className="card-details">
                  {favorite?.name && (
                    <h2 className="character-name">{favorite.name}</h2>
                  )}
                  {favorite?.description && (
                    <p className="character-description">
                      {favorite.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No favorites added yet</p>
      )}
    </div>
  );
};

export default Favorites;
