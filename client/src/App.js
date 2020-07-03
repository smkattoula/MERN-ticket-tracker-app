import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from 'axios';
import Header from './components/layout/Header';
import TicketsList from './components/pages/TicketsList';
import CreateTicket from "./components/pages/CreateTicket";
import EditTicket from "./components/pages/EditTicket";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserContext from './context/UserContext';
import "bootstrap/dist/css/bootstrap.min.css";

import "./style.css";

export default function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    })

    useEffect(() => {
        const checkLoggedIn = async () => { 
        let token = localStorage.getItem("auth-token");
        if (token === null) {
            localStorage.setItem("auth-token", "");
            token = "";
        }
        const tokenResponse = await Axios.post(
            "http://localhost:5000/users/tokenIsValid",
            null,
            { headers: { "x-auth-token": token } }
        );
        if (tokenResponse.data) {
            const userResponse = await Axios.get("http://localhost:5000/users/",  { headers: { "x-auth-token": token } },
            );
            setUserData({
            token,
            user: userResponse.data,
            });
        }
    };

    checkLoggedIn();
}, []);

    return (
        <>
            <BrowserRouter>
            <UserContext.Provider value={{ userData, setUserData }}>
                <Header />
                <div className="container">
                <Switch>
                    <Route exact path="/" component={TicketsList} />
                    <Route path="/create" component={CreateTicket} />
                    <Route path="/edit/:id" component={EditTicket} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
                </div>
            </UserContext.Provider>
            </BrowserRouter>
        </>
    )
}