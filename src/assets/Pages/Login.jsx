import { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

const Login = ({ handleToken, setUserId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://site--marvel-backend-v3--l75gkv7mvq6s.code.run/login",
        // "http://localhost:3000/login",
        {
          email: email,
          password: password,
        }
      );
      // console.log(response.data);
      console.log(response.data._id);

      if (response.data.token) {
        handleToken(response.data.token);
      }
      if (response.data._id) {
        setUserId(response.data._id); // Mise à jour de l'ID de l'utilisateur
      }
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      if (error.response.status === 401) {
        setErrorMessage("Not valid email or password");
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Please fill in all the fields");
      }
    }
  };

  return (
    <>
      <div className="formulaire">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Se connecter</h2>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <div className="btn-slide">
            <button type="submit" value="Se connecter">
              Se connecter
            </button>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <Link to="/signup">
              <p>Pas encore de compte? inscris toi!</p>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
