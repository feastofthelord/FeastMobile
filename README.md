# jQuery.youtubeChannel

jQuery plugin to retrieve and parse the feed for a youtube user's channel, displaying a list of thumbnails with title and number of views which link to the video itself

Usage:
~~~
	$('div').youtubeChannel({
		// username -or- query: required, username takes precedence over query
		username: 'default' | query: 'default',
		// startIndex: optional, must be >=1
		startIndex: 1,
		// maxResults: optional, defaults to 50
		maxResults: 10,
		// orderBy: optional, defaults to 'published'
		orderBy: 'relevance|published|viewCount|rating'
	});
~~~
