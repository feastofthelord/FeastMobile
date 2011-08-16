
(function(){
	$.fn.youtubeChannel = function(settings) {
		var version = '0.1',
			$ytEl = $(this),
			$ytList = $('<ul/>',{class:'yt-channel-list'});
			options = $.extend({}, {username:'',startIndex:1,maxResults:10}, settings);
		var dataUrl = 'https://gdata.youtube.com/feeds/api/videos?author='+options.username+'&orderby=published&alt=json&start-index='+options.startIndex+'&max-results='+options.maxResults;
		var videos = [];
		// accessory functions
		var parseTime = function(secs) {
			var m,s = parseInt(secs,10);
			m = Math.floor(s / 60);
			s -= (m * 60);
			return m+':'+s;
		};
		// setup the html
		$ytEl.addClass('yt-channel-holder');
		$ytList.appendTo($ytEl);
		// parse the feed
		$.getJSON(dataUrl,function(data) {
			// add the header
			$('<li/>',{class:'yt-channel-title'}).html(options.username).appendTo($ytList);
			// add the items
			for (var i=data.feed.entry.length-1; i>=0; i--) {
				var e = data.feed.entry[i],
					h = {},
					vid = {
						title:		e.media$group.media$title.$t,
						views:		e.yt$statistics.viewCount,
						duration:	parseTime(e.media$group.yt$duration.seconds),
						thumb:		e.media$group.media$thumbnail[1].url,
						link:		e.media$group.media$player[0].url,
						published:	new Date(Date.parse(e.published.$t))
					};
				h.li = $('<li/>',{class:'yt-channel-video'});
				h.a = $('<a target="_blank" href="'+vid.link+'"/>');
				h.thumb = $('<span/>',{class:'thumb-wrap'}).html('<img class="vid-thumb" alt="" src="'+vid.thumb+'"/><span class="vid-duration">'+vid.duration+'</span>');
				h.div = $('<div/>',{class:'vid-details'}).html('<span class="vid-title">'+vid.title+'</span><span class="vid-views">'+vid.views+' views</span>');
				h.thumb.appendTo(h.a);
				h.div.appendTo(h.a);
				h.a.appendTo(h.li);
				h.li.appendTo($ytList);
			}
			// finally add the copyright notice
			$('<li/>',{class:'yt-channel-copy'}).html('v'+version+'&copy; dharyk 2011').appendTo($ytList);
		});
		return this;
	};
})(jQuery);