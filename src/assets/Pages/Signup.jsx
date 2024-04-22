import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage("");

      const response = await axios.post(`http://localhost:3000/signup`, {
        email: email,
        username: username,
        password: password,
      });

      console.log(response.data);
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      if (error.response.status === 400) {
        setErrorMessage("Missing parameters ");
      } else if (error.response.data.message === 409) {
        setErrorMessage("this email already has an account");
      }
    }
  };

  return (
    <div className="formulaire">
      <form className="form" onSubmit={handleSubmit}>
        <h2>S'inscrire</h2>

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
          type="text"
          placeholder="Nom d'utilisateur"
          name="username"
          value={username}
          onChange={(event) => {
            setUserName(event.target.value);
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
          <button type="submit" value="S'inscire">
            S'inscrire
          </button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <Link to="/login/">Tu as un compte? connecte toi!</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
