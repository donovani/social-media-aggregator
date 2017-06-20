<?php
	session_start();

	require "../vendor/autoload.php";

	use Abraham\TwitterOAuth\TwitterOAuth;

	ini_set('html_errors', false);

	define("CONSUMER_KEY", "YVmiFGuc765fvT0Qr7wCohmiA");
	define("CONSUMER_SECRET", "01jWzh9eQqSGKi6DIPbVWnGtSgUq2OSfSCmvrDhE7RWVbeqQ6g");

	/*
	 * STEP 1: GET twitter/request_token.php
	 * Calls Twitter's oauth/request_token route and saved them to $_SESSION
	 * Returns a URL to authorize the OAuth request token
	 */
	function request_token() {
		try {
			//Starts composing the request token stuff
			$response = "{\"status\": \"ok\"";
			$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);
			//First, it generates a request token and provides the
			$request_token = $connection->oauth(
				"oauth/request_token",
				["oauth_callback" => "http://localhost/php/twitter/access_token.php"]
			);
			$_SESSION['twitter'] = [];
			$_SESSION['twitter']['request_token'] = $request_token['oauth_token'];
      $_SESSION['twitter']['request_token_secret'] = $request_token['oauth_token_secret'];
			//Builds an authorization URL to send back to the frontend
      $url = $connection->url('oauth/authorize', ['oauth_token' => $request_token['oauth_token']]);
			$response .= ", \"auth_url\": \"" . $url . "\"";
			$response .= "}";
			echo $response;
		}
		catch( Exception $e ) {
			//Prints out a simple error message if it failed.
			echo "{\"status\": \"error\", ";
			echo "\"error\": \"", $e->getMessage(), "\"}";
		}

	}

	request_token();
?>
