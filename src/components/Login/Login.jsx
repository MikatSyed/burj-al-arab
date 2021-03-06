import React, { useContext } from 'react';
import firebase from 'firebase';
import firebaseConfig from './firebaseConfig';
import "firebase/auth"
import { userContext } from './../../App';
import { useHistory,useLocation } from 'react-router-dom';





const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext)

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };



  const handleGoogleLogin = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }

    var provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        const { displayName, email } = result.user;
        const signInUser = {
          name: displayName,
          email: email
        }
        setLoggedInUser(signInUser);
        authToken()
       

      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;

      });
  }

  const authToken = () =>{
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      // Send token to your backend via HTTPS
      sessionStorage.setItem('token',idToken)
      history.push(from)
    })
    .catch(function(error) {
      // Handle error
    });
  }
  return (
    <div>
      <button onClick={handleGoogleLogin}>Sign In With Google</button>
    </div>
  );
};

export default Login;