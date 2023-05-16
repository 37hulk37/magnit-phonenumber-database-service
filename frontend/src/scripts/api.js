import {showAlert} from "./util.js";
import Cookies from 'js-cookie'

let tokenKill;
function setToken(newToken){
    Cookies.set('token', newToken, { expires: 1 });
    listeners.forEach((el) => {
        el.setState({authed: true});
    });
    tokenKill = setTimeout(logOut, 24*60*60*1000);
}

const listeners = [];

function logOut(){
    clearTimeout(tokenKill);
    Cookies.set('token', null);
    listeners.forEach((el) => {
        el.setState({authed: false});
        el.setState({user: null});
    });
}

function addLogOutListener(listener){
    listeners.push(listener);
}

function getAuth(){
    return Cookies.get('auth');
}

function getToken(){
    return Cookies.get('token');
}


function postData(address, body, onSuccess, onFail ){
    fetch(address, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(body),
    })
        .then((response) => {
            if(!response.ok){
                throw new Error('Не удалось отправить данные');
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

            throw new Error('Не удалось войти');
        })
        .then((response) => {
            console.log(response);
            onSuccess(response);
        })
        .catch((err) => {
            onFail(err);
        });
}

function getData(address, onSuccess, onFail){
    fetch(address, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then((response) => {
            if(response.ok){
                console.log(response.body)
                return response.json();
            }

            throw new Error('Не удалось получить данные');
        })
        .then((data) => {
            onSuccess(data);
        })
        .catch((err) => {
            console.error(err);
            onFail(err);
        });
}

function putData(address, body, onSuccess, onFail){
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
                throw new Error('Не удалось отправить данные');
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

function deleteData(address, onSuccess, onFail){
    fetch(address, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
    })
        .then((response) => {
            if(!response.ok){
                throw new Error('Не удалось удалить работника');
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


export {logIn, getData, putData, postData, deleteData};
export {setToken};
export {getAuth, logOut, addLogOutListener};
