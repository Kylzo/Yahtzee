import React, { useState } from 'react';
import axios from 'axios';
import '../styles/sign.css';
import Login from "./login";


function Signup() {
    const [formSubmit, setFormSubmit] = useState(false);
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [controlPassword, setControlPassword] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        const lastNameError = document.querySelector(".lastName.error");
        const firstNameError = document.querySelector(".firstName.error");
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");
        const passwordConfirmError = document.querySelector(".password-confirm.error");

        passwordConfirmError.innerHTML = "";

        if (password !== controlPassword) {
            if (password !== controlPassword)
                passwordConfirmError.innerHTML =
                    "Les mots de passe ne correspondent pas.";

        } else {
            axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/user/register`,
                data: {
                    lastName,
                    firstName,
                    email,
                    password,
                },
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.errors) {
                        lastNameError.innerHTML = res.data.errors.lastName;
                        firstNameError.innerHTML = res.data.errors.firstName;
                        emailError.innerHTML = res.data.errors.email;
                        passwordError.innerHTML = res.data.errors.password;
                    } else {
                        setFormSubmit(true);
                    }
                })
                .catch((err) => console.log("abc", err));
        }
    };

    return (
        <>
            {formSubmit ? (
                <>
                    <Login />
                    <span></span>
                    <h4 className="form-sign success">
                        Enregistrement réussi, veuillez-vous connecter.
                    </h4>
                </>
            ) : (
                <form action="" onSubmit={handleRegister} className="form-sign">
                    Nom :
                    <input
                        type="text"
                        className="lastName input"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}>
                    </input>
                    <div className="lastName error"></div>

                    Prénom :
                    <input
                        type="text"
                        className="firstName input"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}>
                    </input>
                    <div className="firstName error"></div>

                    Email :
                    <input
                        type="email"
                        className="input-email input "
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}>
                    </input>
                    <div className="email error"></div>

                    Mot de passe :
                    <input
                        type="password"
                        className="input-password input"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}>
                    </input>
                    <div className="password error"></div>

                    Confirmer mot de passe :
                    <input
                        type="password"
                        className="password-conf input"
                        onChange={(e) => setControlPassword(e.target.value)}
                        value={controlPassword}
                    />
                    <div className="password-confirm error"></div>

                    <input type="submit" className="input-button" value="S'incrire" />
                </form>
            )}
        </>
    );
};

export default Signup