let login = document.getElementById('login');
let register = document.getElementById('register');
register.style.display = 'none';

function CreateAcc() {
    login.style.display = "none";
    register.style.display = "block";

}
function loginAcc() {
    login.style.display = "block";
    register.style.display = "none";
}

function signUp() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let password2 = document.getElementById('password2').value;
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    function validemail() {
        if (email.match(validRegex)) {
            console.log("valid")
            return true;
        }
        else {
            console.log("invalid")
            return false;
        }
    }

    if (password === password2 && validemail()) {
        let p = document.getElementById('err-signup');
        p.innerHTML = "Registration Success....";
        p.style.color = "green";

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // console.log(userCredential);
                login.style.display = "block";
                register.style.display = "none";
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    } else {

        if (password !== password2) {
            document.getElementById('err-signup').innerHTML = "Password must be Same!";
        }
        else {
            document.getElementById('err-signup').innerHTML = "You have entered an invalid email address!";
        }
    }

}

function Login() {
    let email = document.getElementById('login_email').value;
    let password = document.getElementById('login_password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            login.style.display = "none";
            register.style.display = "none";
            window.location.replace("./cv/Responsive-CV.html");
        })
        .catch((error) => {
            document.getElementById('err-login').innerHTML = "Please enter correct details...";
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        });

}