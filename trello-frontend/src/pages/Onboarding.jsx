import { useState } from "react";
import "../styles/Onboarding.css";

function Onboarding() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    async function createOrganization() {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:3000/organization",
                {




























































                    
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token: token
                    },
                    body: JSON.stringify({
                        title,
                        description
                    })
                }
            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {
                alert("Organization Created");
            } else {
                alert(data.message);
            }

        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    }

    return (
        <div className="onboarding-container">
            <div className="onboarding-card">

                <h1>Create your first organization</h1>

                <input
                    type="text"
                    placeholder="Organization Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button onClick={createOrganization}>
                    Create Organization
                </button>

            </div>
        </div>
    );
}

export default Onboarding;