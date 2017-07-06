var provider = new firebase.auth.GoogleAuthProvider();
var signedIn = 0;
var name = '';
$('.login').click(function(){
    if (signedIn == 0) {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
            var username = user.displayName;
            name = user.displayName;
            $('.welcome').text(username);
            $('.login').text('LOGOUT');
            var photoUrl = user.photoURL;
            $('.pic').attr('src',photoUrl);

        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
        signedIn = 1;
        
    }
    else {
        firebase.auth().signOut().then(function() {
            $('.login').text('LOGIN');
            $('.welcome').text('Guest');
            $('.pic').attr('src','images/user2.png');
        }).catch(function(error) {
            console.log("unsuccesful");
        });
        signedIn = 0;
    }
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("signin")
  } else {
    console.log("none")
  }
});