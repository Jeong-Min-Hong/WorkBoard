const scheduleForm = document.querySelector(".addschedule");
const hiddenBtn = document.getElementById("hiddenform");
const showBtn = document.getElementById("showform");

function closeBtn() {
    hiddenBtn.addEventListener("click", (event) => {
        event.preventDefault();
        scheduleForm.classList.add("hidden");
    })
}

function openBtn() {
    showBtn.addEventListener("click", (event) => {
        event.preventDefault();
        scheduleForm.classList.toggle("hidden");
    })
}

function dragElement(element) {
    const headerbar = document.querySelector(".headerbar");
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    // 이동 목적지
    headerbar.onmousedown = dragMouseDown;

    function dragMouseDown(event) {
        event.preventDefault();

        // 시작지점 마우스좌표 얻기
        pos3 = event.clientX;
        pos4 = event.clientY;
        document.onmouseup = closeDragElement;

        // 이동지점 마우스좌표 얻기
        document.onmousemove = elementDrag;
    }

    function elementDrag(event) {
        event.preventDefault();

        // 이동지점 커서좌표 계산
        pos1 = pos3 - event.clientX;
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;

        // 요소의 새 위치 설정
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* 마우스버튼 풀렸을 때, 이동 멈춤 */
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


openBtn();
closeBtn();
dragElement(scheduleForm);