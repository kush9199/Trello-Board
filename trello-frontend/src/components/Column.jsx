import "../styles/Column.css";

function Column({ title }) {

    return (

        <div className="column">

            <div className="column-header">

                <h2>{title}</h2>

            </div>

            <div className="column-body">

                {/* Task cards will come here */}

            </div>

            <button className="add-task-btn">

                + Add Task

            </button>

        </div>

    );

}

export default Column;