
January 10 & 31
===========

I have worked on the following:

1. API GATEWAY

2. Error handling

3. HTML

4. Cognito

5. Sign in

6. Sign out

.. code-block:: html
    :caption: index
        
    <!DOCTYPE html>
    <html>
        <head>
            <title>AWS serverless web app</title>
        </head>
        <body>
            <p><a href="https://protect-your-home.auth.us-east-1.amazoncognito.com/signup?client_id=5kuvupcm2totvfsfh2a731echd&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://example.com">Sign up</a></p>
            <p><a href="./sign-in.html">Sign in</a></p>
            <p><a href="./sign-out.html">Sign out</a></p>
        </body>
    </html>


.. raw:: html


.. code-block:: html
    :caption: sign-in
        
    <!DOCTYPE html>
    
    <html lang="en">
      <head>
      <meta charset="utf-8">
    
        <!-- Javascript SDKs-->
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
        <script src="js/amazon-cognito-auth.min.js"></script>
        <script src="https://sdk.amazonaws.com/js/aws-sdk-2.596.0.min.js"></script>
        <script src="js/amazon-cognito-identity.min.js"></script>
        <script src="js/config.js"></script>
      </head>
    
      <body>
        <form>
          <h1>Please sign in</h1>
    
          <input type="text" id="inputUsername"  placeholder="Email address" name="username" required autofocus>
          <input type="password" id="inputPassword"  placeholder="Password" name="password" required>
          <button type="button" onclick="signInButton()">Sign in</button>
        </form>
    
        <br>
        <div id='logged-in'>
          <p></p>
        </div>
    
        <p>
          <a href="./profile.html">Profile</a>
        </p>
    
        <br>
        <div id='home'>
          <p>
            <a href='./index.html'>Home</a>
          </p>
        </div>
    
        <script>
    
          var data = {
            UserPoolId : _config.cognito.userPoolId,
            ClientId : _config.cognito.clientId
          };
          var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
          var cognitoUser = userPool.getCurrentUser();
    
          function signInButton() {
            // sign-in to AWS Cognito
    
            var authenticationData = {
              Username : document.getElementById("inputUsername").value,
              Password : document.getElementById("inputPassword").value,
            };
    
            var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    
            var poolData = {
              UserPoolId : _config.cognito.userPoolId, // Your user pool id here
              ClientId : _config.cognito.clientId, // Your client id here
            };
    
            var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
            var userData = {
              Username : document.getElementById("inputUsername").value,
              Pool : userPool,
            };
    
            var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                  var accessToken = result.getAccessToken().getJwtToken();
                  console.log(result);
    
                  //get user info, to show that you are logged in
                  cognitoUser.getUserAttributes(function(err, result) {
                      if (err) {
                        console.log(err);
                        return;
                      }
                      console.log(result);
                      document.getElementById("logged-in").innerHTML = "You are logged in as: " + result[2].getValue();
                  });
    
                },
                onFailure: function(err) {
                  alert(err.message || JSON.stringify(err));
                },
            });
          }
        </script>
    
      </body>
    </html>

.. raw:: html