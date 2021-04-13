import './styles.css'
import project from './modules/project'
/* import allProjects from './modules/allProjects' */
import UI from './modules/DOM/UI'
import { format, compareAsc, add } from 'date-fns'

let allProjects = []
/* load stored projecs */
if (localStorage.getItem('allProjects') !== null) {
  /* allProjects = JSON.parse(localStorage.getItem('allProjects')) */
  //aca hay algun problema
  /* updateProjects() */
}

const content = document.getElementById('content')

/* PROJECTS CONTAINER */
content.appendChild(UI.loadProjectContainer)
const addProjectBtn = document.getElementById('add-project-btn')
content.appendChild(UI.loadProjectPopup)
const projectPopup = document.querySelector('.project-popup')
const form = document.getElementById('project-form')

addProjectBtn.addEventListener('click', () => {
  form.dataset.index = -1
  projectPopup.classList.toggle('undisplayed')
})

document.getElementById('cancel-project-btn').addEventListener('click', () => {
  projectPopup.classList.add('undisplayed')
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const inputText = document.getElementById('project-text-form')
  let name = inputText.value
  let newProject = project(name)
  if (form.dataset.index === '-1') {
    allProjects.push(newProject)
  } else {
    allProjects[form.dataset.index] = newProject
    const projectTitle = document.getElementById('project-title')
    projectTitle.textContent = 'Project: ' + name
  }

  /* localStorage.setItem('allProjects', JSON.stringify(allProjects)) */

  /* display projects */
  updateProjects()

  projectPopup.classList.add('undisplayed')
  form.reset()
})

/* PROJECTS */
content.childNodes[0].appendChild(UI.projectDisplay)
const projectsContainer = document.querySelector('.projects-displayer')

function updateProjects() {
  projectsContainer.innerHTML = ''
  allProjects.forEach((actProject, index) => {
    projectsContainer.appendChild(
      UI.displayProjectCard(actProject.getName(), index)
    )
  })

  document.querySelectorAll('.project-container').forEach((container) => {
    container.addEventListener('click', () => {
      displayTodos(container)
    })
  })
}

/* TODOS */
content.appendChild(UI.loadTodoContainer)
const todosContainer = document.querySelector('.todos-container')

function displayTodos(container) {
  todosContainer.innerHTML = ''
  const thisProject = allProjects[container.dataset.index]
  todosContainer.appendChild(UI.projectHeader(thisProject.getName()))

  document
    .getElementById('change-project-btn')
    .addEventListener('click', () => {
      form.dataset.index = container.dataset.index
      projectPopup.classList.toggle('undisplayed')
    })

  thisProject.forEach((todo) => {
    todosContainer.appendChild(UI.loadTodo())
  })
}
