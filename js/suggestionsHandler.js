import Fuse from 'fuse.js';
import { COUNTRY_CODES } from "./countries";

export class SuggestionsHandler {
    constructor(element, suggestionList, inputElement) {
        this.element = element;
        this.fuse = new Fuse(suggestionList);
        this.inputElement = inputElement;
        this.maxLength = 6;
        this.selectedIndex = 0;

        this.inputElement.addEventListener("input", e => {
            this.update(this.inputElement.value);
        });

        this.inputElement.addEventListener("keydown", e => {
            if (e.key == "ArrowUp") e.preventDefault();
        });

        this.inputElement.addEventListener("keydown", e => {
            if (e.key == "ArrowUp") {
                this.selectedIndex += 1;
                this.render();
            } else if (e.key == "ArrowDown") {
                this.selectedIndex = Math.max(0, this.selectedIndex - 1);
                this.render();
            } else if (e.key == "Enter") {
                const selected = this.getSelected();
                if (inputElement.value.trim() in COUNTRY_CODES) {
                    document.getElementById("guess-button").click();
                } else if (selected) {
                    inputElement.value = selected;
                }

                this.hide();
            }
        });

        this.inputElement.addEventListener("focus", () => {
            window.scrollTo(0, this.inputElement.offsetTop);
        });
    }

    getSelected() {
        return this.matches.length > 0
            ? this.matches[this.selectedIndex]
            : "";
    }

    hide() {
        this.element.innerHTML = "";
        this.selectedIndex = 0;
    }

    render() {
        this.element.innerHTML = "";
        for (const match of this.matches) {
            const entry = document.createElement("span");
            entry.className = "entry";
            entry.innerHTML = match;
            this.element.appendChild(entry);
        }

        if (this.selectedIndex >= this.matches.length) {
            this.selectedIndex = this.matches.length - 1;
        }

        this.element.children[this.selectedIndex].classList.add("selected");

        this.element.style.width = this.inputElement.parentElement.offsetWidth + "px";
        this.element.style.top = this.inputElement.offsetTop - this.element.offsetHeight + "px";
        this.element.style.left = this.inputElement.offsetLeft - 0.5 + "px";
        
        this.element.addEventListener("click", e => {
            this.inputElement.value = e.target.innerHTML;
            this.hide();
        });
    }

    update(input) {
        if (input.trim() == "" || input.trim() in COUNTRY_CODES) {
            this.hide();
            return;
        }

        this.matches = this.fuse.search(input)
            .map(x => x.item)
            .splice(0, this.maxLength);

        this.render();
    }
}