import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BoardHeader from "../components/BoardHeader";
import Column from "../components/Column";

import "../styles/Board.css";

function Board() {

    const { boardId } = useParams();

    const [board, setBoard] = useState(null);

    const columns = [
        "To Do",
        "In Progress",
        "Review",
        "Done"
    ];

    useEffect(() => {
        loadBoard();
    }, []);

    async function loadBoard() {

        try {

            const response = await api.get(
                `/board/${boardId}`
            );

            setBoard(response.data.board);

        } catch (err) {

            console.log(err);

            alert("Unable to load board");

        }

    }

    return (

        <>

            <Navbar />

            <div className="main-layout">

                <Sidebar />

                <div className="board-container">

                    <BoardHeader board={board} />

                    <div className="board-content">

                        {

                            columns.map((column) => (

                                <Column
                                    key={column}
                                    title={column}
                                />

                            ))

                        }

                    </div>

                </div>

            </div>

        </>

    );

}

export default Board;