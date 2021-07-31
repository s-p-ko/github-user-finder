import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = "https://api.github.com/";

export default function Search() {
    const [users, setUsers] = useState(false);
    const [keyword, setKeyword] = useState("s-p-ko");

    useEffect(() => {
        fetchSearch(keyword);
        // eslint-disable-next-line
    }, []);

    const fetchSearch = (keyword) => {
        let url = `${API}search/users?q=${keyword}&per_page=10`;

        axios
            .get(url)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log("Oops! Fetching failed:", error);
                setUsers(false);
            });
    };

    return (
        <>
            <SearchForm
                keyword={keyword}
                setKeyword={setKeyword}
                fetchSearch={fetchSearch}
            />
            <UserList users={users} />
        </>
    );
}

function SearchForm({ keyword, setKeyword, fetchSearch }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchSearch(keyword);
    };

    return (
        <div className="search-bar">
            <form className="input-group" onSubmit={handleSubmit}>
                <input
                    className="form-control"
                    plaseholder="Type keyword and press Enter"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <span className="input-group-btn">
                    <button
                        type="submit"
                        className="btn btn-primary">
                        Submit
                        </button>
                </span>
            </form>
        </div>
    );
}

function UserList({ users }) {
    if (users) {
        if (users.message === "Not Found") {
            return (
                <div className="notfound">
                    <h2>Oops!!!</h2>
                    <p>
                        The API couldn't find any user.
                        Try again with a different keyword
                        </p>
                </div>
            );
        } else {
            let userList = users.items.map(function (user) {
                return (
                    <Link key={user.id} to={"user/" + user.login}>
                        <div className="bs-callout bs-callout-info">
                            <img
                                className="user"
                                alt="User profile"
                                src={user.avatar_url} />
                            <h4>Username: {user.login}</h4>
                            <p>Url: {user.html_url}</p>
                            <p>Score: {user.score}</p>
                        </div>
                    </Link>
                );
            });
            return <div>{userList}</div>;
        }

    } else {
        return <div>Fetching data...</div>;
    }
}

