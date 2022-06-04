export function showToast(message) {
    const element = document.createElement("div");
    document.body.appendChild(element);
    element.className = "toast";
    element.innerHTML = message;

    setTimeout(() => {
        element.classList.add("full-opacity");
    }, 50);

    setTimeout(() => {
        element.classList.remove("full-opacity");
    }, 2500);
}