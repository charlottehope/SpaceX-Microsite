const container = document.querySelector(".launchpads-content");
const url = "https://api.spacexdata.com/v4/launchpads";
const proxy = "https://noroffcors.herokuapp.com/";

const corsFix = proxy + url;

async function makeApiCall() {
    try {
        const response = await fetch(corsFix);

        const results = await response.json();

        console.log(results);

        
        for(let i = 0; i < results.length; i++) {

            // Find launch successes
            let launchSuccess = "";
            if (results[i].launch_successes === 0) {
                launchSuccess = "No successful launches";
            }
            else {
                launchSuccess = results[i].launch_successes;
            }

            // Find launch attempts
            let launchAttempts = "";
            if (results[i].launch_attempts === 0) {
                launchAttempts = "No launch attempts ";
            }
            else {
                launchAttempts = results[i].launch_attempts;
            }

            // Find launch pad status
            let padStatus = "";
            if (results[i].status === "active") {
                padStatus = "Active ";
            }
            else if (results[i].status === "retired") {
                padStatus = "Retired";
            }
            else {
                padStatus = "Under construction";
            }
            
            // Add HTML
            container.innerHTML += `<div class="launch-text">
                                        <h2>${results[i].full_name}</h2>
                                        <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCPQdLHtUkx68dXFT9EcJKYmG0UCEa4nHY&q=${results[i].latitude},${results[i].longitude}&zoom=6"></iframe>
                                        <p>Location: ${results[i].region}</p>
                                        <p>Status: ${padStatus}</p>
                                        <p>Launch attempts: ${launchAttempts}</p>
                                        <p>Launch successes: ${launchSuccess}</p>
                                        <p>${results[i].details}</p>
                                    </div>`
        }

    } catch (error) {
        console.log(error);
        container.innerHTML = message("error", error);
    }
}
makeApiCall();
