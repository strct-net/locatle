import { COUNTRY_CODES, COUNTRY_NAMES } from "./countries";
import IMAGES from "../data/image_list.json"
import { GuessHandler } from "./guessHandler";
import { SuggestionsHandler } from "./suggestionsHandler";
import { showToast } from "./toast";
import { displayDistance } from "./util";

const currentDate = new Date();
document.getElementById("title").innerHTML = `Locatle ${currentDate.getDate()}/${currentDate.getMonth() + 1}`;

const startDate = window.location.href.includes("peek")
    ? new Date(2022, 5, 3)
    : new Date(2022, 5, 4);
const day = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));

const imageData = IMAGES[day];

const picture = document.getElementById("picture");
const pictureFrame = document.getElementById("picture-frame");

const clamp = (val, min = 0, max = 1) => Math.max(min, Math.min(max, val));

// set the image
picture.src = `data/images/${imageData.id}.jpeg`;

// disable zoom on mobile devices
if (!/Mobi|Android/i.test(navigator.userAgent)) {
    // handle zoom
    pictureFrame.addEventListener('mousemove', e => {

        picWidth = picture.clientWidth;
        picHeight = picture.clientHeight;

        x = e.x - (picture.offsetLeft) - (picWidth / 2);
        y = e.y - (picture.offsetTop) - (picHeight / 2) + window.scrollY;

        // make it easier to zoom into edges
        x = (x / picWidth * 1.5) * picWidth;
        y = (y / picHeight * 1.5) * picHeight;

        x = clamp(x, -picWidth / 2, picWidth / 2);
        y = clamp(y, -picHeight / 2, picHeight / 2);

        picture.style.transform = `translate(${-x}px, ${-y}px) scale(2)`;
    });

    // reset zoom when the mouse leaves the picture area
    pictureFrame.addEventListener('mouseleave', _ => {
        document.getElementById("picture").style.transform = `translate(0px, 0px) scale(1)`;

    })
}
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