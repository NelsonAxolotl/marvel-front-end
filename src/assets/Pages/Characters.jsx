import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import poster from '../IMG/marvel2.jpg';


const Characters = ({ search }) => {


    const [data, setData] = useState({ results: [], count: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 100;
    const validApiKey = '2yP9TZZSBoTZ2418';

    useEffect(() => {

        const fetchData = async () => {

            try {

                const skip = (currentPage - 1) * pageSize;

                const response = await axios.get("http://localhost:3000/characters", {
                    params: {
                        apikey: validApiKey,
                        skip: skip,
                        limit: pageSize,
                        name: search,
                    }
                });
                console.log(response.data.count);
                console.log(response.data.results);

                setData(response.data);
                setIsLoading(false);

            } catch (error) {
                setError('Erreur lors de la récupération des personnages');
                console.log(error);

            }
        };

        fetchData();
    }, [currentPage, search]);

    const handleNextPage = () => {
        console.log("Next page button clicked");
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        console.log("Previous page button clicked");
        setCurrentPage(prevPage => prevPage - 1);
    };

    const totalPages = Math.ceil(data.count / pageSize);



    return isLoading ? (
        <div className='loading' style={{ minHeight: isLoading ? '100vh' : 'auto' }}>
            <p>Loading....</p>
        </div>
    ) : (
        <>

            <div className='comics-title'><h1>Characters Marvel</h1></div>
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} </span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
            <div className='perso-container'>
                {data.results.map((character) => {
                    return (
                        <Link key={character._id} to={`/comics/${character._id}`} className="card-link">
                            <div className="card" key={character._id}>

                                <div className='card-content'>
                                    <div className='card-pic'>

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

                                    <div className='card-details'>
                                        <h2 className="character-name">{character.name}</h2>
                                        <p className={`character-description ${!character.description ? 'no-description' : ''}`}>
                                            {character.description ? character.description : "No description"}
                                        </p>

                                    </div>
                                </div>

                            </div>
                        </Link>
                    );
                })}
            </div>

        </>
    );
};

export default Characters;