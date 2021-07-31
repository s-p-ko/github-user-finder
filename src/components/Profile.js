import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const API = "https://api.github.com/";

export default function Profile() {
    const params = useParams();
    const [user, setUser] = useState("");
    const [repos, setRepos] = useState([]);

    const fetchUser = (username) => {
        let url = `${API}users/${username}`;
        axios
            .get(url)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
                setUser(false);
            });
    };

    const fetchRepo = (username) => {
        let url = `${API}users/${username}/repos?per_page=10`;
        axios
            .get(url)
            .then((response) => {
                setRepos(response.data);
            })
            .catch((error) => {
                console.log(error);
                setUser(false);
            });
    };

    useEffect(() => {
        fetchUser(params.username);
        fetchRepo(params.username);
    }, [params]);

    if (user) {
        const repoList = repos.map(function (repo) {
            return (
                <li key={repo.id}>
                    <a href={repo.html_url}>{repo.name}</a>
                </li>
            );
        });
        return (
            <div>
                <Link
                    to="/"
                    className="btn btn-primary"
                    style={{ marginBottom: "20px" }}
                >
                    Back to Index
                </Link>
                <div className="card w-75 mb-2">
                    <div className="card-body d-flex flex-row bg-light">
                        <div>
                            <img
                                className="mr-4"
                                width="300"
                                alt="User"
                                src={user.avatar_url}
                            />
                        </div>
                        <div>
                            <h5 className="card-title">
                                <a href={user.html_url}>{user.name}</a>
                            </h5>
                            <h4>Repository List ({user.public_repos}) </h4>
                            <ul>{repoList}</ul>
                        </div>
                    </div>
                </div>
            </div>

        );
    } else {
        return <div>Please wait ...</div>;
    }



}