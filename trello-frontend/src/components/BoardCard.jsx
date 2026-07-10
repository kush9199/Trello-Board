import "./../styles/BoardCard.css";

function BoardCard({ board }) {

    return (

        <div className="board-card">

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