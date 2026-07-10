import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Board() {

    return (

        <>

            <Navbar />

            <div className="main-layout">

                <Sidebar />

                <div className="content">

                    <h1>Board Page</h1>

                    <h2>Welcome to your Board 🚀</h2>

                    <p>
                        Issues will appear here.
                    </p>

                </div>

            </div>

        </>

    );

}

export default Board;