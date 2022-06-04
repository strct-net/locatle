import { COUNTRY_CODES } from "./countries";
import IMAGES from "../data/image_list.json"
import { GuessHandler } from "./guessHandler";
import { SuggestionsHandler } from "./suggestionsHandler";
import { showToast } from "./toast";

const startDate = new Date(2022, 5, 4);
const day = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));
const imageData = IMAGES[day];
document.getElementById("picture").src = `data/images/${imageData.id}.jpeg`;

const guessHandler = new GuessHandler(
    imageData.country,
    imageData.coordinates,
    document.querySelector(".results")
);

if (localStorage.getItem("lastPlayedDay") == day) {
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
const suggestionsHandler = new SuggestionsHandler(
    document.getElementById("suggestions"),
    countries,
    inputElement
);
inputElement.addEventListener("keydown", e => {
    if (e.key == "Enter") {
        if (inputElement.value in COUNTRY_CODES) {
            document.getElementById("guess-button").click();
        } else if (suggestionsHandler.getSelected()) {
            inputElement.value = suggestionsHandler.getSelected();
        }

        suggestionsHandler.hide();
    }
});

inputElement.addEventListener("input", () => {
    suggestionsHandler.update(inputElement.value);
});

document.getElementById("guess-button").addEventListener("click", () => {
    const inputElement = document.getElementById("input");
    if (guessHandler.guess(inputElement.value)) {
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
    const message = guessHandler.gameState == "won"
        ? `Locatle #${day} with ${guessHandler.guesses.length} guesses.\n${guessesString} 🎉`
        : `Locatle #${day}. Game was lost.\n${guessesString} ❌`;
    navigator.clipboard.writeText(message);
});