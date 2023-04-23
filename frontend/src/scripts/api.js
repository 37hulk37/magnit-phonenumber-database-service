import {showAlert} from "./util.js";
import Cookies from 'js-cookie'

function setToken(newToken){
    Cookies.set('token', newToken);
}

const listeners = [];

function setAuth(auth){
    Cookies.set('auth', auth);
    listeners.forEach((el) => {el.setState({authed: auth})})
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

function logIn(name, password, always){
    fetch('/auth/register', {
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
                return response.text();
            }

            throw new Error('Login error');
        })
        .then((token) => {
            setToken(token);
            setAuth(true);
            console.log(token);
        })
        .catch((err) => {
            console.error(err);
            showAlert(err);
        })
        .finally(()=>{
            always();
    });
}
/*
function getUserById(id, onSuccess, onFail = showAlert){
    fetch('/api/v1/controller/employees', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        },
        body: {
            'userId': id,
        }
    })
        .then((response) => {
            if(response.ok){
                return response.json();
            }

            throw new Error(`Couldn't get users from the server`);
        })
        .then((data) => {
            onSuccess(data);
        })
        .catch((err) => {
            console.error(err);
            onFail(err);
        });
}
*/
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


export {logIn, getData, putData};
export {getToken, setToken};
export {getAuth, setAuth, addSetAuthListener};
