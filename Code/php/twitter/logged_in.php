<?php
	session_start();

	require "../vendor/autoload.php";

	use Abraham\TwitterOAuth\TwitterOAuth;

	ini_set('html_errors', false);

	/*
	 * GET twitter/logged_in.php
	 * Simple check on $_SESSION to see whether the user is logged into Twitter.
	 */
	function logged_in() {
		try {
			//Returns a basic JSON response by the presence of twitter -> user_id
			$response = "{\"status\": \"ok\", \"signed_in\":";
			if ( isset($_SESSION['twitter']) && isset($_SESSION['twitter']['user_id']) ) {
				$response .= "true";
			}
			else {
				$response .= "false";
			}
			$response .= "}";
			echo $response;
		}
		catch( Exception $e ) {
			//Prints out a simple error message if it failed.
			echo "{\"status\": \"error\"}";
			echo "\"error\": \"", $e->getMessage(), "\"}";
		}

	}

	logged_in();
?>
