import { COUNTRY_CODES, COUNTRY_NAMES } from "./countries";
import IMAGES from "../data/image_list.json"
import { GuessHandler } from "./guessHandler";
import { SuggestionsHandler } from "./suggestionsHandler";
import { showToast } from "./toast";
import { displayDistance } from "./util";

const startDate = window.location.href.includes("peek")
    ? new Date(2022, 5, 3)
    : new Date(2022, 5, 4);
const day = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));
const imageData = IMAGES[day];
document.getElementById("picture").src = `data/images/${imageData.id}.jpeg`;

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
        .map(x => displayDistance(Math.round(x.distance)))
        .join("\n");
    const amount = guessHandler.guesses.length == 1
        ? "1 guess"
        : guessHandler.guesses.length + " guesses";
    const message = guessHandler.gameState == "won"
        ? `Locatle #${day} with ${amount}.\n${guessesString} 🎉\nhttps://locatle.strct.net`
        : `Locatle #${day}. Game was lost.\n${guessesString} ❌\nhttps://locatle.strct.net`;
    navigator.clipboard.writeText(message);
});