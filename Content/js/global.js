/*
Base Hotel: HTML Template by Klaye Morrison (http://klayemorrison.com)
*/

/******************** Document Ready ********************/

$(document).ready(function () {
	
	'use strict';
	
	// Desktop Detection - Applies '.hover' class to document if non-touch browser
	
	if (!('ontouchstart' in document.documentElement)) { document.documentElement.className += 'hover'; }
	
	/******************** Navigation & General Layout ********************/
		
	if ($(window).width() > 1024) {
		
		// Fix Header
		
		$(window).scroll(function() {
			if ($(window).scrollTop() > 0 && $(window).height() > 800) {
				$('#container, #nav').addClass('scroll');
			}
			else {
				$('#container, #nav').removeClass('scroll');
			}
		});
		
		// jQuery Tooltips
		
		$('#footer .social a, #content .floorplan, #menu .tag, #menu .title a').tooltip({
			track: true,
			show: { effect: "fade", delay:0 },
			hide: { effect: "fade", delay:0 }
		});
		
		// Fix Sidebar
		
		if ($('body').hasClass('layout-sidebar')){
			var scrolloffsetTop = 50;
			var scrolloffsetBumper = 120;
		}
		else {
			var scrolloffsetTop = 130;
			var scrolloffsetBumper = 200;
		}
		var contentheight = $('#left').height()+scrolloffsetTop;
		var scrollheight = $('#scroll').height()+scrolloffsetTop;
		
		$(window).scroll(function() {
            if (($(window).height() > scrollheight) && contentheight > scrollheight && ($(window).scrollTop() > $('#left').offset().top-scrolloffsetTop)) {
                
                $('#scroll').removeClass('relative'); $('#scroll').addClass('fixed');
                
                // Stop Fixed Sidebar
				
                var windw = this;
                $.fn.followTo = function (elem) {
                    var $this = this,
                    $window = $(windw),
                    $bumper = $(elem),
                    bumperPos = $bumper.offset().top,
                    thisHeight = $this.outerHeight(),
                    setPosition = function(){
                        if ($window.scrollTop() > (bumperPos - thisHeight -scrolloffsetBumper)) {
                            $this.addClass('absolute');
                        } else {
                            $this.removeClass('absolute');
                        }
                    };
                    $window.resize(function()
                    {
                        bumperPos = pos.offset().top;
                        thisHeight = $this.outerHeight();
                        setPosition();
                    });
                    setPosition();
                };
                $('#scroll').followTo('#extras');
            }
                        
            else {
                $('#scroll').removeClass('fixed'); $('#scroll').addClass('relative');
            }
        });
	}
		
	// Drop Downs
	
	$('#nav nav li').hover(
		function () {
			if ($(window).width() > 1024) {
				$(this).find('ul:first').stop().fadeIn(200)
			}
		}, 
		function () {
			if ($(window).width() > 1024) {
				$(this).find('ul:first').stop().fadeOut(200)
			}
		}
	);
	
	// Mobile Navigation
	
	var pull = $('#pull');
	var menu = $('#nav nav ul:first-child');
	var menuHeight = menu.height();

	$(pull).on('click', function(e) {
		e.preventDefault();
		menu.slideToggle(300);
	});
	
	// Active Navigation
	
    $('#nav nav li a').each(function () {
        if (this.href == window.location.href.split('#')[0]) {
            $(this).parent().addClass('active');
			$(this).parent().parent().parent().addClass('active');
			$(this).parent().parent().parent().parent().parent().addClass('active');
        }
	});
		
	// List Items Hover
	
	$('#specials.list .details, #rooms.list .details').hover(
		function () {
			$(this).parent().addClass('listhover');
		}, 
		function () {
			$(this).parent().removeClass('listhover');
		}
	);
	
	// FAQs
	
    $('#faqs .question').click(function () {
		$(this).parent().stop().toggleClass('reveal');
        $(this).parent().find('.answer').stop().toggle(350, 'easeInOutQuart');
    });
	
	/******************** Date Picker ********************/
	
	// Check Rates & Contact
	
	if ($(window).width() > 700) {
		$('#arrival, #contact-arrival').datepicker({
			minDate: '0M',
			numberOfMonths: 2,
			dateFormat: 'dd M yy',
			onSelect: function (dateText, inst) {
				$('#departure, #contact-departure').datepicker("option", "minDate", dateText);
			}
		});
		$('#departure, #contact-departure').datepicker({
			numberOfMonths: 2,
			minDate: 0,
			dateFormat: 'dd M yy'
		});
	}
	else {
		$('#arrival, #contact-arrival').datepicker({
			minDate: '0M',
			numberOfMonths: 1,
			dateFormat: 'dd M yy',
			onSelect: function (dateText, inst) {
				$('#departure, #contact-departure').datepicker("option", "minDate", dateText);
			}
		});
		$('#departure, #contact-departure').datepicker({
			numberOfMonths: 1,
			minDate: 0,
			dateFormat: 'dd M yy'
		});
	}
	
	// Reservations
	
	if ($(window).width() > 700) {
		$('#bookingdate').datepicker({
			minDate: '0M',
			numberOfMonths: 2,
			dateFormat: 'dd MM yy'
		});
	}
	else {
		$('#bookingdate').datepicker({
			minDate: '0M',
			numberOfMonths: 1,
			dateFormat: 'dd MM yy'
		});
	}
	
	/******************** Select Boxes ********************/
	
	if ($(window).width() > 1024) {
		$('#check select').selectBoxIt({
			showEffect: 'fadeIn',
			showEffectSpeed: 200,
			hideEffect: 'fadeOut',
			hideEffectSpeed: 200
		});
	}
	
	/******************** Caroufredsel ********************/
	
	// Featured Slider
	
	if ($('#featured .slider').length) {
		$('#featured .slider').carouFredSel({
			responsive: true,
			align: false,
			swipe: true,
			scroll: {
				fx: 'crossfade',
				pauseOnHover: true,
				duration: 600,
				onBefore: function(data) {
					data.items.visible.find('.title, .buttoncontainer').hide();
					data.items.visible.each(function(i) {
						$(this).find('.title').delay(600).fadeIn(900);
						$(this).find('.buttoncontainer').delay(750).fadeIn(900);
					});
				}
			},
			items: {
				visible: 1,
				height: 'variable'
			},
			auto: { timeoutDuration: 4000 },
			prev: { button: '#featured .prev', key: 'left' },
			next: { button: '#featured .next', key: 'right' }
		});
	}
	
	// Gallery Slider
	
	var galleryslider = function() {
		$('#galleryslider .slider').carouFredSel({
			width: '100%',
			height: 450,
			align: false,
			swipe: true,
			scroll: {
				pauseOnHover: true,
				easing: 'easeInOutQuart',
				duration: 600
			},
			items: {
				visible: 1,
				width: 'variable',
				height: '450'
			},
			auto: { timeoutDuration: 4000 },
			prev: { button: '#galleryslider .prev' },
			next: { button: '#galleryslider .next' }
		});
	};
	
	if ($('#galleryslider').hasClass('manual')){
		galleryslider();
	}
	else {
		var gallery = 'gallery.html #gallery figure:lt(7) img';
		$('#galleryslider .slider').load(gallery, function() {
			
			galleryslider();
			
			// Lazy Load
			
			$('#galleryslider .slider').find('img').lazyload({
				effect: 'fadeIn',
				threshold: 50000,
				effectspeed: 200,
				load : function() {
					$(window).trigger('resize');
				}
			});
		});
	}
	
	// List Items (Specials Slider)
	
	if ($('#specials .slider').length) {
		$('#specials .slider').carouFredSel({
			responsive: true,
			align: false,
			swipe: true,
			scroll: {
				fx: 'crossfade',
				pauseOnHover: true,
				duration: 600
			},
			items: {
				visible: 1,
				height: 'variable'
			},
			pagination: { container: '#specials .nav' }
		});
	}
	
	// Slideshow
	
	if ($('#slideshow .slider').length) {
		$($('#slideshow .slider')).carouFredSel({
			responsive: true,
			align: false,
			swipe: true,
			scroll: {
				fx: 'crossfade',
				pauseOnHover: true,
				duration: 600
			},
			items: {
				visible: 1,
				height: 'variable'
			},
			auto: { timeoutDuration: 4000 },
			prev: { button: '#slideshow .prev', key: 'left' },
			next: { button: '#slideshow .next', key: 'right' }
		});
		
		if($('#slideshow .slider img').length == 1)
		{
		   $('#slideshow .nav').hide();
		}
	}
	
	/******************** Photo Gallery ********************/
	
	// Isotope
	
	var $container = $('#gallery'),
	colWidth = function () {
		var w = $container.width(),
		columnNum = 4,
		columnWidth = 0,
		sizeVar = 0;
		if (w > 1150) { columnNum  = 4; }
		else if (w > 770) { columnNum  = 3; }
		else { columnNum  = 2; }
		columnWidth = Math.floor(w/columnNum);
		function columnSize() {
			if (w < 340) { sizeVar = 25; }
			else if (w < 500) { sizeVar = 40; }
			else if (w < 640) { sizeVar = 50; }
			else if (w < 770) { sizeVar = 60; }
			else if (w < 1024) { sizeVar = 50; }
			else if (w < 1200) { sizeVar = 60; }
			else if (w < 1400) { sizeVar = 52; }
			else { sizeVar = 64; }
			$container.find('figure').each(function() {
				var $item = $(this),
				multiplier_w = $item.attr('class').match(/item-w(\d)/),
				multiplier_h = $item.attr('class').match(/item-h(\d)/),
				width = multiplier_w ? columnWidth*multiplier_w[1] : columnWidth,
				height = multiplier_h ? columnWidth*multiplier_h[1]*0.75-sizeVar : columnWidth*0.75-(sizeVar/2);
				$item.css({
					width: width,
					height: height
				});
			});
		}
		columnSize();
		return columnWidth;
	};

	
	function runisotope() {
		$container.isotope({
			layoutMode: 'packery',
			itemSelector: 'figure',
			transitionDuration: '0',
			resizable: false,
			masonry: {
				columnWidth: colWidth()
			}
		});
	}

	runisotope();
	
	$(window).resize(function() {
		runisotope();
    })
	
	/******************** Lazy Load ********************/
	
	$('#gallery figure img').lazyload({
		effect: 'fadeIn',
		failure_limit: 10,
		effectspeed: 300
	});
	
	/******************** Colorbox ********************/
	
    $('#gallery figure a').colorbox({
        opacity: '.9',
        maxWidth: '86%',
        maxHeight: '94%',
        transition: 'none',
        fadeOut: 300,
        initialWidth: 0,
        initialHeight: 0,
        returnFocus: false,
		rel: 'group',
        fixed: true,
        title: function() {
            var domain = document.URL;
			var url = $(this).find('img')[0].src;
            var title = $(this).find('span').html();
			var pinclone = $(this).find('span').clone();
			var pintitle = pinclone.text();
            return title+'<a href="http://www.pinterest.com/pin/create/button/?url='+domain+'&media='+url+'&description='+pintitle+'" target="_blank" data-pin-do="buttonPin" data-pin-config="beside" class="pinit"></a>';
        }
    });
	
	if ($(window).width() > 460) {
		$('#testimonialpop').colorbox({
			iframe:true,
			opacity: '.6',
			transition: 'fade',
			innerWidth: 450,
			innerHeight: 615,
			fixed: true,
			onLoad: function() {
				$('#colorbox').addClass('formpopper');
				$('#cboxClose').remove();
			}
		});
		$('.commentpop').colorbox({
			iframe:true,
			opacity: '.6',
			transition: 'fade',
			innerWidth: 450,
			innerHeight: 415,
			fixed: true,
			onLoad: function() {
				$('#colorbox').addClass('formpopper');
				$('#cboxClose').remove();
			}
		});
	}
	
	/******************** Promo Popup ********************/
	
	// Example (open on click)
	
	$('.promopopup').click(function() {
		$('#pop').fadeIn(600, 'easeInOutQuart');
	});
	$('.closepop').click(function() {
		$('#pop').fadeOut(600, 'easeInOutQuart');
	});
	
	// Use Cookies (open on load, don't open again for 30 days)
	
	/*var visited = $.cookie('visited');
	if ($.cookie(visited)) {
		if ($.cookie('popit') == null) {
		$.cookie('popit', 'yes', { expires: 30, path: '/' });
		$('#pop').delay(1000).fadeIn(600, 'easeInOutQuart');
		$('.closepop').click(function() {
			$('#pop').fadeOut(600, 'easeInOutQuart');
		});
	}
	} else {
		visited++;
		$.cookie('visited', visited, {
			expires: 30
		});
	}*/
});

/******************** Window Load ********************/
$(window).load(function () {
	
	'use strict';
	
	// Fixes slider loading issues in some browsers
	
	$(window).trigger('resize');
	
	// Testimonials
	
	$('#testimonials').isotope({
		layoutMode: 'packery',
		itemSelector: 'figure',
		transitionDuration: '0',
		resizable: false
	});
	
	// Instagram Feed
	
	/*$.ajax({
		type: "GET",
		dataType: "jsonp",
		cache: false,
		url: "https://api.instagram.com/v1/users/XXXX/media/recent/?access_token=XXXX",
		success: function(data) {
			for (var i = 0; i < 6; i++) {
				$("#instagram #feed").append("<img src='" + data.data[i].images.low_resolution.url +"' />");   
			}
		}
	});*/
	
	// Refreshes browser when resizing between desktop and tablet. Not necessary, but handy for responsive testing as different JS is being loaded.
	
	if ($(window).width() > 1024) { var browsersize = 'desktop'; }
	else { var browsersize = 'tablet'; }
	$(window).resize(function() {
		if ($(window).width() > 1024) {
			if (browsersize == 'tablet') { location.href = location.href }
		}
		else {
			if (browsersize == 'desktop') { location.href = location.href }
		}
	});
});