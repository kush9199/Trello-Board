import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Onboarding.css";

function Onboarding() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {

        const authData = JSON.parse(
            localStorage.getItem("authData")
        );

        // User is not logged in
        if (!authData) {
            navigate("/signin");
            return;
        }

        // Only admins are allowed
        if (authData.role !== "ADMIN") {
            alert("Only admins can create organizations.");
            navigate("/organization");
            return;
        }

    }, [navigate]);

    const createOrganization = async () => {

        if (!title.trim() || !description.trim()) {
            alert("Please fill all fields.");
            return;
        }

        try {

            const response = await api.post(
                "/organization",
                {
                    title,
                    description
                }
            );

            alert(response.data.message);

            // Save organization id for future use
            localStorage.setItem(
                "organizationId",
                response.data.id
            );

            // Clear form
            setTitle("");
            setDescription("");

            // Redirect
            navigate("/organization");

        } catch (err) {

            console.error(err);

            alert(
                err.response?.data?.message ||
                "Something went wrong."
            );

        }

    };

    return (

        <div className="onboarding-container">

            <div className="onboarding-card">

                <h1>Create your first Organization</h1>

                <p className="subtitle">
                    Set up your workspace to start managing boards and issues.
                </p>

                <input
                    type="text"
                    placeholder="Organization Name"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <textarea
                    placeholder="Organization Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />

                <button onClick={createOrganization}>
                    Create Organization
                </button>

            </div>

        </div>

    );

}

export default Onboarding;