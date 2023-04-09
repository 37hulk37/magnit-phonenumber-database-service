/*
fetch(
    '/api/v1/controller/employees',
    {
        method: 'GET',
        headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmRyZXlAbWFpbC5jb20iLCJpYXQiOjE2ODA0NjgyNzAsImV4cCI6MTY4MDQ2OTcxMH0.aNzdVzLZef41BoHEU67hl9g8mjE5Xo5sxvbmCmf_R7k`
        }
    }
).then(resp => resp.json()).then(console.log)

console.log("I LOVE ASS(M)")*/

//const submitButton = form.querySelector('.submit-button');
//const submitButton = form.querySelector('.submit-button');

console.log('Script is Working');

const form = document.querySelector('.send-form');
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    fetch(
        'auth/register',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                'email': form.email.value,
                'password': form.password.value,
            }
        })
        .then((response) => {
            if(response.ok){
                console.log('Seems like ZBS');
                return response.json();
            }

            throw new Error('error');
        })
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
});

