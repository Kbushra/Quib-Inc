var searchBar = document.getElementById("search");
var result = document.getElementById("result");
var figureTemplate = document.getElementsByTagName("figure")[0];
var but = document.getElementsByTagName("button")[0];
var page = 1;

var lastReq = -1;

var figures = new Array;

var imgIds = new Array;

function clearElements(arr)
{
    arr.forEach((element) =>
    {
        element.remove();
    });

    arr = [];
}

async function searchRequest()
{
    if (lastReq != -1 && (performance.now() - lastReq) < (1000))
    {
        result.innerText = `Timeout! ${Math.floor(((1000) + lastReq - performance.now())) / 1000}s cooldown.`;
        return;
    }

    if (searchBar.value == "") { return; }

    lastReq = performance.now();
    
    let fetched = await fetch("/api/search",
    {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Content-Type-Options": "nosniff" },
        body: JSON.stringify({ val: searchBar.value, pg: page })
    });

    let response = await fetched.json();
    
    result.innerText = response.error == null ? `Results for ${searchBar.value}` : `ERROR: ${response.errors}`;
    if (response.error != null) { return; }

    clearElements(figures);
    for (let i = 0; i < response.data.length; i++)
    {
        let file = await fetch("/api/download",
        {
            method: "POST",
            headers: { "Content-Type": "text/plain", "X-Content-Type-Options": "nosniff" },
            body: response.data[i].name
        });

        let decoded = await file.text();

        if (decoded == "") { continue; }

        figures[i] = figureTemplate.cloneNode(true);
        document.getElementById("container").appendChild(figures[i]);

        let img = figures[i].getElementsByTagName("img")[0];
        let txt = figures[i].getElementsByTagName("figcaption")[0];

        img.style.top = 190 + (400 * Math.floor(i / 4)) + "px";
        img.style.left = 130 + (450 * (i % 4)) + "px";
        img.style.visibility = "visible";
        txt.style.position = "absolute";
        txt.style.top = parseInt(img.style.top) + 300 + "px";
        txt.style.left = img.style.left;

        img.src = `data:image/jpeg;base64,${decoded}`;
        txt.innerHTML = response.data[i].name;
    }
}

searchBar.addEventListener("change", async () =>
{
    page = 1;
    await searchRequest();
});

but.addEventListener("click", async () =>
{
    page++;
    await searchRequest();
});