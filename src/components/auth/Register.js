import React, { useState, useContext } from 'react';
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import Axios from 'axios';

export default function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        const newUser = { email, password, passwordCheck, displayName };
        await Axios.post("http://localhost:5000/users/register", newUser);
        const loginResponse = await Axios.post("http://localhost:5000/users/login", { email, password });
        
        setUserData({
            token: loginResponse.data.token,
            user: loginResponse.data.user,
        });
        localStorage.setItem("auth-token", loginResponse.data.token)
        history.push("/")
    }; 

    return (
        <div className="page">
            <h2>Register</h2>
            <form className="form" onSubmit={submit}>
                <label htmlFor="register-email">Email</label>
                <input id="register-email" type="email" onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="register-password">Password</label>
                <input id="register-password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" placeholder="Re-enter password" onChange={(e) => setPasswordCheck(e.target.value)}/>

                <label htmlFor="register-displayName">Display Name</label>
                <input id="register-displayName" type="text" onChange={(e) => setDisplayName(e.target.value)}/>

                <input type="submit" value="Register" className="btn btn-primary" />
            </form>
        </div>
    )
}
