function user_credentials() {
	$.ajax({
		type: "GET",
		contentType: "application/text",
		url: "../../php/twitter/access_token.php",
		success: function( response ) {
			console.log( "GET twitter/user_credentials: " + response.responseText );
			var res = JSON.parse( response.responseText );
		},
		error: function( response ) {
			window.alert( "ERROR! Couldn't get user credentials from Twitter.\nMake sure you're logged in!" );
		}
	});
}

function notifications() {
	$.ajax({
		type: "GET",
		contentType: "application/text",
		url: "../../php/twitter/notifications.php",
		success: function( response ) {
			console.log( "GET twitter/notifications: " + response.responseText );
			var res = JSON.parse( response.responseText );
		},
		error: function( response ) {
			window.alert( "ERROR! Couldn't get notifications from Twitter." );
		}
	});
}

function home_timeline() {
	$.ajax({
		type: "GET",
		contentType: "application/text",
		url: "../../php/twitter/home_timeline.php",
		success: function( response ) {
			console.log( "GET twitter/home_timeline: " + response.responseText );
			var res = JSON.parse( response.responseText );
		},
		error: function( response ) {
			window.alert( "ERROR! Couldn't retrieve home page from Twitter." );
		}
	});
}

function user_timeline() {
	$.ajax({
		type: "GET",
		contentType: "application/text",
		url: "../../php/twitter/user_timeline.php",
		success: function( response ) {
			console.log( "GET twitter/user_timeline: " + response.responseText );
			var res = JSON.parse( response.responseText );
		},
		error: function( response ) {
			window.alert( "ERROR! Couldn't retrieve user timeline from Twitter." );
		}
	});
}

function post_status() {
	$.ajax({
		type: "POST",
		contentType: "application/text",
		url: "../../php/twitter/post_status.php",
		success: function( response ) {
			console.log( "POST twitter/post_status: " + response.responseText );
			var res = JSON.parse( response.responseText );
		},
		error: function( response ) {
			window.alert( "ERROR! Couldn't post a status to Twitter." );
		}
	});
}
