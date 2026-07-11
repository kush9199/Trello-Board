import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Auth.css";

function Signup() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER");

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert("Please fill all fields");
            return;
        }

        try {

            const endpoint =
                role === "ADMIN"
                    ? "/signup/admin"
                    : "/signup";

            const response = await api.post(endpoint, {
                username,
                password
            });

            alert(response.data.message);

            navigate("/signin");

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
                    Vorexa
                </div>

                <h2 className="auth-title">
                    Create your Vorexa Account
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

                    <div className="role-selection">

                        <label>
                            <input
                                type="radio"
                                value="USER"
                                checked={role === "USER"}
                                onChange={(e) =>
                                    setRole(e.target.value)
                                }
                            />
                            User
                        </label>

                        <label>
                            <input
                                type="radio"
                                value="ADMIN"
                                checked={role === "ADMIN"}
                                onChange={(e) =>
                                    setRole(e.target.value)
                                }
                            />
                            Admin
                        </label>

                    </div>

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