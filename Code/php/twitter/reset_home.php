<?php
	session_start();

	ini_set('html_errors', false);

	/*
	 * GET twitter/reset_home.php
	 * Resets the home page back to 0, so that auto-updates start properly
	 */
	function reset_home() {
		try {
			if ( isset($_SESSION['twitter']['home_timeline']) ) {
				$_SESSION['twitter']['home_timeline']['page'] = 0;
			}
		}
		catch( Exception $e ) {
			//Prints out a simple error message if it failed.
			echo "{\"status\": \"error\", ";
			echo "\"error\": \"", $e->getMessage(), "\"}";
		}
	}

	reset_home();
?>
