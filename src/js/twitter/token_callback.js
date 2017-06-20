//Performs a server-side login for the Twitter API via TwitterOAuth

function returnToPage() {
	//After the response is recieved we try to open the authorization window
	if (window.opener) {
		window.opener.focus();
		window.opener.location.reload();
		window.close();
	}
}

function redirect() {

	$.ajax({
		type: "GET",
		contentType: "application/text",
		url: "../../php/twitter/access_token.php",
		complete: function( response ) {

			console.log( "Access Token Step: " + response.responseText );
			var authRes = JSON.parse( response.responseText );
			returnToPage();

		},
		error: function( response ) {
			returnToPage();
		}
	});

}
