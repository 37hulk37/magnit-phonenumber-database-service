import {showAlert} from "./util.js";
import Cookies from 'js-cookie'

function setToken(newToken){
    Cookies.set('token', newToken);
}

const listeners = [];

function setAuth(auth){
    Cookies.set('auth', auth);
    listeners.forEach((el) => {
        el.setState({authed: auth});
        el.setState({user: null});
    })
}

function addSetAuthListener(listener){
    listeners.push(listener);
}

function getAuth(){
    return Cookies.get('auth');
}

function getToken(){
    return Cookies.get('token');
}


function postData(address, body, onSuccess, onFail = showAlert){
    fetch(address, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then((response) => {
            if(!response.ok){
                throw new Error('Sending data error');
            }
        })
        .then((response) => {
            onSuccess();
            console.log(response);
        })
        .catch((err) => {
            console.error(err);
            onFail(err);
        });
}

function logIn(name, password, onSuccess, onFail){
    fetch('/auth/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'email': name,
            'password': password,
        })
    })
        .then((response) => {
            if(response.ok){
                return response.json();
            }

            throw new Error('Login error');
        })
        .then((response) => {
            console.log(response);
            onSuccess(response);
        })
        .catch((err) => {
            onFail(err);
        });
}

function getData(address, onSuccess, onFail = showAlert){
    fetch(address, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then((response) => {
            if(response.ok){
                console.log(response.body)
                return response.json();
            }

            throw new Error(`Couldn't get data from the server`);
        })
        .then((data) => {
            onSuccess(data);
        })
        .catch((err) => {
            console.error(err);
            onFail(err);
        });
}

function putData(address, body, onSuccess, onFail = showAlert){
    fetch(address, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(body),
    })
        .then((response) => {
            if(!response.ok){
                throw new Error('Sending data error');
            }
        })
        .then((response) => {
            onSuccess();
            console.log(response);
        })
        .catch((err) => {
            console.error(err);
            onFail(err);
        });
}


export {logIn, getData, putData, postData};
export {getToken, setToken};
export {getAuth, setAuth, addSetAuthListener};
