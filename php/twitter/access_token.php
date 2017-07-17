<?php
	session_start();

	require "../vendor/autoload.php";

	use Abraham\TwitterOAuth\TwitterOAuth;

	ini_set('html_errors', false);

	define("CONSUMER_KEY", "YVmiFGuc765fvT0Qr7wCohmiA");
	define("CONSUMER_SECRET", "01jWzh9eQqSGKi6DIPbVWnGtSgUq2OSfSCmvrDhE7RWVbeqQ6g");

	/*
	 * STEP 2: GET twitter/access_token.php
	 * Uses authorized Twitter request tokens to get the OAuth access tokens.
	 * Returns a URL to authorize the OAuth request token
	 */
	function access_token() {
		try {
			if ( isset($_SESSION) ) {
				$response = "{\"status\": \"ok\"";
				$connection = new TwitterOAuth(
					CONSUMER_KEY,
					CONSUMER_SECRET,
					$_SESSION['twitter']['request_token'],
					$_SESSION['twitter']['request_token_secret']
				);
				//If it has an authorized request token/secret, it tries to make an access token
				$access_token = $connection->oauth(
					"oauth/access_token",
					["oauth_verifier" => $_REQUEST['oauth_verifier']]
				);
				$_SESSION['twitter']['access_token'] = $access_token['oauth_token'];
      	$_SESSION['twitter']['access_token_secret'] = $access_token['oauth_token_secret'];
				$_SESSION['twitter']['username'] = $access_token['screen_name'];
				$_SESSION['twitter']['user_id'] = $access_token['user_id'];
				//Builds an authorization URL to send back to the frontend
				$response .= ", \"username\": \"" . $_SESSION['twitter']['username'] . "\"";
				$response .= ", \"user_id\": \"" . $_SESSION['twitter']['user_id'] . "\"";
				$response .= "}";
				//echo $response;
			}
			else {
				throw new Exception("no session found");
			}
		}
		catch( Exception $e ) {
			//Prints out a simple error message if it failed.
			//echo "{\"status\": \"error\", ";
			//echo "\"error\": \"", $e->getCode(), " - ", $e->getMessage(), "\"}";
			//echo "\n", $e->getTraceAsString();
		}

	}

	access_token();
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Redirecting...</title>
		<link rel="stylesheet" href="../../css/master.css">
		<link rel="stylesheet" href="../../css/token_callback.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		<script src="../../js/twitter/token_callback.js"></script>
	</head>
	<body onload="redirect()">
		<div class="redirect_area">

			<div id="redirect_text_area" class="redirect_layer">
					<div>
						<h1>Redirecting you to buddy-buddy...</h1>
					</div>
			</div>

			<div id="redirect_img_area" class="redirect_layer">
				<img id="redirect_img" src="../../img/">
			</div>

		</div>
	</body>
</html>
