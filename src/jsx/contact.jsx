import ReactDOM from "react-dom/client";

function Contact({ icon, content })
{
    return (
        <div className="row-flex contact-row">
            <img className="contact-image content-img" src={icon} />
            <p className="contact-row-content">{content}</p>
        </div>
    );
}

let contactContainer = document.getElementById("contacts");

if (contactContainer)
{
    ReactDOM.createRoot(contactContainer).render(<>
        <Contact
            content={<>Aaqib: @keepchatting_nooneexplodes<br/>Dylan: @sifud808</>}
            icon="/assets/images/discord.png"
        />
        <Contact
            content={<>Aaqib: aaqibchoudhury3@gmail.com</>}
            icon="/assets/images/gmail.png"
        />
        <Contact
            content={<>Quib Inc: <a href="https://www.youtube.com/@keepmaking-ane">YT</a></>}
            icon="/assets/images/youtube.png"
        />
        <Contact
            content={<>Aaqib: <a href="https://keepchatting.itch.io/">Account</a></>}
            icon="/assets/images/itch.png"
        />
    </>);
}

let contactMediaocreContainer = document.getElementById("contacts-mediaocre");

if (contactMediaocreContainer)
{
    ReactDOM.createRoot(contactMediaocreContainer).render(<>
        <Contact
            content={<>Aaqib: @keepchatting_nooneexplodes<br/>Krys: @ricekryspiez_<br/>Jayden: @im_ruben<br/>Ava: @sekairotted</>}
            icon="/assets/images/discord.png"
        />
        <Contact
            content={<>Undertem: undertemtheshitpost@gmail.com</>}
            icon="/assets/images/gmail.png"
        />
        <Contact
            content={<>Mediaocre Games: <a href="https://www.youtube.com/@MediaocreUT">YT</a></>}
            icon="/assets/images/youtube.png"
        />
    </>);
}

function Form({ email })
{
    return (
        <form id="request-form" className="contact-form">
            <div className="column-flex form-fields">
                <div className="row-flex large-width form-meta">
                    <p className="form-destination">Email {email}</p>
                    <p id="result" className="form-result">
                        Result: None
                    </p>
                </div>

                <input
                    className="large-width form-input"
                    maxLength="100"
                    name="email"
                    type="email"
                    placeholder="Your email (optional)"
                />
                <input
                    className="large-width form-input"
                    maxLength="100"
                    required
                    name="subject"
                    type="text"
                    placeholder="Subject"
                />
                <textarea
                    className="large-width form-textarea"
                    maxLength="1500"
                    required
                    name="content"
                    placeholder="Content"
                ></textarea>
                <button type="submit" className="form-submit clickable">
                    Send Message
                </button>
            </div>
        </form>
    );
}

let formContainer = document.getElementById("form");

if (formContainer)
{
    ReactDOM.createRoot(formContainer).render(
        <Form email={formContainer.getAttribute("email")} />,
    );
}

async function formRequest(ev)
{
    ev.preventDefault();

    let form = document.getElementById("request-form");
    let result = document.getElementById("result");

    let dat = new FormData(form);
    const formJSON = Object.fromEntries(dat.entries());
    const dest = formContainer?.getAttribute("email") || "";

    result.innerText = "...";

    let response = await fetch("/api/email",
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formJSON, dest }),
    });

    switch (response.status)
    {
        case 200:
        result.innerText = "Result: Successful!";
        break;

        case 413:
        result.innerText = "Result: Message too long!";
        break;

        case 429:
        result.innerText = "Result: Slow down!";
        break;

        case 503:
        result.innerText = "Result: No more tokens.";
        break;

        case 400:
        result.innerText = "Result: Invalid request.";
        break;

        default:
        result.innerText = "Result: Internal Server Error.";
        break;
    }
}

export function formListeners()
{
    let form = document.getElementById("request-form");
    let result = document.getElementById("result");

    if (form && result)
    {
        form.removeEventListener("submit", formRequest);
        form.addEventListener("submit", formRequest);
    }
}