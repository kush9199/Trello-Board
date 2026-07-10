import "./../styles/StatsCard.css";

function StatsCard({

    title,

    count,

    icon

}) {

    return (

        <div className="stats-card">

            <div className="stats-icon">

                {icon}

            </div>

            <h2>

                {count}

            </h2>

            <p>

                {title}

            </p>

        </div>

    );

}

export default StatsCard;