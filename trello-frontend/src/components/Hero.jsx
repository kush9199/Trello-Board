import "./../styles/Hero.css";

function Hero({ organization }) {

    return (

        <div className="hero">

            <h1>

                🏢 {organization?.title}

            </h1>

            <p>

                {organization?.description}

            </p>

        </div>

    );

}

export default Hero;