import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comics = ({ comicsSearch }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState({ results: [], count: 0 });
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 100;
    const validApiKey = '2yP9TZZSBoTZ2418';


    useEffect(() => {
        const fetchData = async () => {

            try {

                const skip = (currentPage - 1) * pageSize;

                const response = await axios.get("http://localhost:3000/comics", {
                    params: {
                        apikey: validApiKey,
                        skip: skip,
                        limit: pageSize,
                        title: comicsSearch,
                    }
                });


                setData(response.data.results);
                setIsLoading(false);
            } catch (error) {
                setError('Erreur lors de la récupération des personnages');
                console.log(error);
            }
        };

        fetchData();
    }, [currentPage, comicsSearch]);

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
            <div className='comics-title'><h1>Comics Marvel</h1></div>
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>

            <div className="comics-list">
                {data.map(comic => (
                    <div className="comic-card" key={comic._id}>
                        <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
                        <div className="comic-card-content">
                            <h2>{comic.title}</h2>
                            {comic.description ? (
                                <p>{comic.description}</p>
                            ) : (
                                <span className="no-text" >No description</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Comics;