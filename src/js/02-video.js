import Player from '@vimeo/player';
import throttle from 'lodash.throttle'

const iframeEl = document.querySelector('iframe');

const player = new Player(iframeEl);

const STORAGE_CURRENT_TIME = "videoplayer-current-time";
const currentTime = localStorage.getItem(STORAGE_CURRENT_TIME);

if (currentTime !== null) {
    player.setCurrentTime(currentTime);
}

player.on(`timeupdate`, throttle(getCurrentTime, 1000) )

function getCurrentTime(data){
    try {
        localStorage.setItem(STORAGE_CURRENT_TIME, data.seconds);
    } catch (e) {
        console.error('Failed to save current time to local storage:', e);
    }
}


