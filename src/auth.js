import { Documents } from "./documents";

export function getAuthForm() {
    return `
        <form class="mui-form" id="auth-form">
            <div class="form-title">Вхід</div>
            <div class="mui-textfield mui-textfield--float-label">
                <input type="email" id="email" required>
                <label for="email">Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input type="password" id="password" required>
                <label for="password">Password</label>
            </div>
            <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary">
                Ввійти
            </button>
        </form>
    `;
}

export function authWithEmailAndPassword(email, password) {
    const apiKey = 'AIzaSyCdZzGbPtbM_gHcCExxXpfkq0TAfCKU77w'; 
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => data.idToken)
}

export function checked(token) {
    const authForm = document.querySelector('#auth-form');
    if (!authForm) return; 

    authForm.remove(); 

    if (!token) {
        return Promise.resolve(Documents.error()); 
    } else {
        return Promise.resolve(Documents.create()); 
    }
}

