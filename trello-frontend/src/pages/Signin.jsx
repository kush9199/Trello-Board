async function handleSignin() {
    console.log("Signin started");

    try {
        const response = await fetch(
            "http://localhost:3000/signin",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            }
        );

        console.log("Response received");

        const data = await response.json();

        console.log(data);

        alert("Reached here");

    } catch(error) {
        console.error(error);
        alert("Error occurred");
    }
}