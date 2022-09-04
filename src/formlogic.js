import { renderCalendar, pointerDate } from "./calendar.js";
const addMemberBtn = document.querySelector("#addmemberbtn");
const memberSheet = document.querySelector(".inputmember");
const currentMember = document.querySelector(".inputmember legend");
const submitScheduleBtn = document.querySelector(".submitschedule");
const inputFromDate = document.getElementById("from");
const inputToDate = document.getElementById("to");

class schedule {
    constructor(date, time){
        this.date = date;
        this.time = time;
    }
}
class playerFeature {
    constructor(id, color, text){
        this.id = id;
        this.color = color;
        this.text = text;
    }
}

const scheduleData = [];
let numberOfPeople = 0;
let cycle = 0;
function memberSheetScrollbar(stdPosition) {
    memberSheet.scrollHeight > stdPosition ? memberSheet.style = `height: ${stdPosition}px` :  memberSheet.style.removeProperty("height");
}

function delMember(event) {
    const delMember = event.target.parentElement;
    event.preventDefault();
    numberOfPeople--;
    console.log(`제거한 id: ${delMember.id}`);
    
    currentMember.innerText = `참여 인원 (${numberOfPeople})`;
    memberSheetScrollbar(157);
    delMember.remove();
}

addMemberBtn.addEventListener('click', (e) => {
    e.preventDefault();
    numberOfPeople++;
    
    //멤버 박스
    const memberBox = document.createElement("span");
    memberBox.id = Date.now();
    memberSheet.appendChild(memberBox);

    //멤버 색상
    const colorBtn = document.createElement('input');
    colorBtn.type = "color";
    colorBtn.classList.add("membercolor")
    colorBtn.value = `#${Math.round(Math.random() * 0xc8 + 55).toString(16)}${Math.round(Math.random() * 0xc8 + 55).toString(16)}${Math.round(Math.random() * 0xc8 + 55).toString(16)}`

    //멤버 이름
    const nameBtn = document.createElement('input');
    nameBtn.type = "text";
    nameBtn.classList.add("member");

    //멤버 제거버튼 생성
    const delBtn = document.createElement('button');
    delBtn.type = "button";
    delBtn.style = "display: contents; color: red;";
    delBtn.classList.add(`fa-solid`);
    delBtn.classList.add(`fa-xmark`);
    delBtn.addEventListener('click', delMember);
    
    memberBox.appendChild(colorBtn);
    memberBox.appendChild(nameBtn);
    memberBox.appendChild(delBtn);

    currentMember.innerText = `참여 인원 (${numberOfPeople})`;
    memberSheetScrollbar(157);
});

window.addEventListener("resize", () => {
    memberSheetScrollbar(157);
});

const firstCheckBox = document.getElementById("twowork");
const secondCheckBox = document.getElementById("threework");

submitScheduleBtn.addEventListener('click', (e) => {
    const player = [];
    const playerFeatures = [];
    const totalDay = (inputToDate.valueAsNumber - inputFromDate.valueAsNumber)/86400000+1;

    if(inputFromDate.value == "" || inputToDate.value == "") {
        alert("날짜를 입력하시오.");
    }

    const scheduleObj = {
        fromYear: inputFromDate.valueAsDate.getFullYear(),
        fromMonth: inputFromDate.valueAsDate.getMonth(),
        fromDay: inputFromDate.valueAsDate.getDate(),
    }
    
    //교대 횟수 선택
    if (firstCheckBox.checked == true){
        cycle = 2;
    } else if(secondCheckBox.checked == true){
        cycle = 3;
    } else {
        alert("교대 체크박스를 선택하시오");
    }

    for(let i=1; i<=totalDay; i++) {
        const datePointer = new Date(scheduleObj.fromYear, scheduleObj.fromMonth, scheduleObj.fromDay+i);
        const partTime = new Array(0);
        scheduleData.push(new schedule(datePointer.toJSON(), partTime));
    }

    const tempDataLength = scheduleData.length;
    for(let i = 0; i < numberOfPeople; i++) {
        player[i] = memberSheet.children[i+1];
        playerFeatures[i] = new playerFeature(player[i].id, player[i].firstChild.value, player[i].children[1].value);
    }
    scheduleData[tempDataLength] = playerFeatures;

    const random = Math.round(Math.random() * numberOfPeople)
    for(let i = 0; i < cycle; i++) {
        for(let j = 0; j < totalDay; j++) {
            scheduleData[j].time.unshift(player[(j+i)%numberOfPeople].id);
        }
    }
    
    localStorage.setItem("scheduleData", JSON.stringify(scheduleData));
    renderCalendar(pointerDate);
    document.querySelector(".day").remove();
})