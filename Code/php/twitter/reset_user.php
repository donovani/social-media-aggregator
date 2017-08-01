<?php
	session_start();

	ini_set('html_errors', false);

	/*
	 * GET twitter/reset_user.php
	 * Resets the ser profile page back to 0, so that auto-updates start properly
	 */
	function reset_user() {
		try {
			if ( isset($_SESSION['twitter']['user_timeline']) ) {
				$_SESSION['twitter']['user_timeline']['page'] = 0;
			}

		}
		catch( Exception $e ) {
			//Prints out a simple error message if it failed.
			echo "{\"status\": \"error\", ";
			echo "\"error\": \"", $e->getMessage(), "\"}";
		}
	}

	reset_user();
?>
