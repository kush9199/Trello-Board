import "./../styles/Navbar.css";

function Navbar() {

    const authData = JSON.parse(
        localStorage.getItem("authData")
    );

    return (

        <nav className="navbar">

            <div className="navbar-logo">

                🏢 Trello

            </div>

            <div className="navbar-right">

                <span className="username">

                    {authData?.username}

                </span>

                <button className="logout-btn">

                    Logout

                </button>

            </div>

        </nav>

    );

}

export default Navbar;