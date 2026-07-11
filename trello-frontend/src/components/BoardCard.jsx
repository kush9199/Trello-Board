import { useNavigate } from "react-router-dom";

import "./../styles/BoardCard.css";

function BoardCard({ board }) {

    const navigate = useNavigate();

    return (

        <div
            className="board-card"
            onClick={() =>
                navigate(`/board/${board._id}`)
            }
        >

            <h3>

                📋 {board.title}

            </h3>

            <button>

                Open →

            </button>

        </div>

    );

}

export default BoardCard;