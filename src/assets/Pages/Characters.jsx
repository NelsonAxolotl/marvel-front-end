import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSkull, faGhost } from "@fortawesome/free-solid-svg-icons";
import poster from "../IMG/marvel2.jpg";
import Favorites from "./Favorites";

const Characters = ({ search, userId }) => {
  const [data, setData] = useState({ results: [], count: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  const pageSize = 100;
  const validApiKey = "2yP9TZZSBoTZ2418";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skip = (currentPage - 1) * pageSize;

        const response = await axios.get(
          // "https://site--marvel-backend-v3--l75gkv7mvq6s.code.run/characters",
          "http://localhost:3000/characters",
          {
            params: {
              apikey: validApiKey,
              skip: skip,
              limit: pageSize,
              name: search,
            },
          }
        );
        console.log(response.data.count);
        console.log(response.data.results);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError("Erreur lors de la récupération des personnages");
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage, search, userId]);

  const handleNextPage = () => {
    console.log("Next page button clicked");
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    console.log("Previous page button clicked");
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const totalPages = Math.ceil(data.count / pageSize);

  const handleAddFavorite = async (character) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/favorites/add",
        {
          userId: userId, // Envoyer l'ID de l'utilisateur
          characterId: character._id, // Envoyer l'ID du personnage à ajouter aux favoris
        }
      );

      const found = favorites.find((fav) => fav._id === character._id);
      if (!found) {
        setFavorites([...favorites, character]);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du favori :", error);
    }
  };

  // const handleAddFavorite = (character) => {
  // Vérifiez d'abord si le personnage est déjà dans les favoris
  //   const found = favorites.find((fav) => fav._id === character._id);
  //   // Si le personnage n'est pas déjà dans les favoris, ajoutez-le
  //   if (!found) {
  //     setFavorites([...favorites, character]);
  //   }
  // };

  const handleRemoveFavorite = async (character) => {
    try {
      // Effectuer une requête POST vers votre endpoint sur le serveur
      const response = await axios.post(
        "http://localhost:3000/user/favorites/remove",
        {
          userId: userId, // Envoyer l'ID de l'utilisateur
          characterId: character._id, // Envoyer l'ID du personnage à supprimer des favoris
        }
      );
      const updatedFavorites = favorites.filter(
        (fav) => fav._id !== character._id
      );
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Erreur lors de la suppression du favori :", error);
    }
  };

  // const handleRemoveFavorite =  async (character) => {
  //   // Filtrer les favoris pour exclure le personnage à supprimer
  //   const updatedFavorites = favorites.filter(
  //     (fav) => fav._id !== character._id
  //   );
  //   // Mettre à jour l'état avec les favoris mis à jour
  //   setFavorites(updatedFavorites);
  // };

  return isLoading ? (
    <div
      className="loading"
      style={{ minHeight: isLoading ? "100vh" : "auto" }}
    >
      <p>Loading....</p>
    </div>
  ) : (
    <>
      <div className="comics-title">
        <h1>Characters Marvel</h1>
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <div className="perso-container">
        {data.results.map((character) => {
          return (
            <div key={character._id} className="card-link">
              <div className="card" key={character._id}>
                <div className="card-content">
                  <div className="card-pic">
                    {character.thumbnail ? (
                      <img
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        alt={character.name}
                        className="character-image"
                      />
                    ) : (
                      <img
                        src={poster}
                        alt={character.name}
                        className="character-image"
                      />
                    )}
                  </div>

                  <div className="card-details">
                    <h2 className="character-name">{character.name}</h2>
                    <p
                      className={`character-description ${
                        !character.description ? "no-description" : ""
                      }`}
                    >
                      {character.description
                        ? character.description
                        : "No description"}
                    </p>
                  </div>
                </div>
                <div className="card-actions">
                  <Link to={`/comics/${character._id}`} className="card-link">
                    Details
                  </Link>

                  <button onClick={() => handleAddFavorite(character)}>
                    Add to Favorites
                  </button>

                  <button onClick={() => handleRemoveFavorite(character)}>
                    Remove from Favorites
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Characters;
