const picture = document.getElementById("picture");
const pictureFrame = document.getElementById("picture-frame");

const zoomIn = document.getElementById("zoom-in");
const zoomOut = document.getElementById("zoom-out");
zoomOut.disabled = true;
button_style("hidden");


let scaleFactor = 2;
let mousePos = { x: 0, y: 0 };

const clamp = (val, min = 0, max = 1) => Math.max(min, Math.min(max, val));

function button_style(v) {
    zoomIn.style.visibility = v;
    zoomOut.style.visibility = v;
}

// disable zoom on mobile devices
if (!/Mobi|Android/i.test(navigator.userAgent)) {

    function change_zoom_by(num) {
        scaleFactor += num;
        scaleFactor = clamp(scaleFactor, 2, 8);

        if (scaleFactor >= 8) {
            zoomIn.disabled = true;
        } else {
            zoomIn.disabled = false;
        }

        if (scaleFactor <= 2) {
            zoomOut.disabled = true;
        } else {
            zoomOut.disabled = false;
        }

        update_zoom(mousePos);
    }

    // handle button zoom
    zoomIn.onclick = () => change_zoom_by(1);
    zoomOut.onclick = () => change_zoom_by(-1);

    // zoom on mouse move
    pictureFrame.addEventListener("mousemove", e => {
        mousePos = { x: e.x, y: e.y };
        update_zoom(mousePos);
    });

    // zoom on scroll
    pictureFrame.onwheel = scroll_zoom;

    function scroll_zoom(e) {
        e.preventDefault();
        change_zoom_by(-e.deltaY / 100);
    }

    pictureFrame.addEventListener("mouseenter", _ => {
        button_style("visible");
    })

    // reset zoom when the mouse leaves the picture area
    pictureFrame.addEventListener("mouseleave", _ => {
        // reset zoom
        change_zoom_by(-8);
        button_style("hidden");

        document.getElementById("picture").style.transform = `translate(0px, 0px) scale(1)`;

    })

    function update_zoom(mouse) {
        picWidth = picture.clientWidth;
        picHeight = picture.clientHeight;

        x = mouse.x - (pictureFrame.offsetLeft) - (picWidth / 2);
        y = mouse.y - (pictureFrame.offsetTop) - (picHeight / 2) + window.scrollY;

        // make it easier to zoom into edges
        x = (x / picWidth * 1.5) * picWidth;
        y = (y / picHeight * 1.5) * picHeight;

        x = clamp(x, -picWidth / 2, picWidth / 2) * (scaleFactor - 1);
        y = clamp(y, -picHeight / 2, picHeight / 2) * (scaleFactor - 1);

        picture.style.transform = `translate(${-x}px, ${-y}px) scale(${scaleFactor})`;
    }
}
