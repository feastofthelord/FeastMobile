
;(function(){
	$.fn.youtubeChannel = function(settings) {
		var version	= {major:0,minor:3,build:0},
			$ytEl	= $(this),
			$ytList	= $('<ul/>',{class:'yt-channel-list'});
			options	= $.extend({}, {username:'',query:'',startIndex:1,maxResults:10}, settings),
			videos	= [],
			getVersion	= function() {
				return [version.major,version.minor,version.build].join('.');
			},
			buildUrl	= function() {
				var base	= 'https://gdata.youtube.com/feeds/api/videos',
					params	= ['alt=json','orderby=published'];
				if (options.username!=='') {
					params.push('author='+options.username);
				}
				else if (options.query!=='') {
					params.push('q='+encodeURIComponent(options.query));
				}
				else return base;
				params.push('start-index='+options.startIndex);
				params.push('max-results='+options.maxResults);
				return base+'?'+params.join('&');
			},
		// accessory functions
			parseTime	= function(secs) {
				var m,s = parseInt(secs,10);
				m = Math.floor(s / 60);
				s -= (m * 60);
				return m+':'+s;
			};
		// setup the html
		$ytEl.addClass('yt-channel-holder');
		$ytList.appendTo($ytEl);
		// parse the feed
		$.getJSON(buildUrl(),function(data) {
			// add the header
			$('<li/>',{class:'yt-channel-title'}).html(['<a href="http://www.youtube.com/user/',options.username,'" target="_blank">',options.username,'</a>'].join('')).appendTo($ytList);
			// add the items
			for (var i=0; i<data.feed.entry.length; i++) {
				var html,e = data.feed.entry[i];
				html = $('<li/>',{class:'yt-channel-video'})
						.html([
							'<a target="_blank" href="',e.media$group.media$player[0].url,'">',
								'<span class="thumb-wrap">',
									'<img class="vid-thumb" alt="',e.media$group.media$title.$t,'" src="',e.media$group.media$thumbnail[1].url,'"/>',
									'<span class="vid-duration">',parseTime(e.media$group.yt$duration.seconds),'</span>',
								'</span>',
								'<div class="vid-details">',
									'<span class="vid-title">',e.media$group.media$title.$t,'</span>',
									'<span class="vid-views">',e.yt$statistics.viewCount,' views</span>',
								'</div>',
							'</a>'
						].join(''));
				html.appendTo($ytList);
			}
			// finally add the copyright notice
			$('<li/>',{class:'yt-channel-copy'}).html('v'+getVersion()+' &copy; dharyk 2011').appendTo($ytList);
		});
		return this;
	};
})(jQuery);