function statusChangeCallback(response) {
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();

    } else {
        //IF NOT LOGGED INTO OTHER SOCIAL MEDIA
        window.location = "index.html"
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId: '1896793147252358',
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse social plugins on this page
        version: 'v0.0.1' // use graph api version 2.8
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });

    FB.api(
        "/me/feed",
        function(response) {
            console.log("Response: " + response[0])
            if (response && !response.error) {
                for(var i=0; i < 5; i++){
                    console.log(response[i])
                }
            }
        }
    );
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI() {
    FB.api('/me', function(response) {
        console.log("Success")
    });
}