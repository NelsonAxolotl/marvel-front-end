/*----IMPORT GLOBAL----*/
import './App.css'
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

/*---ROUTES-----*/
import Home from './assets/Pages/Home';
import Characters from './assets/Pages/Characters';
import Comics from './assets/Pages/Comics';
import ComicsCharacter from './assets/Pages/ComicsCharacter';
import Favorites from './assets/Pages/Favorites';
import NotFound from './assets/Pages/NotFound';
import Signup from './assets/Pages/Signup';
import Login from './assets/Pages/Login';

/*----COMPONENTS---*/
import Header from './assets/Components/Header';
import Footer from './assets/Components/Footer';


function App() {

  const [search, setSearch] = useState("");
  const [comicSearch, setComicSearch] = useState("");
  const [token, setToken] = useState(Cookies.get("marvel-token") || null);



  const handleToken = (token) => {
    if (token) {
      Cookies.set("User-Token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("UserToken");
      setToken(null);
    }
  };

  return (
    <>
      <Router>
        <div className='body'>
          <div className='container'>
            <Header search={search} setSearch={setSearch} comicSearch={comicSearch} setComicSearch={setComicSearch} token={token}
              handleToken={handleToken}

            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/comics/:characterId" element={<ComicsCharacter />} />
              <Route path="/characters" element={<Characters search={search}

              />} />
              <Route path="/comics" element={<Comics comicsSearch={comicSearch} />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/signup" element={<Signup handleToken={handleToken} />} />
              <Route path="/login" element={<Login handleToken={handleToken} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>

      </Router>
    </>
  )
}

export default App
