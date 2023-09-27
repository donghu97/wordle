const ans = "APPLE";


let index = 0;
let attp = 0;

let timer;

function appStart() {

    const displayGameover = () => {
        const div = document.createElement("div");
        div.innerText = "GameOver!!!!";
        div.style = "display:flex; justify-content:center; align-items:center; position:absolute; top:38%; left:45vw; background-color:white; width:200pcx; height:100px";
        document.body.appendChild(div);
    }

    const gameOver = () => {
        window.removeEventListener("keydown", handleKeyDown);
        displayGameover();
        clearInterval(timer);
    }

    const nextLine = () => {
        if(attp === 6) return gameOver();
        attp++;
        index = 0;
    }

    const handleEnterKey = () => {
        let ansNum = 0;
        for(let i=0; i<5; i++) {
            const block = document.querySelector(`.board-block[data-index='${attp}${i}']`);
            const wrtText = block.innerText;
            const ansText = ans[i];
            if(wrtText === ansText) {
                ansNum++;
                block.style.background = "#6AAA64";
            }
            else if(ans.includes(wrtText)) block.style.background = "#C9B458";
            else block.style.background = "#787C7E";

            block.style.color = "white";
        }
        if(ansNum === 5) gameOver();
        else nextLine();
    }

    const handleBackspace = () => {
        if(index>0){
            const preBlock = document.querySelector(`.board-block[data-index='${attp}${index-1}']`);
            preBlock.innerText = "";
        }
        if(index != 0) index -= 1;
    }

    const handleKeyDown = (event) => {

        const key = event.key.toUpperCase();
        const keyCode = event.keyCode;
        const thisBlock = document.querySelector(`.board-block[data-index='${attp}${index}']`);

        if (event.key === "Backspace") handleBackspace();
        else if (index === 5){
            if(event.key === "Enter") handleEnterKey();
            else return;
        } else if(keyCode >=65 && keyCode <= 90) {
            thisBlock.innerText = key;
            index++;
        }
        
    }

    const startTimer = () => {
        let startTime = new Date();

        function setTime() {
        const curTime = new Date();
        const timer = new Date(curTime - startTime);
        const min = timer.getMinutes().toString().padStart(2,'0');
        const sec = timer.getSeconds().toString().padStart(2,'0');
        const timeDiv = document.querySelector("#timer");
        timeDiv.innerText = `${min}:${sec}`;
        }
    timer = setInterval(setTime, 1000); 
    }

    window.addEventListener("keydown", handleKeyDown);
}

appStart();