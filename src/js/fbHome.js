function statusChangeCallback(response) {
    if (response.status === 'connected') {
     getUserPosts();

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



function getUserPosts(){
     // Logged into your app and Facebook.
     FB.api(
        "/me/posts?limit=25",
        function(response) {
            if (response && !response.error) {
                posts = response.data
                for (var i = 0; i < posts.length; i++) {
                    
                    /*var index = 0
                    FB.api(
                        "/" + posts[i].id,
                        function (response2) {
                          if (response2 && !response2.error) {
                           // console.log(response.icon)
                            console.log(response2.privacy.value)
                            index ++;
                        }
                        else{
                            console.log(response2.error)
                        }
                    });
                    console.log(index)*/
                    id = posts[i].id.split("_")
                    var cntr = document.createElement("center")
                    var frm = document.createElement("iframe")


                    frm.setAttribute('src', "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2F" + id[0] + "%2Fposts%2F" + id[1] + "%2F&show_text=true&appId=1896793147252358")
                    frm.setAttribute('width', "95%")
                    frm.setAttribute('height', "500px")
                    frm.setAttribute('style', 'border:none;overflow:scroll')
                    frm.setAttribute('allowTransparency', false)

                    var element = document.getElementById("myPosts")
                    cntr.appendChild(frm)
                    element.appendChild(cntr)

                    console.log("written");
                }

            } else {
                console.log("Error")
            }

        });

         // Logged into your app and Facebook
         FB.api(
            "/me/tagged?limit=25",
           function(response) {
            if (response && !response.error) {
                posts = response.data
                for (var i = 0; i < posts.length; i++) {
                    id = posts[i].id.split("_")
                    var cntr = document.createElement("center")
                    var frm = document.createElement("iframe")


                    frm.setAttribute('src', "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2F" + id[0] + "%2Fposts%2F" + id[1] + "%2F&show_text=true&appId=1896793147252358")
                    frm.setAttribute('width', "95%")
                    frm.setAttribute('height', "500px")
                    frm.setAttribute('style', 'border:none;overflow:scroll')
                    frm.setAttribute('allowTransparency', false)

                    var element = document.getElementById("postsOfMe")
                    cntr.appendChild(frm)
                    element.appendChild(cntr)

                    console.log("written");
                }

            } else {
                console.log("Error")
            }

        });
     }