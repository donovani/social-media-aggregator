//Performs a server-side login for the Twitter API via TwitterOAuth
function login() {

	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: "../../php/twitter/request_token.php",
		success: function( response ) {
			console.log( "Request Token Step: " + response );
			var authRes = JSON.parse( response );
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
		success: function( response ) {
			console.log( "Login Check: " + response );
			var loginRes = JSON.parse( response );
			signedIn = loginRes.signed_in;
			if ( signedIn ) {
				window.location.href = "../../html/twitter_home.html"
			}
		},
		error: function( response ) {
			console.log("ERROR: Could not check login status.")
		}
	});
}
