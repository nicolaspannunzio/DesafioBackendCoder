document.querySelector("#login").addEventListener("click", async () => {
    const data = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
    }
    const opts = {
        method: "POST",
        header: { "Content-Type": "application/json"},
        body: JSON.stringify(data),
    }
    let response = await fetch("api/sessions/login", opts)
    response = await response.json()

    if(response.statusCode===200) {
        location.replace("/")
    }
    return alert(response.message)
})