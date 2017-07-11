function logged_in() {
	$.ajax({
		type: "GET",
		contentType: "application/json",
		url: "../../php/twitter/logged_in.php",
		complete: function( response ) {
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
			console.log( "GET twitter/user_credentials: " + response );
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

function notifications() {
	$.ajax({
		type: "GET",
		contentType: "application/text",
		url: "../../php/twitter/notifications.php",
		success: function( response ) {
			console.log( "GET twitter/notifications: " + response );
			var notifData = JSON.parse( response );
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

function home_timeline() {
	$.ajax({
		type: "GET",
		contentType: "application/text",
		url: "../../php/twitter/home_timeline.php",
		success: function( response ) {
			console.log( "GET twitter/home_timeline: " + response );
			var homeData = JSON.parse( response );
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
			console.log( "GET twitter/user_timeline: " + response );
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

function status_embed( username, tweetID ) {
	$.ajax({
		type: "POST",
		contentType: "application/text",
		url: "../../php/twitter/status_embed.php",
		data: encodeURI( "https://twitter.com/" + username + "/status/" + tweetID ),
		success: function( response ) {
			console.log( "POST twitter/status_embed: " + response );
			var embedData = JSON.parse( response );
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


function populate_user_timeline( data, args ) {
	//Iterates through the timeline posts and creates them
	for (var i=0; i<data.length; i++) {

	}
	$("#middleCol").append(  );
}

function update_home_timeline() {
	const HOME_TIMER = 1000 * 60;
	console.log("Updating home timeline...");

	window.setTimeout(update_home_timeline, HOME_TIMER);
}

function update_user_timeline() {
	const USER_TIMER = 1000 * 60;
	console.log("Updating user timeline...");
	user_timeline( populate_user_timeline ) );
	window.setTimeout(update_user_timeline, USER_TIMER);
}

function update_notifications() {
	const NOTIFICATION_TIMER = 1000 * 60;
	console.log("Updating notifications...");

	window.setTimeout(update_notifications, NOTIFICATION_TIMER);
}

function update_page_init() {
	update_home_timeline();
	update_user_timeline();
	update_notifications();
}


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
