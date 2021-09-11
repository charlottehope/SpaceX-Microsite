const container = document.querySelector(".rockets-content");
const url = "https://api.spacexdata.com/v4/rockets";
const proxy = "https://noroffcors.herokuapp.com/";

const corsFix = proxy + url;

async function makeApiCall() {
    try {
        const response = await fetch(corsFix);

        const results = await response.json();

        console.log(results);

        
        for(let i = 0; i < results.length; i++) {

            // Find rocket status
            let rocketStatus = "";
            if (results[i].active === true) {
            rocketStatus = "Active";
            }
            else {
            rocketStatus = "Not active";
            }

            // Find rocket description
            let rocketDescription = "";
            if (results[i].description === null) {
                rocketDescription = "No details available";
            }
            else {
                rocketDescription = results[i].description;
            }

            // Find image
            let rocketImage = "";
            if (results[i].flickr_images.length === 0) {
                rocketImage = '<img src="../images/rocket.jpg" alt="Placeholder image">';
            }
            else {
                rocketImage = `<img src="${results[i].flickr_images[0]}" alt="Rocket image">`;
            }
            
            // Add HTML
            container.innerHTML += `
                                    <div class="rockets-text">
                                        <h2>${results[i].name}</h2>
                                        ${rocketImage}
                                        <p>Status: ${rocketStatus}</p>
                                        <p>Height: ${results[i].height.feet} ft</p>
                                        <p>Diameter: ${results[i].diameter.feet} ft</p>
                                        <p>Mass: ${results[i].mass.lb} lbs</p>
                                        <p>Success rate: ${results[i].success_rate_pct}%</p>
                                        <p>${rocketDescription}</p>
                                    </div>`
        }

    } catch (error) {
        console.log(error);
        container.innerHTML = message("error", error);
    }
}
makeApiCall();