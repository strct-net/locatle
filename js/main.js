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
const picture_frame = document.getElementById("picture-frame");

const clamp = (val, min = 0, max = 1) => Math.max(min, Math.min(max, val));

// set the image
picture.src = `data/images/${imageData.id}.jpeg`;

// handle zoom
picture_frame.addEventListener('mousemove', e => {

    pic_width = picture.clientWidth;
    pic_height = picture.clientHeight;

    x = e.x - (picture.offsetLeft) - (pic_width / 2);
    y = e.y - (picture.offsetTop) - (pic_height / 2);

    // make it easier to zoom into edges
    x = (x / pic_width * 1.5) * pic_width;
    y = (y / pic_height * 1.5) * pic_height;

    x = clamp(x, -pic_width / 2, pic_width / 2);
    y = clamp(y, -pic_height / 2, pic_height / 2);

    picture.style.transform = `translate(${-x}px, ${-y}px) scale(2)`;
});

// reset zoom when the mouse leaves the picture area
picture_frame.addEventListener('mouseleave', _ => {
    document.getElementById("picture").style.transform = `translate(0px, 0px) scale(1)`;

})

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