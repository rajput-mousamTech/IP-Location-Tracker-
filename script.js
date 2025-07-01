let map;

function getLocation() {
    const ip = document.getElementById("ipInput").value.trim();
    document.getElementById("loading").style.display = "block";
    document.getElementById("info").style.display = "none";

    let url = ip ? `https://ipapi.co/${ip}/json/` : `https://ipapi.co/json/`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.error) throw new Error(data.reason || "Invalid IP");

            document.getElementById("ip").textContent = data.ip;
            document.getElementById("city").textContent = data.city;
            document.getElementById("region").textContent = data.region;
            document.getElementById("country").textContent = data.country_name;
            document.getElementById("postal").textContent = data.postal;
            document.getElementById("org").textContent = data.org;
            document.getElementById("timezone").textContent = data.timezone;
            document.getElementById("lat").textContent = data.latitude;
            document.getElementById("lon").textContent = data.longitude;

            document.getElementById("loading").style.display = "none";
            document.getElementById("info").style.display = "block";

            showMap(data.latitude, data.longitude);
        })
        .catch(err => {
            document.getElementById("loading").textContent = "Error: " + err.message;
            console.error(err);
        });
}

function showMap(lat, lon) {
    if (!map) {
        map = L.map('map').setView([lat, lon], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(map);
    } else {
        map.setView([lat, lon], 13);
    }

    L.marker([lat, lon]).addTo(map).bindPopup("You are here!").openPopup();
}

window.onload = getLocation;
