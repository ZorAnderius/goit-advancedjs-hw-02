const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBTtn: document.querySelector('[data-stop]'),
}

const handlerOnClick = (e) => {
    e.target.disabled = true;
    refs.stopBTtn.disabled = false;
    
    const interval_id = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);

    refs.stopBTtn.addEventListener('click', (e) => {
        clearInterval(interval_id);
        refs.startBtn.disabled = false;
        e.target.disabled = true;
    });
}

refs.startBtn.addEventListener('click', handlerOnClick);


function getRandomHexColor() {
return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}