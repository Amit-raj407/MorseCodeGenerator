var table = {
    "A": ".-",
    "K": "-.-",
    "U": "..-",
    "5": ".....",
    ",": "--..--",
    "$": "...-..-",
    "B": "-...",
    "L": ".-..",
    "V": "...-",
    "6": "-....",
    "?": "..--..",
    " ": "*",
    "C": "-.-.",
    "M": "--",
    "W": ".--",
    "7": "--...",
    "(": "-.--.",
    "D": "-..",
    "N": "-.",
    "X": "-..-",
    "8": "---..",
    ")": "-.--.-",
    "E": ".",
    "O": "---",
    "Y": "-.--",
    "9": "----.",
    "-": "-....-",
    "F": "..-.",
    "P": ".--.",
    "Z": "--..",
    "0": "-----",
    "\"": ".-..-.",
    "G": "--.",
    "Q": "--.-",
    "1": ".----",
    "/": "-..-.",
    "_": "..--.-",
    "H": "....",
    "R": ".-.",
    "2": "..---",
    "+": ".-.-.",
    "'": ".----.",
    "I": "..",
    "S": "...",
    "3": "...--",
    "=": "-...-",
    ":": "---...",
    "J": ".---",
    "T": "-",
    "4": "....-",
    ".": ".-.-.-",
    ";": "-.-.-."
};

function go() {
    var output = "";
    var input = document.forms[0].ALPHA.value.toUpperCase();

    for (var i = 0; i < input.length; i++) {
        var temp = table[input.charAt(i)];
        if (temp) {
            if ("*" == temp) {
                temp = " ";
            }
            output += temp + " ";
        } else output += "  ";
    }

    document.forms[0].MORSE.value = output;
}

function ungo() {
    var output = "";
    var input = document.forms[0].MORSE.value.replace(/   /g, " * ").split(" ");

    for (var ix = 0; ix < input.length; ix++) {
        for (var key in table) {
            if (table[key] == input[ix]) {
                output += key;
                break;
            }
        }
    }

    document.forms[0].ALPHA.value = output;
}


var AudioContext = window.AudioContext || window.webkitAudioContext;
var ctx = new AudioContext();
var dot = 1.2 / 15;

document.getElementById("play").onclick = function() {
    var t = ctx.currentTime;


    var oscillator = ctx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = 600;

    var gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, t);

    document.getElementById('morse').value.split("").forEach(function(letter) {
        switch (letter) {
            case ".":
                gainNode.gain.setValueAtTime(1, t);
                t += dot;

                gainNode.gain.setValueAtTime(0, t);
                t += dot;
                break;
            case "-":
                gainNode.gain.setValueAtTime(1, t);
                t += 3 * dot;

                gainNode.gain.setValueAtTime(0, t);
                t += dot;
                break;
            case " ":

                t += 7 * dot;
                break;
        }
    });

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();

    return false;
}