import haversine from "haversine-distance";
import { COUNTRY_COORDINATES } from "./countries";

export class Guess {
    constructor(guessedCountry, guessedCountryCode, correctCoordinates) {
        this.guessedCountry = guessedCountry;
        this.guessedCoords = COUNTRY_COORDINATES[guessedCountryCode]
        this.correctCoords = correctCoordinates;
        this.distance = haversine(
            { latitude: this.guessedCoords[0], longitude: this.guessedCoords[1] },
            { latitude: this.correctCoords[0], longitude: this.correctCoords[1] },
        ) / 1000;
    }
}
