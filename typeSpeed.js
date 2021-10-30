

// let setOfWords = [
//     "Angular is a platform and framework for building single-page client applications using HTML and TypeScript.Components define views, which are sets of screen elements that Angular can choose among and modify according to your program logic and data.",
//     "React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called components.",
//     "Node.js (Node) is an open source development platform for executing JavaScript code server-side. Node is useful for developing applications that require a persistent connection from the browser to the server and is often used for real-time applications such as chat, news feeds and web push notifications.",
//     "Express is a popular unopinionated web framework, written in JavaScript and hosted within the Node. js runtime environment. This module explains some of the key benefits of the framework, how to set up your development environment and how to perform common web development and deployment tasks."
// ];


const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => {
            return response.json()
        })
        .then(data => data.content)
}


const msg = document.getElementById('msg');
const typeWords = document.getElementById('myWords');
const btn = document.getElementById('btn');
let startTime, endTime, downloadTimer, arrayQuote;

const renderNewQuote = (quote) => {
    msg.innerHTML = ''

    quote.split('').forEach(character => {
        const charSpan = document.createElement('span')
        charSpan.innerText = character
        msg.appendChild(charSpan)
    })
    typeWords.value = null;
}

// Start
const playGame = async () => {
    // let randomWords = Math.floor(Math.random() * setOfWords.length);
    // const outputMessage = setOfWords[randomWords];

    const outputMessage = await getRandomQuote();

    renderNewQuote(outputMessage);
    arrayQuote = outputMessage;
    // console.log("RonadomWords",randomWords);

    //***** To Start Time ******
    let date = new Date();
    startTime = date.getTime();
    // console.log(startTime);
    btn.innerText = "Done";
    handleTimer();
}
// ******Done***********
const endPlay = () => {
    let date = new Date();
    endTime = date.getTime();
    let TotalTime = ((startTime - endTime) / 1000);
    console.log("Total Time :-", TotalTime);
    // Total String
    let totalStr = typeWords.value;
    let wordCount = wordCounter(totalStr);
    // Speed
    let speed = Math.round((wordCount / TotalTime) * 60);

    let finalMsg = "You Typed Total at  " + speed + " words per Minutes.";

    // Compare Words
    finalMsg += compareWords(msg.innerText, totalStr);

    heading.innerText = finalMsg;
    clearInterval(downloadTimer);
    typeWords.setAttribute("disabled", true);
}

// Words Count
const wordCounter = (str) => {
    let response = str.split(" ").length;
    // console.log("response",response);
    return response;
}

// Comapare Display and Input Words
const compareWords = (str1, str2) => {

    let word1 = str1.split(" ");
    let word2 = str2.split(" ");
    let cnt = 0;

    word1.forEach((item, index) => {

        if (item == word2[index]) {
            cnt++;
        }

    });
    // Wrong Words
    let wrongWords = ((word1.length - cnt));
    return (" \n " + cnt + " Correct Out of " + word1.length + " and the Total Number of Wrong Words are " + wrongWords + ".");

}
// ****************** Button *************************
btn.addEventListener('click', function () {

    // console.log("This",this);

    if (this.innerText == 'Start') {
        typeWords.disabled = false;
        playGame();
    } else if (this.innerText == 'Done') {
        typeWords.disabled = true;
        endPlay();
        this.innerText = "Reset";
    } else if (this.innerText == "Reset") {
        heading.innerText = "";
        typeWords.disabled = false;
        this.innerText = "Start";
    }

});
//   ************ Timmer ****************************
const handleTimer = () => {
    let timerString = document.getElementById("coutdowm-position");
    let timeleft = 30;
    timerString.innerText = "Start";
    downloadTimer = setInterval(() => {
        timerString.innerText = timeleft;
        timeleft--;
        // console.log("Set Interval", timeleft);
        if (timeleft <= 1) {
            clearInterval(downloadTimer);
            timerString.innerText = "Time-Up"
            endPlay();
        }
    }, 1000);
}

// ********************* Right/Wrong Words Check *******************

typeWords.addEventListener('input', () => {

    const quoteDisplayElement = document.getElementById('msg')
    // const quoteInputElement = document.getElementById('myWords')

    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = typeWords.value.split('')

    console.log("arrayValue : ", arrayValue)
    let correct = true;

    arrayQuote.forEach((charSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            charSpan.classList.remove('correct')
            charSpan.classList.remove('incorrect')
            correct = false
        } else if (character === charSpan.innerText) {
            charSpan.classList.add('correct')
            charSpan.classList.remove('incorrect')
        } else {
            charSpan.classList.remove('correct')
            charSpan.classList.add('incorrect')
            correct = false
        }
        // console.log(charSpan)
        // console.log(arrayValue[index])
    })

    // localStorage.setItem("Words",JSON.stringify(arrayValue));
})

        // For Right / Wrong Text
        // document.addEventListener('keypress',keypress);
        // function keypress(e){
        //     var keynum;

        //     if(window.event){
        //         keynum = e.keyCode;
        //         console.log("Press Key");
        //     }else if(e.which){
        //         keynum = e.which;
        //     }

        // }
