import React, { useState } from 'react';
import axios from 'axios';
import '../styles/sign.css';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    const handleLogin = (e) => {
        e.preventDefault();

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            data: {
                email,
                password,
            }
        })
            .then((res) => {
                if (res.data.errors) {
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                } else {
                    console.log("data", res.data)
                    // window.location = '/home'
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div >
            <form onSubmit={handleLogin} className="form-sign">

                <h1 className="input-form-title">Connexion</h1>

                Email : <input
                    type="email"
                    className="input-email input "
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}>
                </input>
                <div className="email error"></div>

                Mot de passe : <input
                    type="password"
                    className="input-password input"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}>
                </input>

                <div className="password error"></div>

                <input type="submit" className="input-button" value="Se connecter" />
            </form>
        </div>
    )
}

export default Login