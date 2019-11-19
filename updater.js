let progressElement; // This is a placeholder object for the SVG box element

let titleElement; // This is a DIV for displaying text under the progressbar
let hintElement; // This element is a placeholder for additional hints
let estimateElement; // This element showing the reaming/estimated time

var timeTable = [];
var estimateTimer;
var randSentence;

// This is a message array for the messages
var messages = [
  ["Initializing...", "Calculating time remaining on file copy...", ""][
    ("Step 1 of 2: Preparing Update....",
    "Do not unplug your Apple TV while it's updating. This may take a few minutes, during which the image on your TV may briefly disappear.",
    "")
  ]
];

var estimation = [
  "Estimating time reaming...",
  "About $time minutes reaming",
  "Installing: About $time minutes reaming",
  "Installing Software Update: About $time minutes",
  "Completing Installation: About $time minutes reaming"
];

$(document).on("keydown", ev => {
  console.log(ev.keyCode);
  if (ev.keyCode === 27 || ev.keyCode === 122) return false;
});

$(document).ready(() => {
  progressElement = document.getElementById("progress-box");
  titleElement = document.getElementById("update-messages");
  hintElement = document.getElementById("update-hints");
  estimateElement = document.getElementById("update-estimate");

  // Requesting language
  var userLang = navigator.language || navigator.userLanguage;
  console.log(`Current user language is: ${userLang}`);
  randSentence = Math.floor(Math.random() * (estimation.length - 2)) + 1;
});

// This function resets the progress bar and
// cleares all of the messages displayed on a screen
function reset() {
  progressElement.setAttribute("width", "0%");
  //   titleElement.innerHTML = "&nbsp;";
  //   hintElement.innerHTML = "&nbsp;";
  estimateElement.innerHTML = "&nbsp;";
}

//
// This function will handle the first segment of the progressbar
// Usually when the updater comes up this is the
// slowest part so we will emulate it
//
function preload() {
  timeTable = Array.from({ length: 25 }, getRandomInt);

  console.log(timeTable);

  updateProgress(timeTable);
  updateEstimates();
}

function updateEstimates() {
  estimateTimer = setTimeout(() => {
    var miliseconds = timeTable.reduce((total, val) => total + val, 0);
    var minutes = Math.ceil(miliseconds / 60 / 1000);
    estimateElement.innerHTML = estimation[randSentence].replace(
      "$time",
      minutes
    );

    if (minutes > 1) updateEstimates();
  }, 1000 * 10);
}

function updateProgress() {
  let time = timeTable.pop();
  let value = Math.ceil(100 / timeTable.length);

  console.log(`Updating progress! Popped ${time}, value: ${value}`);

  if (!time) return;
  $(progressElement).animate(
    {
      width: `+=${value}%`
    },
    time,
    updateProgress
  );
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  min = 1000;
  max = 50000;
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
