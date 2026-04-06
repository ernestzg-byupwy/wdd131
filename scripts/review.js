const VISITED_TIMES_KEY_LS = "visited-review-times";

const pVisited = document.querySelector("#visited-times");

let timesVisited = Number(localStorage.getItem(VISITED_TIMES_KEY_LS)) || 0;

if (timesVisited !== 0) {
    timesVisited += 1;
    pVisited.innerHTML = `You have submitted <span class="bold-text">${timesVisited}</span> product reviews. Thanks! 😊`;
} else {
    timesVisited += 1;
    pVisited.innerHTML = `This is your <span class="bold-text">first</span> product review. Thanks!`;
}

localStorage.setItem(VISITED_TIMES_KEY_LS, timesVisited);