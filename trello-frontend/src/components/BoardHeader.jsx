import "../styles/BoardHeader.css";

function BoardHeader({ board }) {
    return (
        <div className="board-header">

            <div className="board-left">

                <h1>{board?.title}</h1>

                <p>
                    Organization Board
                </p>

            </div>

            <div className="board-right">

                <button className="invite-btn">
                    + Invite Member
                </button>

            </div>

        </div>
    );
}

export default BoardHeader;