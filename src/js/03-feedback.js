import throttle from "lodash.throttle";

const formEl = document.querySelector(`form`);
const FEEDBACK_KEY = "feedback-form-state";

formEl.addEventListener(`input`, throttle(setData, 500));
formEl.addEventListener(`submit`, removeData);

let feedbackData = {};

const dataFromLocalStorage = localStorage.getItem(FEEDBACK_KEY);
const parseDataFromLocalStorage = JSON.parse(dataFromLocalStorage);

const emailInputEl = document.querySelector(`input[type="email"]`);
const messageInputEl = document.querySelector(`textarea[name="message"]`);

if(parseDataFromLocalStorage) {
    emailInputEl.value = parseDataFromLocalStorage[emailInputEl.name];
    messageInputEl.value = parseDataFromLocalStorage[messageInputEl.name];
}

feedbackData.email = emailInputEl ? emailInputEl.value : ``;
feedbackData.message = messageInputEl ? messageInputEl.value : ``;

const btnSubmit = document.querySelector(`button[type="submit"]`);
switchButton();

function switchButton() {
    const isActive1 = Boolean(emailInputEl.value); //false
    const isActive2 = Boolean(messageInputEl.value); // false

    if (isActive1 && isActive2) {    
        btnSubmit.removeAttribute("disabled");
    } else {
        btnSubmit.setAttribute("disabled", "");
    }
}

function setData(e) {
    e.preventDefault()
    feedbackData[e.target.name] = e.target.value;
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedbackData));
    switchButton();
}

function removeData(e) {
    e.preventDefault()
    console.log(feedbackData);
    localStorage.removeItem(FEEDBACK_KEY);
    e.target.reset();
    feedbackData = {};
    switchButton();
}


