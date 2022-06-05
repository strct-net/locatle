import { COUNTRY_CODES, COUNTRY_NAMES } from "./countries";
import IMAGES from "../data/image_list.json"
import { GuessHandler } from "./guessHandler";
import { SuggestionsHandler } from "./suggestionsHandler";
import { showToast } from "./toast";

const startDate = window.location.href.includes("peek")
    ? new Date(2022, 5, 3)
    : new Date(2022, 5, 4);
const day = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));
const imageData = IMAGES[day];
document.getElementById("picture").src = `data/images/${imageData.id}.jpeg`;

// Yesterday's location
const yesterdayImage = IMAGES[day - 1];
const yesterdayCountry = COUNTRY_NAMES[yesterdayImage.country].split("[")[0];
const mapUrl = `http://www.google.com/maps/place/${yesterdayImage.coordinates[0]},${yesterdayImage.coordinates[1]}`;
document.querySelector(".yesterday-text").innerHTML = `Yesterday's picture was from <a href="${mapUrl}" target="_blank">${yesterdayCountry}</a>`;

const guessHandler = new GuessHandler(
    imageData.country,
    imageData.coordinates,
    document.querySelector(".results")
);

if (localStorage.getItem("lastPlayedDay") == day && localStorage.getItem("guessedCountries")) {
    const plays = JSON.parse(localStorage.getItem("guessedCountries"));
    for (const previouslyGuessedCountry of plays) {
        guessHandler.guess(previouslyGuessedCountry);
    }
} else {
    localStorage.setItem("lastPlayedDay", day);
    localStorage.setItem("guessedCountries", "");
}

const countries = Object.keys(COUNTRY_CODES);
const inputElement = document.getElementById("input");
new SuggestionsHandler(
    document.getElementById("suggestions"),
    countries,
    inputElement
);

document.getElementById("guess-button").addEventListener("click", () => {
    const inputElement = document.getElementById("input");
    if (guessHandler.guess(inputElement.value.trim())) {
        inputElement.value = "";
    }

    localStorage.setItem(
        "guessedCountries", 
        JSON.stringify(guessHandler.guesses.map(x => x.country))
    );
});

document.getElementById("share-button").addEventListener("click", () => {
    showToast("Copied results to clipboard!");
    const guessesString = guessHandler.guesses
        .map(x => Math.round(x.distance) + " km")
        .join("\n");
    const amount = guessHandler.guesses.length == 1
        ? "1 guess"
        : guessHandler.guesses.length + " guesses";
    const message = guessHandler.gameState == "won"
        ? `Locatle #${day} with ${amount}.\n${guessesString} 🎉\nhttps://locatle.strct.net`
        : `Locatle #${day}. Game was lost.\n${guessesString} ❌\nhttps://locatle.strct.net`;
    navigator.clipboard.writeText(message);
});