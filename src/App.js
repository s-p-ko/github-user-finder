import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "./styles.css";

import Header from "./components/Header";
import Search from "./components/Search";
import Profile from "./components/Profile";

export default function App() {
    return (
        <Router>
            <div className="container">
                <Header />
                <Route exact path="/">
                    <Search />
                </Route>
                <Route path="/user/:username">
                    <Profile />
                </Route>
            </div>
        </Router>
    );
}
