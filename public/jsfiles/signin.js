
var name, email, photoUrl, uid, emailVerified;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById("form").style.display="none";
    document.getElementById("welcome").style.display="block";
    var user = firebase.auth().currentUser;

    if (user != null) {
        userName = user.displayName;
        userEmail = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                         // this value to authenticate with your backend server, if
                         // you have one. Use User.getToken() instead.
        document.getElementById("name").innerHTML = userEmail;
        document.getElementById("name").style.display="block";
      }



                          // The user's ID, unique to the Firebase project. Do NOT use
                         // this value to authenticate with your backend server, if
                         // you have one. Use User.getToken() instead.
  } else {
    // No user is signed in.
  }
});


function authanticate(){
  var email = document.getElementById('inputEmail').value;
  var password = document.getElementById('inputPassword').value;
  var reg_e = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  var reg_p1 = /[a-z]/g;
  var reg_p2 = /[A-Z]/g;
  var reg_p3 = /[0-9]/g;


  if(email == ""){
    window.alert("Enter email address.");
    return false;
  }
  else if(password == ""){
    window.alert("Enter password.");
    return false;
  }
  else if (!(reg_p1.test(password) && reg_p2.test(password) && reg_p3.test(password)))
  {
      alert('Invalid Password.');
      return false;
  }
  else {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
           // Handle Errors here.
           var errorCode = error.code;
           var errorMessage = error.message;
           // [START_EXCLUDE]
           if (errorCode === 'auth/wrong-password') {
             window.alert('Wrong password.');
           } else {
             window.alert('Error: '+errorMessage);
           }
           // [END_EXCLUDE]
         });
  }

}

function signOut(){
  firebase.auth().signOut().then(function() {
    document.getElementById("form").style.display="block";
    document.getElementById("welcome").style.display="none";
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}
