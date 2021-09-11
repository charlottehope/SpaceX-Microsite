const container = document.querySelector("#people-in-space");
const url = "http://api.open-notify.org/astros.json";

async function callAPI() {

    try {
        const response = await fetch(url);
        const details = await response.json();
        console.log(details);
        createHtml(details);
    }
    catch(error) {
        console.log(error);
    }
}

callAPI();

function createHtml(details) {
    container.innerHTML += `<p>There are currently ${details.number} humans in space and SpaceX are prepared to send out even more.</p>
    <a href="launches.html"><button>Upcoming launches</button></a>`;
}