const form = document.getElementById("signin-form");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;

    const response = await fetch("/api/send-login-link", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    if (response.ok) {
        message.textContent = "Login link has been sent to your email!";
    } else {
        message.textContent = "Error sending login link. Please try again.";
    }
});
