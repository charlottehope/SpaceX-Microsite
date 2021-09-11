const container = document.querySelector(".launches-content");
var url = "https://api.spacexdata.com/v5/launches/upcoming";
const proxy = "https://noroffcors.herokuapp.com/";
var corsFix = proxy + url;

async function makeApiCall() {    
    try {
        const response = await fetch(corsFix);
        const results = await response.json();
        console.log(results);
       
        for(let i = 0; i < results.length; i++) {

            // Trim date format
            const dateUTC = `${results[i].date_utc}`;
            const date = dateUTC.slice(0, 10);

            // Find mission details
            let missionDetails = "";
            if (results[i].details === null) {
            missionDetails = "No mission details available";
            }
            else {
            missionDetails = results[i].details;
            }

            // Find number of crew members
            let crewMembers = "";
            if (results[i].crew.length === 0) {
                crewMembers = "No crew details available";
            }
            else {
                crewMembers = results[i].crew.length;
            }

            // Find patch
            let launchPatch = "";
            if (results[i].links.patch.small === null) {
                launchPatch = '<img src="../images/patch.png" alt="Placeholder patch">';
            }
            else {
                launchPatch = `<img src="${results[i].links.patch.small}" alt="Mission patch">`;
            }
            
            // Add HTML
            container.innerHTML += `${launchPatch}
                                    <div class="launch-text">
                                        <h2>${results[i].name}</h2>
                                        <p>Flight number: ${results[i].flight_number}</p>
                                        <p>Launch date: ${date}</p>
                                        <p>Crew members: ${crewMembers}</p>
                                        <p>${missionDetails}</p>
                                    </div>`
        }

    } catch (error) {
        console.log(error);
        container.innerHTML = message("error", error);
    }
}
makeApiCall();

