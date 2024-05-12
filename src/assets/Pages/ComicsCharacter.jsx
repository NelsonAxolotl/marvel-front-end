import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ComicsCharacter = () => {
  const { characterId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const validApiKey = "2yP9TZZSBoTZ2418";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend-v3--l75gkv7mvq6s.code.run/comics/${characterId}`,
          {
            // `http://localhost:3000/comics/${characterId}`,

            params: {
              apikey: validApiKey,
            },
          }
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching comics:", error);
      }
    };

    fetchData();
  }, [characterId]);

  return isLoading ? (
    <div
      className="loading"
      style={{ minHeight: isLoading ? "100vh" : "auto" }}
    >
      <p>Loading....</p>
    </div>
  ) : (
    <>
      <div className="order-comics">
        <div className="perso-comics">
          {data.comics.map((comic) => (
            <div className="comics" key={comic._id}>
              <h2>{comic.title}</h2>
              {comic.thumbnail && (
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                />
              )}
              {comic.description ? (
                <p>{comic.description}</p>
              ) : (
                <span className="no-desc">No description</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ComicsCharacter;
