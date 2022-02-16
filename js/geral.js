var tasks = [];
let btnAddTask = document.querySelector('.addTask');
let btnClearAllTasks = document.querySelector('.removeAllTasks');
let diaSemanaText = document.querySelector('#diaSemana');
let horarioText = document.querySelector('#horario');
let semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
let d = new Date();
let dataFormatada = `, ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
var wrapperContentTasks = document.querySelector('.tasks');
var inputTasks = document.querySelector('input[type=text]');
var NTasks = document.querySelector('#numeroTask');

onload = function(){
    horarioText.innerHTML = dataFormatada;
    diaSemanaText.innerHTML = semana[d.getDay()];
    if(JSON.parse(localStorage.getItem("tasks"))){
        tasks = JSON.parse(localStorage.getItem("tasks"));
        inputTask();
    }
    verifyTask();
    NuTasks();
}
function inputTask(){
    wrapperContentTasks.innerHTML = '';
    tasks.map((e,index)=>{
        wrapperContentTasks.innerHTML +=`

            <div class="task-single">
                <div class="one">
                    <i class="fas fa-check" onclick=(checkItem(${index}))></i>
                    <p>${e}</p>
                </div>
                <div class="two">
                    <i class="fas fa-trash" onclick=(delItem(${index})) title="Remover task"></i>
                </div>
            </div>
        `
    })
}
function delItem(i){
    tasks.splice(i,1);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    inputTask();
    verifyTask();
    NuTasks();
}

function checkItem(i){
    if(tasks[i].includes('<strike>')){
        tasks[i] = tasks[i].replace('<strike>','');
        tasks[i] = tasks[i].replace('</strike>','');
    }else{
        tasks[i] = `<strike> ${tasks[i]} </strike>` ; 
    }
    localStorage.setItem('tasks',JSON.stringify(tasks));
    inputTask();
}

function NuTasks(){
    NTasks.innerHTML = tasks.length;
}
function verifyTask(){
    tasks.length ? btnClearAllTasks.style.display = 'block' :  btnClearAllTasks.style.display = 'none';    
}

let addTask = function(){
    if(inputTasks.value !== ""){
        tasks.push(inputTasks.value);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        inputTasks.value = '';
        inputTask();
        verifyTask();
        NuTasks();
    }else{
        alert('Insira alguma tarefa');
        return;
    }
}

let removeAllTasks = function(){
    if(tasks.length > 0){
        tasks = [];
        localStorage.clear('tasks');
        inputTask();
        NuTasks();
        verifyTask();
    }else{
        alert('Sem task para deletar')
    }
}

btnAddTask.addEventListener('click',addTask);
btnClearAllTasks.addEventListener('click',removeAllTasks);

