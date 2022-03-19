export const BASE_URL = 'http://localhost:8080';

export const tokenHeader = {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
}

export const header = {
    'Content-Type': 'application/json'
}