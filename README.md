# jQuery.youtubeChannel

jQuery plugin to retrieve and parse the feed for a youtube user's channel, displaying a list of thumbnails with title and number of views which link to the video itself

Usage:

```
	$('div').youtubeChannel({
		// username -or- query: required, username takes precedence over query
		username: 'default' | query: 'default',
		// startIndex: optional, must be >=1
		startIndex: 1,
		// maxResults: optional, defaults to 50
		maxResults: 10,
		// orderBy: optional, defaults to 'published'
		orderBy: 'relevance|published|viewCount|rating'
		// callback: optional function to execute when plugin is finished loading the videos
		callback: function(api) { ... }
	});

	/**
	 *  Details on the api object exposed to the callback function
	 */
	api.failed;			// set to true if no videos are loaded, otherwise false
	api.videoCount;		// number of videos actually loaded
	api.videos;			// array containing the loaded video objects
							//	id:			the video's id (youtube.com/watch?v=<id>)
							//	link:		url of video on youtube's site
							//	title:		video's title
							//	thumb:		url of video's thumbnail
							//	duration:	duration of video (in seconds)
							//	views:		number of views
							//	htmlId:		id of the html element within the plugin
	api.loadMore(num);	// function to load <num> more videos
						// (callback is executed again when loadMore finishes)

```
