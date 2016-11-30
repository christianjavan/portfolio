
function openEmailForm(){
  if(document.getElementById("contact-form").className != "open-form"){
    document.getElementById("contact-form").className += "open-form";
    if(document.getElementById("+").className != " show")
      document.getElementById("+").className += " show";
  }

}
function closeEmailForm(){
  document.getElementById("contact-form").className = "";
  document.getElementById("+").className = "close-form";
}

function addClass(el, className){
  if(el.classList)
    el.classList.add(className);
  else
    el.className += ' ' + className;
}

function removeClass(el, className){
  if (el.classList)
    el.classList.remove(className);
  else
    el.className = el.className.replace(new RegExp('(^|\\b)' +
    className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}
function afterError(el,tx){
  setTimeout(function(){ tx.innerHTML = "Mandame un email"; removeClass(el,'background-error');  }, 3000);
}

function afterSucces(tx){
  setTimeout(function(){ tx.innerHTML = "Mandame un email"; }, 3000);
}

function changeText(el, string){
  el.innerHTML = string;
}
function sendEmail(){
  el = document.getElementById('contact-form');
  tx = document.getElementById('form-header-text');
  bt = document.getElementById('send-button');
  var params = new URLSearchParams();
  var nombre = document.getElementById('nombre').value;
  var email = document.getElementById('email').value;
  var telefono = document.getElementById('telefono').value;
  var mensaje = document.getElementById('mensaje').value;
  //console.log(nombre);
  if(nombre === "" || email === "" || mensaje === "" || telefono === ""){
    addClass(el, 'background-error');
    tx.innerHTML = "Todos los campos son obligatorios";
    afterError(el,tx);
  } else{
    params.append('email', email);
    changeText(bt, 'Enviando...');
    axios.post('php/verify-email.php', params)
      .then(function(r){
        if(r.data == 1){
          emailjs.send("gmail","christianjavan_com",{nombre: nombre, email: email, telefono: telefono, mensaje: mensaje})
          .then(function(response) {
             //console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
             document.getElementById("mail-form").reset();
             changeText(tx,'Email enviado!');
             afterSucces(tx);
             changeText(bt,'Enviar');
          }, function(err) {
             //console.log("FAILED. error=", err);
          });
        }else{
          addClass(el, 'background-error');
          tx.innerHTML = "El email no es valido"
          setTimeout(function(){ tx.innerHTML = "Mandame un email"; removeClass(el,'background-error'); }, 3000);
          console.log('nada');
        }
      });
  }
}

/*!
 * classie v1.0.0
 * class helper functions
 * from bonzo https://github.com/ded/bonzo
 * MIT license
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );
