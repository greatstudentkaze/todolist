let toDoList = [];
let doneList = [];

if (localStorage.getItem('toDoTasks') != undefined) {
    toDoList = JSON.parse(localStorage.getItem('toDoTasks'))
    output()
}
if (localStorage.getItem('doneTasks') != undefined) {
    doneList = JSON.parse(localStorage.getItem('doneTasks'))
    output()
}

document.getElementById('AddNewTask').onclick = function () {
    let taskLabel = document.getElementById('newTask-label').value
    let taskDesc = document.getElementById('newTask-desc').value
    let temp = {}
    temp.tl = taskLabel
    temp.td = taskDesc
    toDoList[toDoList.length] = temp
    output()
    localStorage.setItem('toDoTasks', JSON.stringify(toDoList));
}

function output() {
    let task = ''
    let taskd = ''
    let btnTD = `<div class="col-2"> <div class="btn-group"> <button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button> <div class="dropdown-menu dropdown-menu-right">`
    let btnD = `<div class="col-2"> <div class="btn-group"> <button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button> <div class="dropdown-menu dropdown-menu-right">`
    for (let i in toDoList){
        task += `<div class="row" id="TD-${i}"> <div class="col-10"> <div class="form-group lpd"> <label class="form-check-label Label" id="label" for="description" maxlength="20">` + toDoList[i].tl + `</label> <textarea class="form-control underLabel" id="description" rows="2" maxlength="60" readonly>` + toDoList[i].td + `</textarea> </div> </div>` + btnTD + ` <button class="dropdown-item" type="button" onclick="movetoDONE(${i})">Переместить</button> <button class="dropdown-item" type="button" onclick="edit(${i})" data-toggle="modal" data-target="#edittaskModalCenter">Изменить</button> <button class="dropdown-item" type="button" onclick="removeTD(${i})">Удалить</button> </div> </div> </div> </div>`
        document.getElementById('todoTasks-body').innerHTML = task

    }
    for (let k in doneList){
        taskd += `<div class="row" id="D-${k}"> <div class="col-10"> <div class="form-group lpd"> <label class="form-check-label Label" id="label" for="description" maxlength="20">` + doneList[k].tl + `</label> <textarea class="form-control underLabel" id="description" rows="2" maxlength="60" readonly>` + doneList[k].td + `</textarea> </div> </div>` + btnD + ` <button class="dropdown-item" type="button" onclick="movetoDO(${k})">Переместить</button> <button class="dropdown-item" type="button" onclick="removeD(${k})">Удалить</button> </div> </div> </div> </div>`
        document.getElementById('doneTasks-body').innerHTML = taskd

    }
}

function movetoDONE(id) {
    currentTask = document.getElementById(`TD-${id}`)
    doneList.unshift(toDoList[id])
    toDoList.splice(id,1)
    document.getElementById('doneTasks-body').innerHTML += currentTask.outerHTML
    currentTask.remove()
    localStorage.setItem('toDoTasks', JSON.stringify(toDoList));
    localStorage.setItem('doneTasks', JSON.stringify(doneList));
    output()
}
function movetoDO(id) {
    currentTask = document.getElementById(`D-${id}`)
    toDoList.unshift(doneList[id])
    doneList.splice(id,1)
    document.getElementById('todoTasks-body').innerHTML += currentTask.outerHTML
    currentTask.remove()
    localStorage.setItem('toDoTasks', JSON.stringify(toDoList));
    localStorage.setItem('doneTasks', JSON.stringify(doneList));
    output()
}
function edit(id) {
    currentTask = document.getElementById(`TD-${id}`)
    currentTL = currentTask.childNodes[1].childNodes[1].childNodes[1].innerHTML
    currentTD = currentTask.childNodes[1].childNodes[1].childNodes[3].value
    ctlNew = document.getElementById('editTask-label')
    ctdNew = document.getElementById('editTask-desc')
    ctlNew.value = currentTL
    ctdNew.value = currentTD

    document.getElementById('AddUpdatedTask').onclick = function() {
        currentTask = document.getElementById(`TD-${id}`)
        currentTL = currentTask.childNodes[1].childNodes[1].childNodes[1]
        currentTD = currentTask.childNodes[1].childNodes[1].childNodes[3]
        ctlNew = document.getElementById('editTask-label')
        ctdNew = document.getElementById('editTask-desc')

        currentTL.innerHTML = ctlNew.value
        currentTD.innerHTML = ctdNew.value

        toDoList[id].tl = currentTL.innerHTML
        toDoList[id].td = currentTD.innerHTML
        localStorage.setItem('toDoTasks', JSON.stringify(toDoList));
    }
}

function removeTD(id) {
    currentTask = document.getElementById(`TD-${id}`)
    toDoList.splice(id,1)
    currentTask.remove()
    localStorage.setItem('toDoTasks', JSON.stringify(toDoList))
}
function removeD(id) {
    currentTask = document.getElementById(`D-${id}`)
    doneList.splice(id,1)
    currentTask.remove()
    localStorage.setItem('doneTasks', JSON.stringify(doneList))
}

const theme = document.getElementById('Theme');
document.getElementById('waterTheme').onclick = function() {
    theme.setAttribute("href", "css/ThemeWater.css")
}
document.getElementById('earthTheme').onclick = function() {
    theme.setAttribute("href", "css/ThemeEarth.css")
}
document.getElementById('fireTheme').onclick = function() {
    theme.setAttribute("href", "css/ThemeFire.css")
}
document.getElementById('airTheme').onclick = function() {
    theme.setAttribute("href", "css/ThemeAir.css")
}

