function move(key, value) {
    i = 1;
    let elem = document.getElementById(key);
    let width = 1;
    let id = setInterval(frame, 10);
    function frame() {
        if (width >= value) {
            clearInterval(id);
            i = 0;
        } else {
            width++;
            elem.style.width = width + "%";
        }
    }
}