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
			$post_body = file_get_contents('php://input');
			echo $post_body;
			$params = json_decode( $post_body, true );
			$content = $connection->post("statuses/update", $params);
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
