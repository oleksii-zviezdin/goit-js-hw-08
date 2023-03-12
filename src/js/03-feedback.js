import throttle from "lodash.throttle";

const formEl = document.querySelector(`form`);
const FEEDBACK_KEY = "feedback-form-state";

formEl.addEventListener(`input`, throttle(setData, 500));
formEl.addEventListener(`submit`, removeData);

const feedbackData = {};

const dataFromLocalStorage = localStorage.getItem(FEEDBACK_KEY);
const parseDataFromLocalStorage = JSON.parse(dataFromLocalStorage);

const emailInputEl = document.querySelector(`input[type="email"]`);
const messageInputEl = document.querySelector(`textarea[name="message"]`);

const emailUser = parseDataFromLocalStorage ? parseDataFromLocalStorage.email : null;
emailInputEl.value = emailUser ? emailUser : ``;

const messageUser = parseDataFromLocalStorage ? parseDataFromLocalStorage.message : null;
messageInputEl.value = messageUser ? messageUser : ``;

function setData(e) {
    feedbackData[e.target.name] = e.target.value;
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedbackData))
}

function removeData(e) {
    e.preventDefault()
    console.log(feedbackData);
    localStorage.removeItem(FEEDBACK_KEY);
    e.target.reset();
}


