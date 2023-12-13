import './style.css'
import {authWithEmailAndPassword, checked, getAuthForm} from "./auth"
import {Documents} from "./documents"

const container = document.querySelector('.container')
container.innerHTML = getAuthForm()

const authForm = document.getElementById('auth-form')

const authFormHandler = (event) => {
    event.preventDefault()

    const email = event.target.querySelector('#email').value
    const password = event.target.querySelector('#password').value

    authWithEmailAndPassword(email, password)
        .then(checked)
        .then(data => container.insertAdjacentHTML('afterbegin', data))
        .then(() => Documents.renderDocuments())
}

authForm.addEventListener('submit', authFormHandler)
