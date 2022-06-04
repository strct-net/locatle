import Fuse from 'fuse.js'

export class SuggestionsHandler {
    constructor(element, suggestionList, inputElement) {
        this.element = element;
        this.fuse = new Fuse(suggestionList);
        this.inputElement = inputElement;
        this.maxLength = 6;
    }

    getSelected() {
        return this.element.children.length > 0
            ? this.element.lastChild.innerHTML
            : "";
    }

    hide() {
        this.element.innerHTML = "";
    }

    update(input) {
        this.element.innerHTML = "";
        if (input == "") return;

        const matches = this.fuse.search(input)
            .map(x => x.item)
            .splice(0, this.maxLength)
            .reverse();

        for (const match of matches) {
            const entry = document.createElement("span");
            entry.className = "entry";
            entry.innerHTML = match;
            this.element.appendChild(entry);
        }

        this.element.style.width = this.inputElement.parentElement.offsetWidth + "px";
        this.element.style.top = this.inputElement.offsetTop - this.element.offsetHeight + "px";
        this.element.style.left = this.inputElement.offsetLeft - 0.5 + "px";
    }
}