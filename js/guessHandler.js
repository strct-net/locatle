import { Guess } from "./guess";
import { COUNTRY_NAMES, COUNTRY_CODES } from "./countries";
import { displayDistance } from "./util";

export class GuessHandler {
    constructor(correctCountryCode, correctCoordinates, resultsElement) {
        this.correctCountryCode = correctCountryCode;
        this.correctCoordinates = correctCoordinates;
        this.resultsElement = resultsElement;
        this.results = []
        this.guesses = [];
        this.gameState = "inProgress";
    }

    guess(guessedCountry) {
        if (!(guessedCountry in COUNTRY_CODES)) {
            return false;
        }

        const guessedCountryCode = COUNTRY_CODES[guessedCountry];
        const guess = new Guess(
            guessedCountry,
            guessedCountryCode,
            this.correctCoordinates
        );
        this.results.push(guess);

        const row = this.resultsElement.children[this.results.length - 1];
        row.querySelector(".given-country").innerHTML = guess.guessedCountry;
        row.querySelector(".distance").innerHTML = displayDistance(guess.distance);
        if (guessedCountryCode == this.correctCountryCode) {
            row.querySelector(".distance").innerHTML = displayDistance(0);
            this.guesses.push({
                country: guess.guessedCountry,
                distance: 0
            });
            this.gameWon();

            return true;
        } else if (this.results.length == 6) {
            this.gameOver();
        }

        this.guesses.push({
            country: guess.guessedCountry,
            distance: guess.distance
        });

        return true;
    }

    gameDone() {
        document.querySelector(".guess-area").hidden = true;
        document.querySelector(".end-area").hidden = false;
    }

    gameWon() {
        this.gameDone();
        this.gameState = "won";
        const endArea = document.querySelector(".end-area");
        endArea.querySelector(".text").innerHTML = "Correct! You won.";

        const message = document.createElement("p");
        message.className = "end-text";
        const mapUrl = `http://www.google.com/maps/place/${this.correctCoordinates[0]},${this.correctCoordinates[1]}`;
        message.innerHTML = `<a href="${mapUrl}" target="_blank">See on map</a><br>Come back tomorrow for a new location.`;
        endArea.parentElement.insertBefore(message, endArea.nextSibling);
    }

    gameOver() {
        this.gameDone();
        this.gameState = "lost";
        const endArea = document.querySelector(".end-area");
        endArea.querySelector(".text").innerHTML = "Incorrect! Better luck next time.";

        // Reveal the location
        const country = COUNTRY_NAMES[this.correctCountryCode];
        const mapUrl = `http://www.google.com/maps/place/${this.correctCoordinates[0]},${this.correctCoordinates[1]}`;
        const answer = document.createElement("p");
        answer.className = "end-text";
        answer.innerHTML = `The picture was taken in <a href="${mapUrl}" target="_blank">${country}</a><br>Come back tomorrow for a new location.`;
        endArea.parentElement.insertBefore(answer, endArea.nextSibling);
    }
}
