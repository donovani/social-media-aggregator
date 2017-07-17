function statusChangeCallback(response) {
    if (response.status === 'connected') { //if the user is logged in to facebook
        getUserPosts(); //post the user's content

    } else {
        //IF NOT LOGGED INTO OTHER SOCIAL MEDIA
        window.location = "index.html"; //if not logged in, re-direct to the homepage
    }
}

function checkLoginState() { //see if we are logged in
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response); //handle the response
    });
}

window.fbAsyncInit = function() { //The Facebook SDK
    FB.init({
        appId: '1896793147252358', //SMA's App ID
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse social plugins on this page
        version: 'v0.0.1' // use graph api version 2.8
    });

    FB.getLoginStatus(function(response) { //see if we are logged in
        statusChangeCallback(response); //handle the response
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

function testAPI() { //check to see if the api is working as expected
    FB.api('/me', function(response) {
        console.log("Success");
    });
}


function clearUserPosts() { //removes all the user's existing posts
    newsfeed = document.getElementById("myPosts"); //get the user's feed element
    tagged = document.getElementById("postsOfMe"); //get the user's tagged element

    parent = newsfeed; //set the newsfeed as the parent
    posts = parent.children; //find all children
    while (posts.length > 1) { //loop through all the children
        parent.removeChild(posts[1]); //remove the child
    }

    parent = tagged; //set the tagged col as the parent
    posts = parent.children; //find all children
    while (posts.length > 1) { //loop through all the children
        parent.removeChild(posts[1]); //remove the child
    }
}

function getUserPosts() { //post the user's content
    clearUserPosts() //make sure there is nothing already there

    FB.api( //request the 100 latest user posts, and their privacy fields
        "/me/posts?limit=100", {
            fields: 'privacy'
        },
        function(response) {
            if (response && !response.error) { //make sure we got a proper response
                posts = response.data; //pull out the posts

                var index = 0;
                var unable = false;
                var skipped = 0;

                for (var i = 0; i < posts.length; i++) { //loop through all posts
                    if (index == 20) { //we only want 20 posts, if we reach that,
                        break; //stop searching
                    } else { //if we have lest than 20 posts
                        if (posts[i].privacy.value == "EVERYONE") { //if the post is public
                            index++; //we found another to post

                            postPost("myPosts", posts[i]); //post it!
                        } else { //otherwise
                            unable = true; //we were not able to post something
                            skipped++; //add one to the number of posts we needed to skip
                        }
                    }
                }

                if (unable) { //if we had to skip any
                    postErrorMsg("myPosts", skipped); //just let the user know!
                }

                checkUpdates(posts, "posts"); //check to see if there are any new posts

            } else { //we had an issue with the FB API request
                console.log("Error"); //print an error
            }

        });

    FB.api( //request the 100 latest posts the user is tagged in, and their privacy fields
        "/me/tagged?limit=100", {
            fields: 'privacy'
        },
        function(response) {
            if (response && !response.error) { //make sure we got a proper response
                posts = response.data; //pull out the posts

                var index = 0;
                var unable = false;
                var skipped = 0;

                for (var i = 0; i < posts.length; i++) { //loop through all posts
                    if (index == 20) { //we only want 20 posts, if we reach that,
                        break; //stop searching
                    } else { //if we have lest than 20 posts
                        if (posts[i].privacy.value == "EVERYONE") { //if the post is public
                            index++; //we found another to post

                            postPost("postsOfMe", posts[i]); //post it!
                        } else { //otherwise
                            unable = true; //we were not able to post something
                            skipped++; //add one to the number of posts we needed to skip
                        }
                    }
                }

                if (unable) { //if we had to skip any
                    postErrorMsg("postsOfMe", skipped); //just let the user know!
                }

                checkUpdates(posts, "tagged"); //check to see if there are any new posts

            } else { //we had an issue with the FB API request
                console.log("Error"); //print an error
            }

        });
}

function checkUpdates(recentPosts, type) { //check to see if there are any new posts
    loop = setInterval(function() { //create a function to run every x seconds
        FB.api( //request the 5 latest posts with the type value (posts/tagged), and their privacy fields
            "/me/" + type + "?limit=5", {
                fields: 'privacy'
            },
            function(response) { //handle the data
                if (response && !response.error) { //if the data is valid
                    posts = response.data; //pull the 5 posts out
                    for (var i = 0; i < posts.length; i++) { //loop through the posts
                        post = posts[i]; //grab the Ith post
                        if (post.privacy.value == "EVERYONE") { //if its public
                            var exists = false; //placeholder
                            for (var j = 0; j < recentPosts.length; j++) { //loop through all the existing posts
                                if (post.id == recentPosts[j].id) { //and see if it exists in them
                                    exists = true; //if it does let us know
                                    break; //and stop searching
                                }
                            }

                            if (!exists) { //if the value doesnt exist
                                clearInterval(loop); //stop looping
                                getUserPosts(); //refresh the user's screen, theve got new content!
                            }

                        } else { //the post isnt public so we cant post it anyways
                            //IGNORE IT
                        }
                    }

                } else { //there was an issue with facebook's APIs
                    console.log("Error");
                }

            });
    }, 30000); //every 30 seconds, repeat
}

function postPost(parent, post) { //generate the DOM element of a post
    id = post.id.split("_"); //grab the user id and post id

    var cntr = document.createElement("center"); //create a center object
    cntr.style = "padding-bottom: 10px;"; //give it some breathing room
    var frm = document.createElement("iframe"); //create a iframe for the post

    frm.setAttribute('src', "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2F" + id[0] + "%2Fposts%2F" + id[1] + "%2F&show_text=true&appId=1896793147252358"); //give it the post's url
    frm.setAttribute('width', "95%"); //make it so it has some breathing room on the side
    frm.setAttribute('height', "500px"); //set it to have a height that most posts use
    frm.setAttribute('style', 'border: 1px solid black;overflow:scroll;background-color:white;'); //give it a white background and a thin black border
    frm.setAttribute('allowTransparency', false); //no transparancy 

    var element = document.getElementById(parent); //get the parent (colum that it will be added to)
    cntr.appendChild(frm); //put the iframe in the center object
    element.appendChild(cntr); //add the center object to the column
}

function postErrorMsg(parent, skipped) { //handle an error message from skipped posts
    var element = document.getElementById(parent); //get the column to add the error to
    var cntr = document.createElement("center"); //create a center element
    var p = document.createElement("p"); //create a paragraph element
    p.style = "width:95%; height:100px;  border-top: 1px solid black; border-bottom: 1px solid black; background-color: white; padding:15px; padding-top:60px;"; //make the paragraph look good

    var text; //store the text to post in the error message
    if (parent == "myPosts") { //if it was a timeline post
        text = document.createTextNode("We were unable to display all your posts as some were not public!");
    } else { //if it was a tagged post
        text = document.createTextNode("We were unable to display all the post you are tagged in as some were not public!");
    }

    var text2 = document.createTextNode(skipped + " Posts were not included"); //add in how many posts were skipped
    p.appendChild(text); //add the error text to the paragraph
    p.appendChild(document.createElement("br")); //add a new line
    p.appendChild(text2); //add the skipped number to the paragraph
    cntr.appendChild(p); //add the paragraph to the center element
    element.appendChild(cntr); //add the center element to the column
}

function share() { //handles sharing text to facebook
    var text = document.getElementById("shareText").value //grab the text the user wanted to share

    FB.ui({ //popup the share dialog and put the user's text as a quote //NOTE: need a link for some reason, use Buddy-buddy's site for this when we set one up
        method: 'feed',
        link: "example.com",
        quote: text,
        display: 'popup',
    }, function(response) {});
}