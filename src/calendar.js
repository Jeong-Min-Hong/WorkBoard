const date = new Date();

const calendar = document.querySelector(".calendar");
const currentDate = document.querySelector(".currentDate");
const preBtn = document.querySelector("#preBtn");
const nextBtn = document.querySelector("#nextBtn");

const calendarYear = date.getFullYear();
const calendarMonth = date.getMonth();

const scheduleData = JSON.parse(localStorage.getItem("scheduleData"));

function dateInit(date) {
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
}

export function renderCalendar(date) {
    const calendarYear = date.getFullYear();
    const calendarMonth = date.getMonth();
    const calendarDay = date.getDate();

    const StartDay = new Date(calendarYear, calendarMonth, 1).getDay();
    const preLastDayOfMonth = new Date(calendarYear, calendarMonth, 0).getDate();

    const nextStartDay = new Date(calendarYear, calendarMonth + 1, 1).getDay();           
    const lastDayOfMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    
    const day = document.createElement("div");
    day.classList = "day";
    calendar.appendChild(day);
    currentDate.innerText = `${calendarYear}년 ${calendarMonth+1}월`;
    console.log(date)
    //Day 생성 함수
    function createDay(i, color, different) {
        const days = document.createElement("div");
        const dtToJson = new Date(calendarYear, calendarMonth+different, i+1);

        days.innerText = i;
        date.setDate(i);
        date.setMonth(calendarMonth+different);
        days.id = `${dtToJson.toJSON()}`;
        
        days.style = `color: ${color}`;
        return days;
    }

    //저번달 일 일부 생성
    for(let i = preLastDayOfMonth - StartDay + 1; i <= preLastDayOfMonth; i++) {
        day.appendChild(createDay(i, "grey", -1));
    }

    //이번달 일 생성
    for(let i = 1; i <= lastDayOfMonth; i++) {
        const days = createDay(i, "black", 0);

        if((i - 7 + StartDay) % 7 == 0) {
            days.style = "color: blue";
        }
        else if((i - 7 + StartDay) % 7 == 1) {
            days.style = "color: red";
        }
        day.appendChild(days);
    }

    //다음달 일 일부 생성
    for(let i = 1; i <= 7 - nextStartDay; i++){
        day.appendChild(createDay(i, "grey", 1));
    }

    //스케쥴 데이터들을 화면에 출력
    if(scheduleData == null){
        
    } else {
        for(let count = 0; count < scheduleData[scheduleData.length-1].length; count++) {
            for(let i = 0; i < day.childElementCount; i++) {
                for(let j = 0; j < scheduleData.length -1; j++) {
                    if(day.childNodes[i].id == scheduleData[j].date) {
                        scheduleData[scheduleData.length-1].forEach(element => {
                            if(element.id == scheduleData[j].time[count]) {
                                const schduleLine = document.createElement("span");

                                schduleLine.style = `background-color: ${element.color}`;
                                schduleLine.innerText = element.text;
                                day.childNodes[i].appendChild(schduleLine);
                            }
                        });
                    }
                }
            }
        }
    }
}

let count = 0;
preBtn.addEventListener('click', () => {
    count++;
    pointerDate = new Date(calendarYear, calendarMonth - count, 1);
    document.querySelector(".day").remove();
    renderCalendar(pointerDate);
})
nextBtn.addEventListener('click', () => {
    count--;
    pointerDate = new Date(calendarYear, calendarMonth - count, 1);
    document.querySelector(".day").remove();
    renderCalendar(pointerDate);
})

dateInit(date);
export let pointerDate = date;
renderCalendar(pointerDate);