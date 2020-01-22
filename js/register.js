
var username;
var password;
var poolData;
	
function registerButton() {

	username = document.getElementById("emailInputRegister").value;

	if (document.getElementById("passwordInputRegister").value != document.getElementById("confirmationpassword").value) {
		alert("Passwords Do Not Match!")
		throw "Passwords Do Not Match!"
	} else {
		password =  document.getElementById("passwordInputRegister").value;	
	}

	poolData = {
			UserPoolId : _config.cognito.userPoolId, // Your user pool id here
			ClientId : _config.cognito.clientId // Your client id here
		};		
	var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

	var attributeList = [];

	var dataEmail = {
		Name : 'email', 
		Value : username, //get from form field
	};



	var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);


	attributeList.push(attributeEmail);

	userPool.signUp(username, password, attributeList, null, function(err, result){
		if (err) {
			alert(err.message || JSON.stringify(err));
			return;
		}
		cognitoUser = result.user;
		console.log('user name is ' + cognitoUser.getUsername());
		//change elements of page
		alert("Check your email for a verification link!")
		
	});
}
