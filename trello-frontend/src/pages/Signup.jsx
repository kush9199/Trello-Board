import { useState } from "react";
import { Link } from "react-router-dom";
import "./../styles/Auth.css";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:3000/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );

            const data = await response.json();

            alert(data.message);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">

                <div className="auth-logo">
                    Trello
                </div>

                <h2 className="auth-title">
                    Sign up for your account
                </h2>

                <form onSubmit={handleSignup}>

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
                        Sign Up
                    </button>

                </form>

                <p className="auth-footer">
                    Already have an account?{" "}
                    <Link
                        to="/signin"
                        className="auth-link"
                    >
                        Log In
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Signup;