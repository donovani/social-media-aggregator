//Performs a client-side login for the Twitter API.
//TODO: Make it NOT client side because people shouldn't know our keys/secrets.
function login() {
	var api_key = "oBDcskDBM2sihMnFHV9yxJMT4"
	var api_secret = "UbFMNTDmldf6ZuOkdKjmBq8khZ8e0ZWEWjtbKsKrBJl9riNMZy";
	var oauth_nonce = nonce( 128 );

	$.post()

	console.log( "NONCE: " + oauth_nonce );
}

//Creates randomly generated ASCII strings for OAuth session values
function nonce( length ) {
	var nonce = "";
	for (var i=0; i<length; i++) {
		var ascii = 32 + Math.floor( Math.random() * 95 );
		nonce += String.fromCharCode( ascii );
	}
	return nonce;
}
