// importiere die Daten
import { exp } from "/js/data.js";

mapboxgl.accessToken =
  "pk.eyJ1Ijoib2xhZnBvbmV0YSIsImEiOiJjbDJnYm1wZ2owMWxuM2puem11cnQ5Z3pxIn0.rmnDqSi65pQm4zix6FxG3w";

const createFilterBar = (data) => {
  let confs = [];
  let divs = [];
  data.teams.forEach((team) => {
    if (!confs.includes(team.conference)) {
      confs.push(team.conference);
    }
    if (!divs.includes(team.division)) {
      divs.push(team.division);
    }
  });
  confs.forEach((conf) => {
    const newOption = `<option value="${conf}">${conf}</option>`;
    document.getElementById("conf").insertAdjacentHTML("afterbegin", newOption);
  });
  divs.forEach((div) => {
    const newOption = `<option value="${div}">${div}</option>`;
    document.getElementById("divs").insertAdjacentHTML("afterbegin", newOption);
  });
};

const createMap = () => {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [-100.486052, 37.830348],
    zoom: 4,
  });
  return map;
};

let allMarkers = [];

const createMarkers = (teams, map) => {
  // Add markers to the map.
  for (const team of teams) {
    // Create a DOM element for each marker.
    const el = document.createElement("div");
    el.className = "marker";
    el.style.width = "50px";
    el.style.height = "50px";
    el.style.backgroundSize = "100%";
    el.innerHTML = team.icon;

    el.addEventListener("click", () => {
      window.alert(team.name);
    });

    // Add markers to the map.
    const marker = new mapboxgl.Marker(el)
      .setLngLat([team.location[1], team.location[0]])
      .addTo(map);
    allMarkers.push(marker);
  }
};

const data = JSON.parse(exp);
const map = createMap();

createFilterBar(data);
createMarkers(data.teams, map);

const filterDivs = document.getElementById("divs");
const filterConf = document.getElementById("conf");

const filterChanged = (filter, val, data) => {
  allMarkers.forEach((i) => {
    i.remove();
  });
  let teams = data.teams.filter((team) => {
    return team[filter] == val;
  });
  createMarkers(teams, map);
};

filterDivs.onchange = (event) => {
  filterChanged("division", event.target.value, data);
};
filterConf.onchange = (event) => {
  filterChanged("conference", event.target.value, data);
};

mapboxgl.accessToken =
  "pk.eyJ1Ijoib2xhZnBvbmV0YSIsImEiOiJjbDJnYm1wZ2owMWxuM2puem11cnQ5Z3pxIn0.rmnDqSi65pQm4zix6FxG3w";

const createFilter = (data) => {
  // erstelle zwei Dropdowns (für Division und Conference) in dem div mit der id = nav und befülle Sie mit den entsprechenden Werten aus den Daten
};

const createMap = () => {
  // erstelle eine Map im div mit der id = map
  // wähle eine Sinnvolle Ansicht
};

const createMarkers = (data, map) => {
  // erstelle für jedes Team einen Marker an der entsprechenden Stelle
  // Wenn ein Marker geklickt wird, soll unter dem Marker ein kleiner Kasten mit dem Namen des Teams getoggled werden.
};

// rufe hier die Funktionen auf

// mache eventlistener für die Dropdowns. Immer wenn ein Dropdown geändert wird, sollen nur die Marker für die entsprechenden Divisions und Conferences angezeigt werden.
// Immer wenn eine Conference gewählt wird, soll Division zurückgesetzt werden. Umgekehrt genauso.
// Sehe eine Möglichkeit vor die Dropdowns zurückzusetzen.

// ############ Schwierig ##############
// Immer wenn ein Dropdown geändert wird, soll sich der Kartenausschnitt so ändern, dass nur die gerade aktiven Teams sichtbar sind.
// Der Minimale Abstand zum Rand soll 100px betragen.
