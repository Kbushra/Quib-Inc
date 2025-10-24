let form = document.getElementsByTagName("form")[0];
let result = document.getElementById("result");

form.addEventListener("submit", async (ev) =>
{
    ev.preventDefault();
    
    let dat = new FormData(form);

    result.innerText = "...";

    let response = await fetch("/api/email-undertem",
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(dat.entries()))
    });
    
    result.innerText = response.status == 200 ? "Result: Successful!" :
    response.status == 413 ? "Result: Message too long!" :
    response.status == 429 ? "Result: Slow down!" :
    response.status == 503 ? "Result: No more tokens, use regular Gmail." :
    "Result: Internal Server Error.";
});