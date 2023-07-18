import './App.css'
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject)
    setUser(userObject)
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "781769058506-oaacaabq6nsplb1od5tnlakdibndc1q7.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );

    google.accounts.id.prompt();
  }, []);

  return (
    <div className="App">
      <div id='login-profile'>
        <div id="signInDiv"></div>
        {user &&
          <div className='login-card'>
            <img className='me-3' src={user.picture} />
            <div className='login-text'>
              <h3>{user.name}</h3>
              <h5>{user.email}</h5>
            </div>
          </div>
        }
      </div>

      {Object.keys(user).length != 0 &&
        <button className='btn btn-outline-dark' onClick={(e) => handleSignOut(e)}> Sign Out </button>
      }
    </div>
  );
}

export default App;
