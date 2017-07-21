/* API calls to the PHP backend for Twitter */

function logged_in() {
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: "../../php/twitter/logged_in.php",
		success: function( response ) {
			console.log( "GET twitter/logged_in: " + response.responseText );
			var loginRes = JSON.parse( response.responseText );
		},
		error: function( response ) {
			console.log("ERROR: Could not check login status.")
		}
	});
}

function user_credentials() {
	$.ajax({
		type: "GET",
		contentType: "application/text",
		url: "../../php/twitter/user_credentials.php",
		success: function( response ) {
			//console.log( "GET twitter/user_credentials: " + response );
			var userData = JSON.parse( response );
			//DEBUGGING
			if (window.location.href.indexOf("twitter_backend_test") !== -1) {
				var output = document.getElementById("output");
				output.innerHTML = JSON.stringify(userData, null, 2);
			}
		},
		error: function( response ) {
			window.alert( "ERROR! Couldn't get user credentials from Twitter.\nMake sure you're logged in!" );
		}
	});
}

function notifications( callback, args ) {
	$.ajax({
		type: "GET",
		contentType: "application/text",
		url: "../../php/twitter/notifications.php",
		success: function( response ) {
			//console.log( "GET twitter/notifications: " + response );
			var notifData = JSON.parse( response );
			if (callback && typeof callback === "function") {
				if (args)
					callback(notifData, args);
				else
					callback(notifData);
			}
			//DEBUGGING
			if (window.location.href.indexOf("twitter_backend_test") !== -1) {
				var output = document.getElementById("output");
				output.innerHTML = JSON.stringify(notifData, null, 2);
			}
		},
		error: function( response ) {
			window.alert( "ERROR! Couldn't get notifications from Twitter." );
		}
	});
}

function home_timeline( callback, args ) {
	$.ajax({
		type: "GET",
		contentType: "application/text",
		url: "../../php/twitter/home_timeline.php",
		success: function( response ) {
			//console.log( "GET twitter/home_timeline: " + response );
			var homeData = JSON.parse( response );
			if (callback && typeof callback === "function") {
				if (args)
					callback(homeData, args);
				else
					callback(homeData);
			}
			//DEBUGGING
			if (window.location.href.indexOf("twitter_backend_test") !== -1) {
				//Outputting embed
				var embed = document.getElementById("embeds");
				var inner = '<blockquote class="twitter-tweet" data-lang="en"><p lang="da" dir="ltr">';
				inner += homeData[0].text + '</p>&mdash; ' + homeData[0].user.name + ' (@' + homeData[0].user.screen_name;
				inner += ') <a href="https://twitter.com/' + homeData[0].user.screen_name;
				inner += '/status/' + homeData[0].id + '">June 28, 2017</a></blockquote>';
				inner += '<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>';
				embed.innerHTML = inner;
				//Outputting JSON
				var output = document.getElementById("output");
				output.innerHTML = JSON.stringify(homeData, null, 2);
			}
		},
		error: function( response ) {
			window.alert( "ERROR! Couldn't retrieve home page from Twitter." );
		}
	});
}

function user_timeline( callback, args ) {
	$.ajax({
		type: "GET",
		contentType: "application/text",
		url: "../../php/twitter/user_timeline.php",
		success: function( response ) {
			//console.log( "GET twitter/user_timeline: " + response );
			var profileData = JSON.parse( response );
			if (callback && typeof callback === "function") {
				if (args)
					callback(profileData, args);
				else
					callback(profileData);
			}
			//DEBUGGING
			if (window.location.href.indexOf("twitter_backend_test") !== -1) {
				var output = document.getElementById("output");
				output.innerHTML = JSON.stringify(profileData, null, 2);
			}
		},
		error: function( response ) {
			window.alert( "ERROR! Couldn't retrieve user timeline from Twitter." );
		}
	});
}

function status_embed( username, tweetID, callback, args ) {
	$.ajax({
		type: "POST",
		contentType: "application/text",
		url: "../../php/twitter/status_embed.php",
		data: encodeURI( "https://twitter.com/" + username + "/status/" + tweetID ),
		success: function( response ) {
			console.log( "POST twitter/status_embed: " + response );
			var embedData = JSON.parse( response );
			if (callback && typeof callback === "function") {
				if (args)
					callback(embedData, args);
				else
					callback(embedData);
			}
			//DEBUGGING
			if (window.location.href.indexOf("twitter_backend_test") !== -1) {
					var output = document.getElementById("output");
					output.innerHTML = JSON.stringify(embedData, null, 2);
			}
		},
		error: function( response ) {
			window.alert( "ERROR! Couldn't retrieve user timeline from Twitter." );
		}
	});
}

function post_status() {
	//DEBUG INPUT SOURCE
	var request = {};
	if (window.location.href.indexOf("twitter_backend_test") !== -1) {
    	request.status = document.getElementById("post_status").value;
	}
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: "../../php/twitter/post_status.php",
		data: JSON.stringify( request ),
		success: function( response ) {
			console.log( "POST twitter/post_status: " + response );
			var postData = JSON.parse( response );
			//DEBUGGING
			if (window.location.href.indexOf("twitter_backend_test") !== -1) {
				var output = document.getElementById("output");
				output.innerHTML = JSON.stringify(postData, null, 2);
			}
		},
		error: function( response ) {
			window.alert( "ERROR! Couldn't post a status to Twitter." );
		}
	});
}


/* Asynchronous list updating functions */

function embed_fallback( tweet ) {
	//Creates a hard-coded embed for a single tweet object
	var inner = '<blockquote class="twitter-tweet" data-lang="en"><p lang="da" dir="ltr">';
	inner += tweet.text + '</p>&mdash; ' + tweet.user.name + ' (@' + tweet.user.screen_name;
	inner += ') <a href="https://twitter.com/' + tweet.user.screen_name;
	inner += '/status/' + tweet.id + '">June 28, 2017</a></blockquote>';
	inner += '<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>';
	return {html: inner};
}

function embed_tweet( data, selector ) {
	if (data && selector && data.html)
		$( selector ).append( data.html );
}

function populate_timeline( data, selector ) {
	//Iterates through the timeline posts and creates them
	for (var i=0; i<data.length; i++) {
		//status_embed( data[i].user.screen_name, data[i].id, embed_tweet );
		embed_tweet( embed_fallback(data[i]), selector );
	}
}

function populate_home_timeline( data ) {
	populate_timeline( data, "#leftCol" );
}

function populate_user_timeline( data ) {
	populate_timeline( data, "#middleCol" );
}

function populate_notifications( data ) {
	//Iterates through the mentions timeline and creates a list
	for (var i=0; i<data.length; i++) {
		$("#rightCol").append( "<p>@"+data.source+" mentioned you in a a tweet!</p>" );
	}
}

function update_home_timeline() {
	const HOME_TIMER = 1000 * 60;
	console.log("Updating home timeline...");
	home_timeline( populate_home_timeline );
	window.setTimeout(update_home_timeline, HOME_TIMER);
}

function update_user_timeline() {
	const USER_TIMER = 1000 * 60;
	console.log("Updating user timeline...");
	user_timeline( populate_user_timeline );
	window.setTimeout(update_user_timeline, USER_TIMER);
}

function update_notifications() {
	const NOTIFICATION_TIMER = 1000 * 60;
	console.log("Updating notifications...");
	notifications( populate_notifications );
	window.setTimeout(update_notifications, NOTIFICATION_TIMER);
}

function update_page_init() {
	update_home_timeline();
	update_user_timeline();
	update_notifications();
}


/* Functions specifically for the Twitter debug page */

function debug_embed() {
	if (window.location.href.indexOf("twitter_backend_test") !== -1) {
			var content = document.getElementById("post_embed").value.replace(":\/\/","").split("\/");
			var user = content[1];
			var id = content[3];
			console.log("Getting tweet ID " + id + " from " + user);
			status_embed(user, id);
			twttr.createTweet(
				id,
				document.getElementById("embeds")
			).then(
				function (element) {
					alert("boop");
				}
			);
	}
}
