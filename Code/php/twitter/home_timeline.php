<?php
	session_start();

	require "../vendor/autoload.php";

	use Abraham\TwitterOAuth\TwitterOAuth;

	ini_set('html_errors', false);

	define("CONSUMER_KEY", "YVmiFGuc765fvT0Qr7wCohmiA");
	define("CONSUMER_SECRET", "01jWzh9eQqSGKi6DIPbVWnGtSgUq2OSfSCmvrDhE7RWVbeqQ6g");

	/*
	 * GET twitter/home_timeline.php
	 * Calls Twitter's statuses/home_timeline route and returns the next 100 posts
	 */
	function home_timeline() {
		try {
			$connection = new TwitterOAuth(
				CONSUMER_KEY,
				CONSUMER_SECRET,
				$_SESSION['twitter']['access_token'],
				$_SESSION['twitter']['access_token_secret']
			);
			if ( !isset($_SESSION['twitter']['home_timeline']) ) {
				$_SESSION['twitter']['home_timeline'] = [];
				$_SESSION['twitter']['home_timeline']['page'] = 1;
				$_SESSION['twitter']['home_timeline']['count'] = 64;
				//$_SESSION['twitter']['home_timeline']['max_id'] = 0;
			}
			$params = $_SESSION['twitter']['home_timeline'];
			$content = $connection->get("statuses/home_timeline", $params);
            //After making the call, we increment the counters
			$_SESSION['twitter']['home_timeline']['page'] += 1;
			//$_SESSION['twitter']['home_timeline']['max_id'] = 0;
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

	home_timeline();
?>