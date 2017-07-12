function statusChangeCallback(response) {
    if (response.status === 'connected') {
        getUserPosts();

    } else {
        //IF NOT LOGGED INTO OTHER SOCIAL MEDIA
        window.location = "index.html";
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
        console.log("Success");
    });
}


function clearUserPosts(){
    newsfeed = document.getElementById("myPosts")
    tagged = document.getElementById("postsOfMe")

    parent = newsfeed
    posts = parent.children
    while(posts.length > 1){
        parent.removeChild(posts[1])
    }

    parent = tagged
    posts = parent.children
    while(posts.length > 1){
        parent.removeChild(posts[1])
    }
}

function getUserPosts() {
    // Logged into your app and Facebook.

    clearUserPosts()

    FB.api(
        "/me/posts?limit=100", {
            fields: 'privacy'
        },
        function(response) {
            if (response && !response.error) {
                posts = response.data;

                var index = 0;
                var unable = false;
                var skipped = 0;

                for (var i = 0; i < posts.length; i++) {
                    if (index == 20) {
                        break;
                    } else {
                        if (posts[i].privacy.value == "EVERYONE") {
                            index++;

                            postPost("myPosts", posts[i]);
                        } else {
                            unable = true;
                            skipped++;
                        }
                    }
                }

                if (unable) {
                    postErrorMsg("myPosts", skipped);
                }

                checkUpdates(posts, "posts")

            } else {
                console.log("Error");
            }

        });

    FB.api(
        "/me/tagged?limit=100", {
            fields: 'privacy'
        },
        function(response) {
            if (response && !response.error) {
                posts = response.data;

                var index = 0;
                var unable = false;
                var skipped = 0;

                for (var i = 0; i < posts.length; i++) {
                    if (index == 20) {
                        break;
                    } else {
                        if (posts[i].privacy.value == "EVERYONE") {
                            index++;

                            postPost("postsOfMe", posts[i]);
                        } else {
                            unable = true;
                            skipped++;
                        }
                    }
                }

                if (unable) {
                    postErrorMsg("postsOfMe", skipped);
                }
                checkUpdates(posts, "tagged")
            } else {
                console.log("Error");
            }

        });
}

function checkUpdates(recentPosts, type){
    loop = setInterval(function(){
        FB.api(
        "/me/"+type+"?limit=5", {
            fields: 'privacy'
        },
        function(response) {
            if (response && !response.error) {
                posts = response.data;
                for(var i = 0; i < posts.length; i ++){
                    post = posts[i]
                    if(post.privacy.value == "EVERYONE"){
                        var exists = false
                        for(var j = 0; j < recentPosts.length; j++){
                            if(post.id == recentPosts[j].id){
                                exists = true;
                                break;
                            }
                        }

                       if(!exists){
                        clearInterval(loop)
                        getUserPosts()
                       }

                    }
                    else{
                        //IGNORE IT
                    }
                }
                
            } else {
                console.log("Error");
            }

        });
    }, 30000);
}

function postPost(parent, post) {
    id = post.id.split("_");
    var cntr = document.createElement("center");
    cntr.style = "padding-bottom: 10px;";
    var frm = document.createElement("iframe");


    frm.setAttribute('src', "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2F" + id[0] + "%2Fposts%2F" + id[1] + "%2F&show_text=true&appId=1896793147252358");
    frm.setAttribute('width', "95%");
    frm.setAttribute('height', "500px");
    frm.setAttribute('style', 'border: 1px solid black;overflow:scroll;background-color:white;');
    frm.setAttribute('allowTransparency', false);

    var element = document.getElementById(parent);
    cntr.appendChild(frm);
    element.appendChild(cntr);
}

function postErrorMsg(parent, skipped) {
    var element = document.getElementById(parent);
    var cntr = document.createElement("center");
    var p = document.createElement("p");
    p.style = "width:95%; height:100px;  border-top: 1px solid black; border-bottom: 1px solid black; background-color: white; padding:15px; padding-top:60px;";

    var text;
    if (parent == "myPosts") {
        text = document.createTextNode("We were unable to display all your posts as some were not public!");
    } else {
        text = document.createTextNode("We were unable to display all the post you are tagged in as some were not public!");
    }

    var text2 = document.createTextNode(skipped + " Posts were not included");
    p.appendChild(text);
    p.appendChild(document.createElement("br"));
    p.appendChild(text2);
    cntr.appendChild(p);
    element.appendChild(cntr);
}

function share(){
    var text = document.getElementById("shareText").value

    FB.ui({
        method: 'feed',
        link: "example.com",
        quote: text,
        display: 'popup',
    }, function(response){});
}