import { Link } from "react-router-dom";
import logo from "../IMG/logo.png"
import video from '../Video/marvel.mp4'

const Header = ({ search, setSearch, comicSearch, setComicSearch,
    token, handleToken }) => {

    const handleSubmit = (event) => {
        setSearch(event.target.value);
    };
    const inputSubmit = (event) => {
        setComicSearch(event.target.value);
    };
    const onSubmit = (event) => {
        event.preventDefault();

    };

    return (

        <>

            <header>

                <video src={video}
                    autoPlay muted
                    loop
                    className="video" />
                <Link to="/"><img src={logo} alt="logo Marvel" /></Link>
                <nav>
                    <ul>
                        <Link to="/characters"><li>Characters</li></Link>
                        <Link to="/comics"><li>Comics</li></Link>
                        <Link to="/favorites"><li>Favorites</li></Link>
                    </ul>
                    <div className="btn">
                        {token ? (
                            <div className="btn-off">
                                <button onClick={() => {
                                    handleToken(null);
                                }}
                                >
                                    Se déconnecter</button>
                            </div>
                        ) : (

                            <div className="btn">
                                <Link to="/signup"><button>S'inscrire</button></Link>
                                <Link to="/login"><button>Se connecter</button></Link>
                            </div>
                        )}
                    </div>
                </nav>
            </header>


            <div className="search">
                <form onSubmit={onSubmit}>
                    <input
                        placeholder="Search Characters..."
                        type="text"
                        name="search"
                        value={search}
                        onChange={handleSubmit}
                    />
                </form>
                <div className="comics-search">
                    <form onSubmit={onSubmit}>
                        <input
                            placeholder="Search comics..."
                            type="text"
                            name="comicsSearch"
                            value={comicSearch}
                            onChange={inputSubmit}
                        />
                    </form>
                </div>
            </div>

        </>
    )
}

export default Header;