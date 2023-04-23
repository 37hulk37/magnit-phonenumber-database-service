function showAlert(message){
    if(message === ''){
        message = 'Error';
    }
    const alertContainer = document.createElement('div');
    alertContainer.style.zIndex = '100';
    alertContainer.style.position = 'absolute';
    alertContainer.style.left = '0';
    alertContainer.style.top = '0';
    alertContainer.style.right = '0';
    alertContainer.style.padding = '10px 3px';
    alertContainer.style.fontSize = '30px';
    alertContainer.style.textAlign = 'center';
    alertContainer.style.backgroundColor = 'red';

    alertContainer.textContent = message;

    document.body.append(alertContainer);

    setTimeout(() => {
        alertContainer.remove();
    }, 5000);
}


function formatNumber(num){
    if(num.length !== 11 && isNaN(+num) === false) {
        return num;
    }
    num = num + '';
    let first = num.charAt(0);
    if(first === '8'){
        first = '7';
    }
    return `+${first}(${num.substring(1,4)})${num.substring(4,7)}-${num.substring(7,9)}-${num.substring(9)}`
}


export {showAlert};
