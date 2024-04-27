import React, { useState, useEffect } from "react";
import axios from "axios";

const Comics = ({ comicsSearch, userId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [, setError] = useState(null);
  const [data, setData] = useState({ results: [], count: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const pageSize = 100;
  const validApiKey = "2yP9TZZSBoTZ2418";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skip = (currentPage - 1) * pageSize;

        const response = await axios.get(
          // "https://site--marvel-backend-v3--l75gkv7mvq6s.code.run/comics", {
          "http://localhost:3000/comics",
          {
            params: {
              apikey: validApiKey,
              skip: skip,
              limit: pageSize,
              title: comicsSearch,
            },
          }
        );

        setData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        setError("Erreur lors de la récupération des personnages");
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage, comicsSearch, userId]);

  const handleNextPage = () => {
    console.log("Next page button clicked");
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    console.log("Previous page button clicked");
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const totalPages = Math.ceil(data.count / pageSize);

  const handleAddFavorite = async (comic) => {
    try {
      const found = favorites.find((fav) => fav._id === comic._id);
      if (found) {
        alert("Ce personnage est déjà en favori");
        return;
      }
      const response = await axios.post(
        "http://localhost:3000/user/favorites/comic/add",
        {
          userId: userId, // Envoyer l'ID de l'utilisateur
          comicId: comic._id, // Envoyer l'ID du comic à ajouter aux favoris
        }
      );

      setFavorites([...favorites, comic]);

      alert(response.data.message); // Affiche le message de statut
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
      if (error.response.status === 400) {
        alert(error.response.data.error); // Affiche le message d'erreur du serveur
      } else {
        alert("Erreur lors de l'ajout du favori"); // Message d'erreur générique
      }
    }
  };

  const handleRemoveFavorite = async (comic) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/favorites/comic/remove",
        {
          userId: userId, // Envoyer l'ID de l'utilisateur
          comicId: comic._id, // Envoyer l'ID du comic à supprimer des favoris
        }
      );
      const updatedFavorites = favorites.filter((fav) => fav._id !== comic._id);
      setFavorites(updatedFavorites);
      alert(response.data.message);
      console.log(response.data); // Affiche le message de statut
    } catch (error) {
      console.log(error.response.data);
      if (error.response.status === 400) {
        alert(error.response.data.error); // Affiche le message d'erreur du serveur
      } else {
        alert("Erreur lors de l'ajout du favori"); // Message d'erreur générique
      }
    }
  };

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
        <h1>Comics Marvel</h1>
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <div className="comics-list">
        {data.map((comic) => (
          <div className="comic-card" key={comic._id}>
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
            <div className="comic-card-content">
              {comic.title && <h2>{comic.title}</h2>}
              {comic.description ? (
                <p>{comic.description}</p>
              ) : (
                <span className="no-text">No description</span>
              )}
            </div>
            <button onClick={() => handleAddFavorite(comic)}>
              Add to Favorites
            </button>

            <button onClick={() => handleRemoveFavorite(comic)}>
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Comics;
