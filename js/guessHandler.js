import { Guess } from "./guess";
import { COUNTRY_CODES } from "./countries";

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
        row.querySelector(".distance").innerHTML = `${Math.floor(guess.distance)} km`;
        if (guessedCountryCode == this.correctCountryCode) {
            row.querySelector(".distance").innerHTML = "0 km";
            this.guesses.push({
                country: guess.guessedCountry,
                distance: 0
            });
            this.gameWon();

            return true;
        } else if (this.results.length == 5) {
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
        document.querySelector(".end-area").querySelector(".text").innerHTML = "Correct! You won.";
    }

    gameOver() {
        this.gameDone();
        this.gameState = "lost";
        document.querySelector(".end-area").querySelector(".text").innerHTML = "Incorrect! Better luck next time.";
    }
}