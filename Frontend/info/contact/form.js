let form = document.getElementsByTagName("form")[0];
let result = document.getElementById("result");

form.addEventListener("submit", async (ev) =>
{
    ev.preventDefault();
    
    let dat = new FormData(form);

    result.innerText = "...";

    let response = await fetch("/email-aaqib",
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(dat.entries()))
    });

    result.innerText = response.status == 200 ? "Result: Successful!" :
    response.status == 413 ? "Result: Message too long!" :
    response.status == 429 ? "Result: Slow down!" :
    response.status == 503 ? "Result: Ran out of tokens, sorry..." :
    "Result: Internal Server Error.";
});