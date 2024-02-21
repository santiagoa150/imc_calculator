// const ID = document.getElementById('ID');
// const password = document.getElementById('passoword');
// const btnLogin = document.getElementById('btnLogin');

async function getUserData() {
    const response = await fetch('/getData');
    const data = await response.json();
    const elements = document.getElementsByClassName('show_when_login');
    const elementsToHide = document.getElementsByClassName('hide_when_login')

    for (ele of elements) {
        if (data?.cc) {
            ele.style.display = 'block'
        } else {
            ele.style.display = 'none'
        }
    }

    for (ele of elementsToHide) {
        if (data?.cc) {
            ele.style.display = 'none'
        } else {
            ele.style.display = 'block'
        }
    }

}
getUserData();