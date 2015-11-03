/*
	Parallelism by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

var parallelism = (function($) { var _ = {

	/******************************/
	/* Properties                 */
	/******************************/

		// Settings
			settings: {

				// Popup overlay color.
					popupOverlayColor: '#1a1f2c',
				
				// Popup overlay opacity.
					popupOverlayOpacity: 0.75,

				// Mobile only.
				
					// If true, mobile mode will get some automatic styling.
						autoStyleMobile: true,
				
				// Desktop only.
					
					// If true, reel will be vertically centered.
						centerVertically: true,
					
					// Delay (in ms) before showing the reel.
						introDelay: 600,		
						
					// Speed (in ms) at which to fade in reel.
						introSpeed: 750,

					// Height (in px) of items.
						itemHeight:  window.innerHeight * 0.65,    

					// Default width (in px) of width.
						itemWidth: window.innerWidth - 5,
            
					// Margin (in px) to preserve at the bottom of the viewport.
						marginBottom: 0,
						
					// Margin (in px) to preserve at the top of the viewport.
						marginTop: 0,
					
					// Nudge the reel by this value (in px) after it's been vertically centered.
						verticalNudge: 10,
						
					// Maximum number of rows.
						maxRows: 3,
						
					// Minimum number of rows.
						minRows: 1,
						
					// Padding (in px) between items (0 = no padding).
						padding: 5,
						
					// Padding color.
						paddingColor: '#000',
						
					// If true, reel scroll will reset on page refresh.
						resetScroll: true,
						
					// Scales the scroll delta (1 = normal, 2 = double, 0.5 = half, etc.).
						scrollFactor: 1,
						
					// Scroll amount when using keys.
						scrollKeyAmount: 50,
						
					// Determines where scrollwheel events should be captured ('window' or 'reel').
						scrollWheelTarget: 'window',
						
					// Scroll amount when using scroll zones.
						scrollZoneAmount: 10,	
						
					// Time (in ms) to wait between scrolls when the cursor is in a scroll zone.
						scrollZoneDelay: 20,
						
					// Width of scroll zones.
						scrollZoneWidth: 40,
						
					// Delay (in ms) before showing thumbnails.
						thumbDelay: 1200,
						
					// Spread (in ms) to randomly stagger thumbnails (0 = don't stagger).
						thumbDelaySpread: 1500,
						
					// Speed (in ms) at which to fade in thumbnails.
						thumbSpeed: 750,
						
					// If true, page will blur slightly when the popup is displayed (webkit only).
						useBlurFilter: false,
						
					// If true, the left/right arrow keys will scroll the reel.
						useScrollKeys: true,
						
					// If true, moving the cursor to the leftmost/rightmost edges of the reel will scroll it.
						useScrollZones: true

			},
		
		// Touch device?
			isTouch: false,
		
		// IE version.
			IEVersion: 99,
		
		// Object cache.
			objects: {},

	/******************************/
	/* Methods                    */
	/******************************/

		// Initializes desktop mode.
			initDesktop: function() {

				var $SZ = $(''), $SZLeft, $SZRight;
					
				var	windowHeight = _.objects.window.height() - _.settings.marginTop - _.settings.marginBottom,
					windowWidth = _.objects.window.width(),
					itemHeight = _.settings.itemHeight,
					itemCount = _.objects.items.length,
					itemsWidth = 0,
					rows = 1,
					rowWidth,
					SZIntervalId;
				
				// Window.

					updateItems = function() {
						// Resize items inners
						_.objects.items.each(function(i) {
							var $item = $(this),
								$inner = $item.children('.inner');
								$image = $('img');
							$inner.css('font-size', '12pt');
							$inner.css('line-height', '1.75em');
							$inner.css('letter-spacing', '-0.05em');
							if(($inner.innerHeight()) > $item.innerHeight()){
								$item.children('.arrov').css('display', 'auto');
							} else {
								$item.children('.arrov').css('display', 'none');
							}
							//return false;
						});
						$('*').css('fontSize', function(i, fs){
						  if(parseInt(fs, 10) < 12 ) return this.style.fontSize = "1.25em";
						});
						return false;
					}

					updateFolding = function() {
						if ($unfolded == false) {
							_.objects.wrapper.css('height', window.innerHeight);
						} else {
							_.objects.wrapper.css('height', _.objects.main.outerHeight() + window.innerHeight*0.35);
						}
						
					}

					_.objects.window._parallelism_update = function() {
							updateFolding();
						// Resize items.
							_.objects.items.each(function(i) {
								var $item = $(this);
								$item.css('width', window.innerWidth-5);
								//$item.css('width', $('#navig').width()+10);
								if ($unfolded == false) {
									$item.css('height', (window.innerHeight*0.65) + (_.settings.padding * 2));
								}

							});
							updateItems();
							

						// Resize reel.
							_.objects.reel
                				.css('height', (window.innerHeight*0.65) + (_.settings.padding * 2))
                				.css('width', window.innerWidth*5-15);
                				//.css('width', $('#navig').width()*5-25);
						
						// Reposition main (if applicable).
							_.objects.main
								.css('height', (window.innerHeight*0.65) + (_.settings.padding * 2) + 5);
						
							if (_.settings.centerVertically)
								_.objects.main
									.css('top', '50%')
									.css('margin-top', (-1 * (_.objects.main.outerHeight() / 2)) + _.settings.verticalNudge);

						// Resize/reposition SZs.
							window.setTimeout(function() {	
								$SZ
									.css('height', _.objects.main.outerHeight())
									.css('top', _.objects.main.offset().top);
							
							}, _.settings.introDelay);

					};

					_.objects.window.resize(function() {
						
						// Update window dimensions.
							windowWidth = _.objects.window.width();
							windowHeight = _.objects.window.height() - _.settings.marginTop - _.settings.marginBottom;

						// Update reel items
							_.objects.window._parallelism_update();

						// Update scroll zones.
							$SZ._parallelism_update();
					});
					
				// Reel.
					_.objects.reel
						.css('overflow-y', 'hidden')
						.css('margin', '0 auto')
						.css('border', 'solid ' + _.settings.padding + 'px ' + _.settings.paddingColor)
						.css('box-shadow', '0 0 0 ' + _.settings.padding + 'px ' + _.settings.paddingColor);

					if (_.IEVersion < 9)
						_.objects.reel.show();
					else if (_.IEVersion < 10) {
						
						_.objects.reel.fadeTo(0,0.0001);

						window.setTimeout(function() {
							_.objects.reel.fadeTo(_.settings.introSpeed, 1);
						}, _.settings.introDelay);
					
					}
					else {
						
						_.objects.reel.css('opacity', 0);

						window.setTimeout(function() {
							_.objects.reel
								.h5u_xcss('transition', 'opacity ' + (_.settings.introSpeed / 1000.00) + 's ease-in-out')
								.css('opacity', 1);
						}, _.settings.introDelay);
					
					}

				// Items.
					_.objects.items
						.css('box-shadow', '0px 0px 0px ' + _.settings.padding + 'px ' + _.settings.paddingColor)
						.css('border', 'solid ' + _.settings.padding + 'px ' + _.settings.paddingColor);
					
					_.objects.items.each(function(i) {
						
						var	$item = $(this), $img = $item.find('img');
						var w, h;

						w = parseInt($item.data('width'));
						
						if (!w)
							//w = _.settings.itemWidth;
							w = window.innerWidth-5;

						h = window.innerHeight*0.65;
					
						// Add to total width.
							itemsWidth += w;

						// Item.
							$item
								.css('position', 'relative')
								.css('width', w)
								.css('height', h);
						
						// Image?
						
							if ($img.length > 0) {
								
								var $itemInner, $h2;
								
								// img.
									$img
										//.css('position', 'absolute')
										//.css('width', '100%')
										//.css('height', 'auto')
										//.css('min-height', '100%')
										//.css('top', 0)
										.css('right', 0)
										.attr('title', $item.text());
										
									//$img.attr('src', $img.attr('src'));
								
							}
					
					});

				// Main.
					if (_.isTouch)
						_.objects.main
							.css('overflow-x', 'auto')
							.css('overflow-y', 'hidden')
							.h5u_xcss('overflow-scrolling', 'touch');
					else
						_.objects.main.css('overflow', 'hidden');
				
				// Scrolling.

					updateNavigaton = function(){
						scrolled = _.objects.main.scrollLeft();
						//w = window.innerWidth-5;
						w = $("#reel").width()/5;
						itemID = Math.floor(scrolled / w);
						$("#navig > ul > li > a").removeClass("active_link");
						$('a[href="#nav_' + (itemID+1).toString() + '"]').addClass("active_link");
					};

					// Scroll Wheel.

						if (_.IEVersion < 9)
							_.objects.main.css('overflow-x', 'scroll');
						else {
							
							var scrollHandler = function(e) {
								var	delta = (e.detail ? e.detail * -10 : e.wheelDelta) * _.settings.scrollFactor;
								if($unfolded == false){
									_.objects.main.scrollLeft( _.objects.main.scrollLeft() - delta );
									$SZ._parallelism_update();
									e.preventDefault();
									e.stopPropagation();

									// Navigation
									updateNavigaton();
								}else{
									//_.objects.main.scrollTop( _.objects.main.scrollTop() - delta );
									$('#body').scrollTop( $('#body').scrollTop() - delta );
								}
								return false;
							};

							var st;
							
							if (_.settings.scrollWheelTarget == 'reel')
								st = _.objects.main[0];
							else
								st = _.objects.window[0];
								
							st.addEventListener('DOMMouseScroll', scrollHandler, false);
							st.addEventListener('mousewheel', scrollHandler, false);

						}
						
						if (_.settings.resetScroll)
							window.setTimeout(function() {
								_.objects.main.scrollLeft(0);
							}, 0);

					// Scroll Zones.
						if (!_.isTouch && _.settings.useScrollZones) {
							
							_.objects.body.append('<div class="SZRight" style="right: 0;" />');
							_.objects.body.append('<div class="SZLeft" style="left: 0;" />');
							
							$SZLeft = _.objects.body.children('.SZLeft');
							$SZRight = _.objects.body.children('.SZRight');
							$SZ = $SZLeft.add($SZRight);
							
							$SZ
								.css('position', 'fixed')
								.css('width', _.settings.scrollZoneWidth)
								.css('height', 100)
								.css('z-index', 100)
								.css('background', 'rgba(255,255,255,0)') // Required due to a weird IE bug (affects <=10)
								.css('top', 0);
								
							$SZ._parallelism_update = function() {
								
								if (_.objects.main.scrollLeft() == 0)
									$SZLeft.hide();
								else
									$SZLeft.show();
									
								//if (_.objects.main.scrollLeft() + $(window).width() >= _.objects.reel.outerWidth())
								if (_.objects.main.scrollLeft() + $(window).width() >= $('.item').outerWidth*5)
									$SZRight.hide();
								else
									$SZRight.show();

								// Navigation
								updateNavigaton();
								
							};
							
							$SZRight.bind('mouseenter', function(e) {
								
								if ($unfolded == false) {
									SZIntervalId = window.setInterval(function() {
										_.objects.main.scrollLeft( _.objects.main.scrollLeft() + (_.settings.scrollZoneAmount * _.settings.scrollFactor) );
										$SZ._parallelism_update();
									}, _.settings.scrollZoneDelay);
									return false;
								}
								
							});

							$SZLeft.bind('mouseenter', function(e) {
							
								if ($unfolded == false) {
									SZIntervalId = window.setInterval(function() {
										_.objects.main.scrollLeft( _.objects.main.scrollLeft() - (_.settings.scrollZoneAmount * _.settings.scrollFactor) );
										$SZ._parallelism_update();
									}, _.settings.scrollZoneDelay);
									return false;
								}

							});
							
							$SZ.bind('mouseleave', function(e) {
								window.clearInterval(SZIntervalId);
							});
						
						}
						else
							$SZ._parallelism_update = function() {};
					// Scroll Keys.
						if (_.settings.useScrollKeys) {
							
							_.objects.window.keydown(function(e) {
								if ($('.poptrox-popup').is(':visible'))
									return;
								if ($unfolded == false) {
									switch (e.keyCode)
									{
										case 39:
											window.clearInterval(SZIntervalId);
											_.objects.main.scrollLeft( _.objects.main.scrollLeft() + (_.settings.scrollZoneAmount * _.settings.scrollFactor) );
											$SZ._parallelism_update();
											return false;
											
										case 37:
											window.clearInterval(SZIntervalId);
											_.objects.main.scrollLeft( _.objects.main.scrollLeft() - (_.settings.scrollKeyAmount * _.settings.scrollFactor) );
											$SZ._parallelism_update();
											return false;
											
										default:
											break;
									}
								}
							});							
						
						}

					// Navigation

						for(lm in $('.nav_item')) {
							var navig = $(lm).attr("href");

							$(lm).click(function(e){
								if ($unfolded == true){
									scrolled = _.objects.main.scrollLeft();
									w = window.innerWidth-5;
									itemID = Math.floor(scrolled / w)+1;
									//$('#a'+$(e.target).attr("href")[4,5]).children().children().click();
									$('#a'+itemID).children().children().click();
									$(e.target).click();
								} else {
									$("#navig > ul > li > a").removeClass("active_link");
									$(e.target).addClass("active_link");
									scrolled = _.objects.main.scrollLeft();
									//w = window.innerWidth-5;
									w = $("#reel").width()/5;
									itemID = Math.floor(scrolled / w);
									navig = parseInt(e.target.href.substring(e.target.href.length-1,e.target.href.length));
									var toScroll = (navig - 1)*w;
									//_.objects.main.animate({scrollLeft: toScroll}, 1000);
									var $target = _.objects.main;
									$target.animate({scrollLeft: toScroll}, 1000);
									return false;
								}
							});
						}

					// Arrow

						$('.arrow').click(function(e) {
							//e.preventDefault();
							var $item = $(e.target).parent().parent().parent(),
								$inner = $item.children('.inner'),
								$arrow = $item.children('.arrov'),
								$scrollTarget = _.objects.main;
							
							dif = _.objects.wrapper.outerHeight() - $('#navig').outerHeight() - $('#footer').outerHeight();

							if ($unfolded == false) {
								w = window.innerWidth-5;
								pos = _.objects.main.css('top');
								navig = parseInt($arrow.attr('id').substring(1,2));

								$scrollTarget.animate({scrollLeft: (navig - 1)*w}, {
									duration: (($scrollTarget.scrollLeft() > (navig - 1)*w)) ? ($scrollTarget.scrollLeft() - (navig - 1)*w)*2 : ((navig - 1)*w - $scrollTarget.scrollLeft())*2,
									complete: function(){
										$unfolded = true;
										updateNavigaton();
										$(e.target).removeClass('fa-angle-double-down');
										$(e.target).addClass('fa-angle-double-up');
										$item.animate({height: 10 + $inner.outerHeight() + $(e.target).outerHeight() + 2*_.settings.padding}, {
											duration: 1000,
											queue: false,
											/*complete: function(){
												$item.css('height', 10 + $inner.outerHeight() + $(e.target).outerHeight() + 2*_.settings.padding);
												//$item.css('overflow', 'visible');
												//_.objects.wrapper.css('height', $item.innerHeight() + $('#navig').innerHeight() + $('#footer').innerHeight());
												//_.objects.main.css('height', $item.innerHeight() + $('#navig').innerHeight() + $('#footer').innerHeight());
												//_.objects.wrapper.css('overflow-y', 'visible');
												//_.objects.main.css('overflow-y', 'visible');
											//	return false;
											}*/
										});
										_.objects.reel.animate({height: 10 + $inner.outerHeight() + $(e.target).outerHeight() + 2*_.settings.padding}, {
											duration: 1000,
											queue: false
										});
										_.objects.main.animate({height: 10 + $inner.outerHeight() + $(e.target).outerHeight() + 3*_.settings.padding}, {
											duration: 1000,
											queue: false,
											complete: function(){
												_.objects.main.css('top', pos);
												$('#body').css('overflow-y', 'hidden');
												_.objects.wrapper.css('height', _.objects.main.outerHeight() + window.innerHeight*0.35);
											}
										});
										/*_.objects.wrapper.animate({height: $inner.outerHeight() + $(e.target).outerHeight() + 3*_.settings.padding + $('#navig').outerHeight() + $('#footer').outerHeight() + dif}, {
											duration: 1000,
											queue: false
										});*/
									}
								});

							} else {
								$unfolded = false;
								$(e.target).removeClass('fa-angle-double-up');
								$(e.target).addClass('fa-angle-double-down');
								$item.animate({height: (window.innerHeight*0.65) + (_.settings.padding * 2)}, {
											duration: 1000,
											queue: false,
											complete: function(){$item.css('overflow', 'hidden');}
										});
										_.objects.reel.animate({height: (window.innerHeight*0.65) + (_.settings.padding * 2)}, {
											duration: 1000,
											queue: false
										});
										_.objects.main.animate({height: (window.innerHeight*0.65) + (_.settings.padding * 3)}, {
											duration: 1000,
											queue: false
										});
										_.objects.wrapper.animate({height: window.innerHeight}, {
											duration: 1000,
											queue: false
										});
							}
							return false;
						})

				// Poptrox.
					_.objects.reel.poptrox({
						onPopupClose: (_.settings.useBlurFilter ? (function() { _.objects.wrapper.removeClass('overlayed'); }) : null),
						onPopupOpen: (_.settings.useBlurFilter ? (function() { _.objects.wrapper.addClass('overlayed'); }) : null),
						overlayColor: _.settings.popupOverlayColor,
						overlayOpacity: _.settings.popupOverlayOpacity,
						popupCloserText: '',
						popupLoaderText: '',
						selector: '.thumb a',
						usePopupCaption: true,
						usePopupCloser: false,
						usePopupDefaultStyling: false,
						usePopupNav: true
					});

				// Trigger resize event.
					_.objects.window.trigger('resize');	
			
			},

		// Initializes mobile mode.
			initMobile: function() {

				// Auto styling?
					if (_.settings.autoStyleMobile) {
						
						// Items.
							_.objects.items
								.css('border', 'solid ' + Math.ceil(_.settings.padding / 2) + 'px ' + _.settings.paddingColor);

							_.objects.items.filter('.thumb')
								.css('margin-top', (-1 * Math.ceil(_.settings.padding / 2)) + 'px')
								.filter(':nth-child(2n)')
									.css('border-right', 0);
							
					}

				// Items.
					_.objects.items.each(function() {
						
						var $item = $(this), $img = $item.find('img');
						
						$img
							.css('opacity', 1)
							.css('width', '100%')
							.css('height', 'auto');
						
						$item
							//.css('background-image', 'url("' + $img.attr('src') + '")')
							//.css('background-position', 'center center')
							//.css('background-size', 'cover');
							.css('height', '100%')
							.css('width', 'auto');
					});

				// Navigs.
					_.objects.navigs.each(function(i) {
						
						var $navig = $(this);
						$navig.attr("href", "#item"+i.toString())
						switch(i) {
							case 1:
								$navig.attr("class", "icon nav_item fa-smile-o")
								$navig.text("");
								break;
							case 2:
								$navig.attr("class", "icon nav_item fa-pencil")
								$navig.text("");
								break;
							case 3:
								$navig.attr("class", "icon nav_item fa-newspaper-o")
								$navig.text("");
								break;
							default:
								break;
						}

						
					});

				// Navigation

					for(lm in $('.nav_item')) {
						var navig = $(lm).attr("href");

						$(lm).click(function(e){
							$("#navig > ul > li > a").removeClass("active_link");
							$(e.target).addClass("active_link");
							var toScroll = $($(e.target).attr('href')).offset().top
							$("html, body").animate({scrollTop: toScroll}, 1000);
							return false;
						});
					}

					var scrollHandler = function(e) {
						scrolled = $("#body").scrollTop();
						if((scrolled >= ($("#body").height() - $(window).height())) || (scrolled > $("#item4").offset().top)) {
							$("#navig > ul > li > a").removeClass("active_link");
							$($("#navig > ul > li > a")[4]).addClass("active_link");
						} else if(scrolled > $("#item3").offset().top) {
							$("#navig > ul > li > a").removeClass("active_link");
							$($("#navig > ul > li > a")[3]).addClass("active_link");
						} else if(scrolled > $("#item2").offset().top) {
							$("#navig > ul > li > a").removeClass("active_link");
							$($("#navig > ul > li > a")[2]).addClass("active_link");
						} else if(scrolled > $("#item1").offset().top) {
							$("#navig > ul > li > a").removeClass("active_link");
							$($("#navig > ul > li > a")[1]).addClass("active_link");
						} else {
							$("#navig > ul > li > a").removeClass("active_link");
							$($("#navig > ul > li > a")[0]).addClass("active_link");
						}
						return false;
					};

					document.addEventListener('mousewheel', scrollHandler, false);
					document.addEventListener('touchmove', scrollHandler, false);

				// Poptrox.
					_.objects.reel.poptrox({
						onPopupClose: (_.settings.useBlurFilter ? (function() { _.objects.wrapper.removeClass('overlayed'); }) : null),
						onPopupOpen: (_.settings.useBlurFilter ? (function() { _.objects.wrapper.addClass('overlayed'); }) : null),
						overlayColor: _.settings.popupOverlayColor,
						overlayOpacity: _.settings.popupOverlayOpacity,
						popupSpeed: 0,
						selector: '.thumb a',
						useBodyOverflow: false,
						usePopupCaption: false,
						usePopupCloser: false,
						usePopupDefaultStyling: false,
						usePopupLoader: false,
						usePopupNav: false,
						windowMargin: 0
					});
			
			},

		// Main init method
			init: function() {

				// Skel.
					skel.init({
						reset: 'full',
						pollOnce: true,
						grid: { gutters: 5 },
						containers: '100%',
						breakpoints: {
							global: { range: '*', href: 'css/style.css' },
							desktop: { range: '737-', href: 'css/style-desktop.css', viewport: { width: 1280, scalable: false } },
							mobile: { range: '-736', href: 'css/style-mobile.css', viewport: { scalable: false } }
						}
					});
					
					_.isTouch = skel.vars.isTouch;
					_.IEVersion = skel.vars.IEVersion;

				// jQuery.
					$.fn.h5u_xcss = function(k, v) { 
						return $(this)
							.css('-webkit-' + k, v)
							.css('-moz-' + k, v)
							.css('-o-' + k, v)
							.css('-ms-' + k, v)
							.css(k, v);
					};

				$(function() {

					// Objects.
						_.objects.window = $(window),
						_.objects.wrapper = $('#wrapper'),
						_.objects.body = $('body'),
						_.objects.main = $('#main'),
						/* POUZIVAME */_.objects.reel = $('#reel'),
						_.objects.items = _.objects.main.find('.item'),
						_.objects.navigs = $('nav').find('.nav_item'),
						$unfolded = false;

					// Mode.

						if (skel.isActive('mobile'))
							_.initMobile();
						else {
							_.initDesktop();
							updateItems();
						}
						
				});

			}
			
}; return _; })(jQuery);

parallelism.init();