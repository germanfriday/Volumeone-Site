jQuery(document).ready(function() {
	
	// init slideshow
	jQuery('#content div.slideshow').each(function() {
		
		var cur_slideshow = jQuery(this);
		
		// update slide count
		update_slide_count(cur_slideshow);
		
		// vertically center slides
		cur_slideshow.find('li').each(function() {
			var slideshow_height = cur_slideshow.height();
			var slide_height = jQuery(this).height();
			
			jQuery(this).css('top', (slideshow_height - slide_height) / 2);
		});

		// next button
		jQuery('#content .slideshow_controls a.next').click(function() {
			
			if (!jQuery(this).hasClass('disabled')) {
				
				var cur_slide = cur_slideshow.find('li.cur');
				var target_slide = cur_slide.next();
				
				if (cur_slideshow.find('li.slide div.video_container').length > 0) {
					kill_video(cur_slideshow, function() {
						scroll_slideshow(cur_slideshow, target_slide);
					});
					
				} else {
					scroll_slideshow(cur_slideshow, target_slide);
				}
				
			}
			return false;
		});
		
		// previous button
		jQuery('#content .slideshow_controls a.prev').click(function() {
			
			if (!jQuery(this).hasClass('disabled')) {
				
				var cur_slide = cur_slideshow.find('li.cur');
				var target_slide = cur_slide.prev();
				
				if (cur_slideshow.find('li.slide div.video_container').length > 0) {
					kill_video(cur_slideshow, function() {
						scroll_slideshow(cur_slideshow, target_slide);
					});
					
				} else {
					scroll_slideshow(cur_slideshow, target_slide);
				}
				
			}
			return false;
		});
		
		/* * * * * DISABLED * * * * */
		// slide nav
		/*jQuery(this).find('div.slide_nav span').click(function() {
			
			if (!jQuery(this).hasClass('cur')) {
				
				var nav_number = jQuery(this).attr('id').split('_')[1];
				var target_slide = cur_slideshow.find('li#slide_'+ nav_number);
				
				scroll_slideshow(cur_slideshow, target_slide);
				
			}
			
		});
		/* * * * * * * * * * * * * */
		
		// keyboard arrows
		jQuery(document).unbind('keydown').keydown(function(e){
			if (e.keyCode == 37) { // left arrow
				
				if (!jQuery('#content .slideshow_controls a.prev').hasClass('disabled')) {
					
					var cur_slide = cur_slideshow.find('li.cur');
					var target_slide = cur_slide.prev();

					if (cur_slideshow.find('li.slide div.video_container').length > 0) {
						kill_video(cur_slideshow, function() {
							scroll_slideshow(cur_slideshow, target_slide);
						});

					} else {
						scroll_slideshow(cur_slideshow, target_slide);
					}
				}
				return false;
				
			} else if (e.keyCode == 39) { // right arrow
				
				if (!jQuery('#content .slideshow_controls a.next').hasClass('disabled')) {
					
					var cur_slide = cur_slideshow.find('li.cur');
					var target_slide = cur_slide.next();

					if (cur_slideshow.find('li.slide div.video_container').length > 0) {
						kill_video(cur_slideshow, function() {
							scroll_slideshow(cur_slideshow, target_slide);
						});

					} else {
						scroll_slideshow(cur_slideshow, target_slide);
					}
				}
				return false;
			}
		});
		
		// click on image
		jQuery(this).find('li.slide').click(function() {
			
			if (jQuery(this).hasClass('cur') && jQuery(this).hasClass('video')) {
				
				var target_slide = jQuery(this);
				
				show_video(target_slide);
				
			}
			
		});
		
	});
	
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// FUNCTIONS

function scroll_slideshow(slideshow, target_slide) {
	
	if (target_slide.position().top != (slideshow.height() - target_slide.height()) / 2) {
		target_slide.css('top', (slideshow.height() - target_slide.height()) / 2);
	}
	
	slideshow.find('ul').stop().animate({
		left : -target_slide.position().left
	});
	
	// remove "cur" class from previous slide...
	slideshow.find('li.cur').removeClass('cur');
	// ...and add it to this slide
	target_slide.addClass('cur');
	
	// update scroll buttons
	update_scroll_buttons(slideshow, target_slide);
	
	// update slide count
	update_slide_count(slideshow);
	
	/* * * * * DISABLED * * * * */
	// update slideshow nav
	//update_slideshow_nav(target_slide);
	/* * * * * * * * * * * * * */
}

function update_scroll_buttons(slideshow, cur_slide) {
	
	var first_slide = slideshow.find('li:first');
	var last_slide = slideshow.find('li:last');
	
	// enable/disable prev and next buttons
	jQuery('#content .slideshow_controls a.prev, #content .slideshow_controls a.next').removeClass('disabled');
	
	if (cur_slide.attr('id') == first_slide.attr('id')) {
		// on first slide, disable previous arrow
		jQuery('#content .slideshow_controls a.prev').addClass('disabled');
		
	} else if (cur_slide.attr('id') == last_slide.attr('id')) {
		// on last slide, disabled
		jQuery('#content .slideshow_controls a.next').addClass('disabled');
	}
}

function update_slide_count(slideshow) {
	
	var total_slides = slideshow.find('li.slide').length;
	var cur_slide = slideshow.find('li.slide.cur').attr('id').split('_')[1];
	
	jQuery('#content .slideshow_controls span.cur').text(cur_slide)
		.siblings('span.total').text(total_slides);
	
}

function show_video(vid_slide) {
	
	if (vid_slide.find('div.video_container').length < 1) {
		// video is not currently loaded, so continue
		
		// find width and height of slide
		var slide_width = vid_slide.find('img').width();
		var slide_height = vid_slide.find('img').height();
		
		// insert video container
		vid_slide.prepend('<div class="video_container" style="position:absolute;left:'+ vid_slide.find('img').position().left +';width:'+ slide_width +'px;height:'+ slide_height +'px></div>');
		
		var vid_path = vid_slide.find('input.vid_file').val();
		
		var video_html = '<object width="'+ slide_width +'" height="'+ slide_height +'" classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab">';
		video_html +=		'<param name="src" value="'+ vid_path +'" />';
		video_html +=		'<param name="href" value="'+ vid_path +'" />';
		video_html +=		'<param name="target" value="myself" />';
		video_html +=		'<param name="controller" value="true" />';
		video_html +=		'<param name="autoplay" value="true" />';
		video_html +=		'<param name="scale" value="aspect" />';
		video_html +=		'<embed width="'+ slide_width +'" height="'+ slide_height +'" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/" src="'+ vid_path +'" href="'+ vid_path +'" target="myself" controller="true" autoplay="true" scale="aspect"></embed>';
		video_html +=	'</object>';
		
		// fade out image
		vid_slide.find('img').animate({
			opacity: 0
		}, 300, function() {
			// insert video html...
			vid_slide.find('div.video_container').html(video_html);

			// send image behind video
			jQuery(this).css('z-index', -10);
			
		});
		
	}
	
}

function kill_video(slideshow, callbackFunction) {
	
	var vid_container = slideshow.find('div.video_container');
	var vid_slide = vid_container.parent();
	
	vid_container.html('');
	
	vid_slide.find('img').css('z-index', 10)
		.animate({
			opacity: 1
		}, 100, function() {
			vid_container.remove();
			
			if (callbackFunction) {
				callbackFunction();
			}
		});
	
}
