<?php
	session_start();

	require "../vendor/autoload.php";

	use Abraham\TwitterOAuth\TwitterOAuth;

	ini_set('html_errors', false);

	define("CONSUMER_KEY", "YVmiFGuc765fvT0Qr7wCohmiA");
	define("CONSUMER_SECRET", "01jWzh9eQqSGKi6DIPbVWnGtSgUq2OSfSCmvrDhE7RWVbeqQ6g");

	/*
	 * GET twitter/user_timeline.php
	 * Calls Twitter's statuses/user_timeline route and returns the next 16 posts on your timeline
	 */
	function user_timeline() {
		try {
			$connection = new TwitterOAuth(
				CONSUMER_KEY,
				CONSUMER_SECRET,
				$_SESSION['twitter']['access_token'],
				$_SESSION['twitter']['access_token_secret']
			);
			if ( !isset($_SESSION['twitter']['user_timeline']) ) {
				$_SESSION['twitter']['user_timeline'] = [];
				$_SESSION['twitter']['user_timeline']['page'] = 1;
				$_SESSION['twitter']['user_timeline']['count'] = 16;
				//$_SESSION['twitter']['user_timeline']['max_id'] = 0;
			}
			$params = $_SESSION['twitter']['user_timeline'];
			$content = $connection->get("statuses/user_timeline", $params);
            //After making the call, we increment the counters
			$_SESSION['twitter']['user_timeline']['page'] += 1;
			//$_SESSION['twitter']['user_timeline']['max_id'] = 0;
			//Lastly, we end by outputting the API results
			$response = json_encode($content);
			echo $response;
		}
		catch( Exception $e ) {
			//Prints out a simple error message if it failed.
			echo "{\"status\": \"error\", ";
			echo "\"error\": \"", $e->getMessage(), "\"}";
		}

	}

	user_timeline();
?>