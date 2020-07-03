import React from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions';

export default function Header() {
    return (
        <div>
            <header id="header">
            <Link to ="/">
                <button className="title">Ticket Tracker App</button>
            </Link>
            <AuthOptions />
            </header>
        </div>
    )
}
