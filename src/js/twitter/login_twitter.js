//Performs a server-side login for the Twitter API via TwitterOAuth
function login() {

	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: "../../php/twitter/request_token.php",
		complete: function( response ) {
			console.log( "Request Token Step: " + response.responseText );
			var authRes = JSON.parse( response.responseText );
			//After the response is recieved we try to open the authorization window
			var windowRef = window.open( authRes.auth_url );
			//If the first call to open a new window fails, we retry as a new tab
			if ( !windowRef || windowRef.closed ) {
				windowRef = window.open( authRes.auth_url, '_blank');
			}
			if ( windowRef && !windowRef.closed )
				windowRef.focus();
			else
				window.alert("Couldn't open a link popup to Twitter.\nPlease allow popups on this site to continue.");
		},
		error: function( response ) {
			console.log("ERROR: Could not initialize the login flow.")
		}
	});

}

//Updates the page based on the presence of login data.
function update_login() {
	var signedIn = false;

	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: "../../php/twitter/logged_in.php",
		complete: function( response ) {
			console.log( "Login Check: " + response.responseText );
			var loginRes = JSON.parse( response.responseText );
			signedIn = loginRes.signed_in;
			if ( signedIn ) {
				window.alert("You've logged into Twitter!");
			}
		},
		error: function( response ) {
			console.log("ERROR: Could not check login status.")
		}
	});
}
