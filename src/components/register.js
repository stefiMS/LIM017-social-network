/* eslint-disable func-names */
/* eslint-disable import/no-cycle */
import {
  registerFirebase, sendConfirmEmail, updateUser,
} from '../authFirebase/authentication.js';
import { onNavigate } from '../main.js';
import { MessageData } from '../lib/index.js';
// import { getUser, collection, addDoc } from '../authFirebase/firebaseExt.js';

export const register = () => {
  // const user = getUser().uid;
  const registerElement = document.createElement('section');
  registerElement.setAttribute('class', 'containerRegister');
  const registerForm = `
  <header class="headerRegister">
    <img id="gifWelcome" src="./img/Welcome.gif" alt="imgWelcome">
  </header>
  <form class="registerPage">
    <img id="logoRegister" src="./img/logo6.png" alt="logo">
    <h2 class="intoTitle">REGÍSTRATE Y ÚNETE A PETWORLD</h2>
    <p class="textCreateAccount">Crea tu cuenta en pocos pasos</p>
    <p class="textCreateAccount">¡Es súper rápido y fácil!</p>
    <label for="fullName"></label>
    <input id="fullName" type="text" name="nameRegister" placeholder="*Nombres y Apellidos" required>
    <label for="emailRegister"></label>
    <input id="emailRegister" type="email" name="emailRegister" placeholder="*Correo electrónico" required>
    <div class="passwords">
        <div class='eye'>
          <label for="passwordRegister" class="inputLabel"></label>
          <input id="passwordRegister" type="password" name="passwordRegister" placeholder="*Contraseña nueva" required>
          <span class="iconEye2">
          <i class="fa fa-solid fa-eye-slash" id="pass"></i>
          </span>
        </div>
        <span class="msnerrorRegister"></span>
    </div>    
    <div class="passwords">
        <div class='eye'>
          <label for="repeatPassword" class="inputLabel"></label>
          <input id="repeatPassword" type="password" name="repeatPassword" placeholder="*Confirme contraseña" required>
          <span class="iconEye3">
          <i class="fa fa-solid fa-eye-slash" id="repeatPass"></i>
          </span>
        </div> 
        <span class="msnerrorRepeatPassword"></span>   
    </div>
    <button  id="btnRegister" >REGISTRARSE</button>
    <p id="messageComplete"></p>
    <a class="questionAccount" href="/">¿Ya tienes una cuenta?</a>
  </form>
  <section class="modalRegister">
    <div class="modalContent">
      <h2 class="textModalConfirm">¡SU REGISTRO HA SIDO EXITOSO!</h2>
      <p class="textModalConfirm">Le hemos enviado un mensaje de verificación <br>
       a su correo registrado <br>
       <img src="./img/emailsend.png" id="msjModal"><br>
       Ahora ya puedes iniciar sesión en Petworld</p>
       <img src="./img/mascotas.png" id="imgModalRegister">
      <button  id="btnConfirm">OK</button>
    </div>
  </section>`;
  registerElement.innerHTML = registerForm;
  const ipFullName = registerElement.querySelector('#fullName');
  const ipEmail = registerElement.querySelector('#emailRegister');
  const ipPass = registerElement.querySelector('#passwordRegister');
  const ipRepeatPassword = registerElement.querySelector('#repeatPassword');
  const btnRegister = registerElement.querySelector('#btnRegister');
  const msnerrorRegister = registerElement.querySelector('.msnerrorRegister');
  const msnerrorRepeatPassword = registerElement.querySelector('.msnerrorRepeatPassword');
  const modalRegister = registerElement.querySelector('.modalRegister');
  const messageComplete = registerElement.querySelector('#messageComplete');
  // const btnConfirm = registerElement.querySelector('#btnConfirm');
  modalRegister.classList.add('ocultar');
  function validarPassword() {
    const expRegular = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/;
    if (!ipPass) {
      MessageData(msnerrorRegister, 'Campo obligatorio');
    } else if (ipPass.value.length >= 4 && ipPass.value.length <= 8) {
      MessageData(msnerrorRegister, 'Debe tener 4-8 caracteres.');
    } else if (!ipPass.value.match(expRegular)) {
      MessageData(msnerrorRegister, 'Debe tener al menos una mayúscula, una minúscula y un número');
    } else {
      MessageData(msnerrorRegister, '');
    }
  }
  ipPass.onblur = function () { validarPassword(); };
  ipPass.onkeyup = function () { validarPassword(); };

  function validarPassword2() {
    if (ipPass.value !== ipRepeatPassword.value) {
      MessageData(msnerrorRepeatPassword, 'Las contraseñas no coinciden');
    } else {
      MessageData(msnerrorRepeatPassword, '');
    }
  }
  ipRepeatPassword.onblur = function () { validarPassword2(); };
  ipRepeatPassword.onkeyup = function () { validarPassword2(); };
  btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    if (ipFullName.value === '' || ipEmail.value === '' || ipPass.value === '' || ipRepeatPassword.value === '') {
      const errorMessageRegister = document.querySelector('#messageComplete');
      errorMessageRegister.textContent = 'Debes completar todos los campos solicitados';
    } else {
      const btnConfirm = registerElement.querySelector('#btnConfirm');
      // modalRegister.classList.add('ocultar');
      modalRegister.classList.remove('ocultar');
      modalRegister.classList.add('mostrar');
      btnConfirm.addEventListener('click', () => {
        registerFirebase(ipEmail.value, ipPass.value, ipFullName.value)
          .then((userCredential) => {
            updateUser(ipFullName.value);
            sendConfirmEmail();
            onNavigate('/');
            return userCredential.user;
          })
          .catch((error) => {
            const errorMessage = error.message;
            switch (errorMessage) {
              case 'Firebase: Error (auth/email-already-in-use).':

                modalRegister.classList.add('ocultar');
                modalRegister.classList.remove('mostrar');
                MessageData(messageComplete, 'email ya registrado');
                break;
              case 'Firebase: Error (auth/invalid-email).':

                modalRegister.classList.add('ocultar');
                modalRegister.classList.remove('mostrar');
                MessageData(messageComplete, 'email invalido');
                break;
              default:
                break;
            }
          });
      });
    }
  });
  registerElement.querySelector('.iconEye2').addEventListener('click', () => {
    const eyePassword = document.querySelector('#passwordRegister');
    const iconPass = document.querySelector('#pass');
    if (eyePassword.type === 'password') {
      eyePassword.type = 'text';
      iconPass.classList.remove('fa-eye-slash');
      iconPass.classList.add('fa-eye');
    } else {
      eyePassword.type = 'password';
      iconPass.classList.remove('fa-eye');
      iconPass.classList.add('fa-eye-slash');
    }
  });
  registerElement.querySelector('.iconEye3').addEventListener('click', () => {
    const eyePasswordRepeat = document.querySelector('#repeatPassword');
    const iconRepeat = document.querySelector('#repeatPass');
    if (eyePasswordRepeat.type === 'password') {
      eyePasswordRepeat.type = 'text';
      iconRepeat.classList.remove('fa-eye-slash');
      iconRepeat.classList.add('fa-eye');
    } else {
      eyePasswordRepeat.type = 'password';
      iconRepeat.classList.remove('fa-eye');
      iconRepeat.classList.add('fa-eye-slash');
    }
  });
  return registerElement;
};
