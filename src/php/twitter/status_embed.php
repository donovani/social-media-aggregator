<?php
	session_start();

	require "../vendor/autoload.php";

	use Abraham\TwitterOAuth\TwitterOAuth;

	ini_set('html_errors', false);

	define("CONSUMER_KEY", "YVmiFGuc765fvT0Qr7wCohmiA");
	define("CONSUMER_SECRET", "01jWzh9eQqSGKi6DIPbVWnGtSgUq2OSfSCmvrDhE7RWVbeqQ6g");

	/*
	 * GET twitter/get_user.php
	 * Calls Twitter's oauth/verify_credentials route and returns the user info
	 */
	function status_embed() {
		try {
			$connection = new TwitterOAuth(
				CONSUMER_KEY,
				CONSUMER_SECRET,
				$_SESSION['twitter']['access_token'],
				$_SESSION['twitter']['access_token_secret']
			);
			$post_body = file_get_contents('php://input');
			$embed = $connection->get("statuses/oembed", ["url" => $post_body]);
      $response = json_encode($embed);
			echo $response;
		}
		catch( Exception $e ) {
			//Prints out a simple error message if it failed.
			echo "{\"status\": \"error\", ";
			echo "\"error\": \"", $e->getMessage(), "\"}";
		}
	}

	status_embed();
?>
