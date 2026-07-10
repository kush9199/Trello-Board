import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Auth.css";

function Signin() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignin = async (e) => {

        e.preventDefault();

        if (!username || !password) {
            alert("Please fill all fields");
            return;
        }

        try {

            const response = await api.post("/signin", {
                username,
                password
            });

            const data = response.data;

            // Store token and role
            localStorage.setItem(
                "authData",
                JSON.stringify(data)
            );

            alert("Login Successful");

            if (data.role === "ADMIN") {
                navigate("/onboarding");
            } else {
                navigate("/organization");
            }

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Something went wrong"
            );

        }

    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <div className="auth-logo">
                    Trello
                </div>

                <h2 className="auth-title">
                    Sign in to your account
                </h2>

                <form onSubmit={handleSignin}>

                    <input
                        type="text"
                        placeholder="Username"
                        className="auth-input"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="auth-input"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button
                        type="submit"
                        className="auth-button"
                    >
                        Sign In
                    </button>

                </form>

                <p className="auth-footer">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="auth-link"
                    >
                        Sign Up
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Signin;