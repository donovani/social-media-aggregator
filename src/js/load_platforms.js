var platforms = [
	{
		name: "Facebook",
		svg: "img/facebook.svg",
		color: "#3b5998",
		accent: "#",
		site: "https://www.facebook.com",
		enabled: true
	},
	{
		name: "Twitter",
		svg: "img/twitter.svg",
		color: "#1da1f2",
		accent: "#",
		site: "https://www.twitter.com",
		enabled: true
	},
	{
		name: "Instagram",
		svg: "img/instagram.svg",
		color: "#e4405f",
		accent: "#",
		site: "https://www.instagram.com",
		enabled: false
	},
	{
		name: "Tumblr",
		svg: "img/tumblr.svg",
		color: "#36465d",
		accent: "#",
		site: "https://www.tumblr.com",
		enabled: false
	},
	{
		name: "Reddit",
		svg: "img/reddit.svg",
		color: "#ff4500",
		accent: "#",
		site: "https://www.reddit.com",
		enabled: false
	},
	{
		name: "SoundCloud",
		svg: "img/soundcloud.svg",
		color: "#ff3300",
		accent: "#",
		site: "https://www.soundcloud.com",
		enabled: false
	},
	{
		name: "LinkedIn",
		svg: "img/linkedin.svg",
		color: "#0077b5",
		accent: "#",
		site: "https://www.linkedin.com",
		enabled: false
	},
	{
		name: "Google+",
		svg: "img/googleplus.svg",
		color: "#dc4e41",
		accent: "#",
		site: "https://plus.google.com",
		enabled: false
	},
	{
		name: "myspace",
		svg: "img/myspace.svg",
		color: "#030303",
		accent: "#",
		site: "https://www.myspace.com",
		enabled: false
	},
	{
		name: "SnapChat",
		svg: "img/snapchat.svg",
		color: "#fffc00",
		accent: "#",
		site: "https://www.snapchat.com",
		enabled: false
	},
]

function load_icons() {
	var p = $.getJSON("json/platforms.json", "");
	console.log(p)
	var list = $("#platforms_list")
	for (var i=0; i<platforms.length; i++) {
		var icon = $.load("html/platform_icon.html")
		list.append(icon)
		console.log(platforms[i].name);

	}
}
