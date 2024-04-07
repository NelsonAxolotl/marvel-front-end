import { useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ handleToken }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const response = await axios.post(
                "http://localhost:3000/login",
                {
                    email: email,
                    password: password,
                }
            );
            console.log(response.data);

            if (response.data.token)
                handleToken(response.data.token);
            navigate("/");

        } catch (error) {
            console.log(error.response.data);
            if (error.response.status === 401) {
                setErrorMessage(
                    "Not valid email or password"
                );
            } else if (error.response.data.message === "Missing parameters") {
                setErrorMessage("Please fill in all the fields");
            }
        }

    };

    return (
        <>
            <div className='formulaire'>
                <form className="form" onSubmit={handleSubmit}>
                    <h2>Se connecter</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }} />

                    <input
                        type="password"
                        placeholder="Mot de passe"
                        name="password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }} />

                    <div className='btn-slide'>
                        <button type="submit" value="Se connecter">Se connecter</button>
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                        <Link to="/signup"><p>Pas encore de compte? inscris toi!</p></Link>

                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;