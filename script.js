// script.js

/* ---------------- HOMEPAGE ---------------- */
const drinks = document.querySelectorAll('.drink');
const startBtn = document.getElementById('startBtn');
const usernameInput = document.getElementById('username');
let selectedDrink = '';

function checkReady() {
  startBtn.disabled = !(selectedDrink && usernameInput.value.trim());
}

// Boissons animées au clic
drinks.forEach(drink => {
  drink.addEventListener('click', () => {
    drinks.forEach(d => {
      d.classList.remove('selected');
      d.style.transform = 'scale(1)';
      d.style.boxShadow = '0 0 0 rgba(255,255,255,0)';
      d.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });

    drink.classList.add('selected');
    selectedDrink = drink.dataset.drink;
    drink.style.transform = 'scale(1.2)';
    drink.style.boxShadow = '0 0 25px rgba(255,255,255,0.7)';
    drink.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

    checkReady();
  });
});

usernameInput.addEventListener('input', checkReady);

startBtn.addEventListener('click', () => {
  document.getElementById('homepage').style.display = 'none';
  const pomodoroPage = document.getElementById('pomodoroPage');
  pomodoroPage.classList.add('active');
  document.getElementById('userDisplay').innerText = usernameInput.value;
  document.getElementById('drinkDisplay').innerText = selectedDrink;
});

/* ---------------- POMODORO TIMER ---------------- */
let timerDisplay = document.getElementById('timer');
let startBtnTimer = document.getElementById('startTimer');
let pauseBtnTimer = document.getElementById('pauseTimer');
let resetBtnTimer = document.getElementById('resetTimer');

let time = 25*60;
let interval = null;

function updateTimerDisplay() {
  let mins = Math.floor(time/60).toString().padStart(2,'0');
  let secs = (time%60).toString().padStart(2,'0');
  timerDisplay.textContent = `${mins}:${secs}`;
}

startBtnTimer.addEventListener('click', () => {
  if(!interval){
    interval = setInterval(() => {
      time--;
      if(time<0){
        clearInterval(interval);
        interval=null;
        alert("Session terminée 🎉 prends une pause !");
        document.getElementById('sessionCount').innerText =
          parseInt(document.getElementById('sessionCount').innerText)+1;
        time = 25*60;
      }
      updateTimerDisplay();
    },1000);
  }
});

pauseBtnTimer.addEventListener('click', () => { clearInterval(interval); interval=null; });
resetBtnTimer.addEventListener('click', () => { clearInterval(interval); interval=null; time=25*60; updateTimerDisplay(); });

/* ---------------- TO-DO LIST ---------------- */
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const tasksDone = document.getElementById('tasksDone');

addTaskBtn.addEventListener('click', () => {
  if(taskInput.value.trim()!==''){
    let li = document.createElement('li');
    li.textContent = taskInput.value;

    let delBtn = document.createElement('button');
    delBtn.textContent = 'X';
    delBtn.addEventListener('click', ()=>{
      if(li.classList.contains('completed')){
        tasksDone.innerText = parseInt(tasksDone.innerText)-1;
      }
      li.remove();
    });

    li.addEventListener('click', ()=>{
      li.classList.toggle('completed');
      tasksDone.innerText = document.querySelectorAll('li.completed').length;
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
    taskInput.value='';
  }
});

/* ---------------- CURSEUR PERSONNALISE ---------------- */
const cursor = document.getElementById('customCursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

const hoverElements = document.querySelectorAll('.drink, button');
hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); });
});
