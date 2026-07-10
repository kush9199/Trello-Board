import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Organization.css";

function Organization() {

    const navigate = useNavigate();

    const [organization, setOrganization] = useState(null);
    const [members, setMembers] = useState([]);
    const [boards, setBoards] = useState([]);

    const authData = JSON.parse(
        localStorage.getItem("authData")
    );

    const role = authData?.role;


    const organizationId =
        localStorage.getItem("organizationId");

    useEffect(() => {

        if (!authData) {
            navigate("/signin");
            return;
        }

        loadOrganization();

    }, []);

    async function loadOrganization() {

        try {

            const orgResponse = await api.get(
                `/organization?organizationId=${organizationId}`
            );

            setOrganization(orgResponse.data.organization);

            const memberResponse = await api.get(
                `/members?organizationId=${organizationId}`
            );

            setMembers(memberResponse.data.members);

            const boardResponse = await api.get(
                `/boards?organizationId=${organizationId}`
            );

            setBoards(boardResponse.data.boards);

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Unable to load organization"
            );

        }

    }

    return (

        <div className="organization-container">

            <h1>Organization Dashboard</h1>

            {organization && (

                <div className="organization-card">

                    <h2>{organization.title}</h2>

                    <p>{organization.description}</p>

                </div>

            )}
           <div className ="dashboard">
            <div className="section">

                <h2>Members</h2>

                {

                    members.map(member => (

                        <div
                            className="member-card"
                            key={member._id}
                        >

                            {member.username}

                        </div>

                    ))

                }

            </div>

            <div className="section">

                <h2>Boards</h2>

                {

                    boards.map(board => (

                        <div
                            className="board-card"
                            key={board._id}
                        >

                            {board.title}

                        </div>

                    ))

                }

            </div>
            </div>

            {

                role === "ADMIN" && (

                    <div className="admin-actions">

                        <button>

                            Create Board

                        </button>

                        <button>

                            Add Member

                        </button>

                    </div>

                )

            }

        </div>

    );

}

export default Organization;