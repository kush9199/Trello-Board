import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Hero from "../components/Hero";
import StatsCard from "../components/StatsCard";
import MemberCard from "../components/MemberCard";
import BoardCard from "../components/BoardCard";

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

    useEffect(() => {

        if (!authData) {
            navigate("/signin");
            return;
        }

        loadOrganization();

    }, []);

    async function loadOrganization() {

        try {

            const orgResponse =
                await api.get("/my-organization");

            const org =
                orgResponse.data.organization;

            setOrganization(org);

            const memberResponse =
                await api.get(
                    `/members?organizationId=${org._id}`
                );

            setMembers(memberResponse.data.members);

            const boardResponse =
                await api.get(
                    `/boards?organizationId=${org._id}`
                );

            setBoards(boardResponse.data.boards);

        }
        catch (err) {

            console.log(err);

        }

    }

    return (

        <>

            <Navbar />

            <div className="main-layout">

                <Sidebar />

                <div className="content">

                    <Hero
                        organization={organization}
                    />

                    <div className="stats-grid">

                        <StatsCard
                            title="Members"
                            count={members.length}
                            icon="👥"
                        />

                        <StatsCard
                            title="Boards"
                            count={boards.length}
                            icon="📋"
                        />

                        <StatsCard
                            title="Issues"
                            count="0"
                            icon="📝"
                        />

                    </div>

                    <div className="dashboard">

                        <div className="section">

                            <h2>

                                Team Members

                            </h2>

                            {

                                members.map(member => (

                                    <MemberCard
                                        key={member._id}
                                        member={member}
                                    />

                                ))

                            }

                        </div>

                        <div className="section">

                            <h2>

                                Boards

                            </h2>

                            {

                                boards.map(board => (

                                    <BoardCard
                                        key={board._id}
                                        board={board}
                                    />

                                ))

                            }

                        </div>

                    </div>

                    {

                        role === "ADMIN" && (

                            <div className="admin-actions">

                                <button>

                                    + Create Board

                                </button>

                                <button>

                                    + Invite Member

                                </button>

                            </div>

                        )

                    }

                </div>

            </div>

        </>

    );

}

export default Organization;