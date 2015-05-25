/////////////////////////////////////////////////////////////////////////////////////////////
// Custom JS (ADD YOUR JS HERE!)
/////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	$('body').append('<div id="toTop"><i class="icon-chevron-up fa fa-chevron-up"></i></div>');
	$(window).scroll(function(){if($(this).scrollTop()!=0){$('#toTop').fadeIn()}else{$('#toTop').fadeOut()}});
	$('#toTop').click(function(){$('body,html').animate({scrollTop:0},600)});
});

$(function() {
	function clicknavbar(){
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      	if (target.length) {
        	$('html,body').animate({
          	scrollTop: target.offset().top
        	}, 1000);
        	return false;
      	}
      	if(slidedown){
    		$("#window").slideUp();
    	}
    }

  });

	};
	clicknavbar();

});

 
$(document).ready(function(){




	var first = $("#services .afters:eq(0)");
	$(".service-block-inner").each(function(i, el){
		$(el).appendTo(first);
		var lg_mod = i % 4;
		$(el).addClass('clear-lg-' + lg_mod);
		var md_mod = i % 4;
		$(el).addClass('clear-md-' + md_mod);
		var sm_mod = i % 2;
		$(el).addClass('clear-sm-' + sm_mod);
	});

	$(".cta-btns a").addClass('btn-cta');
	$(".cta-btns-inverse a").addClass('btn-cta-inverse');

	$(".service-block:gt(0)").remove();

	$(".client-block-inner").appendTo("#clients .afters:eq(0)");

	$(".case-study-block-inner").appendTo("#case-studies .afters:eq(0)");

	$(".jobs-block-inner").appendTo("#jobs .afters:eq(0)");

	$(".location-block-inner").appendTo("#locations .afters:eq(0)");

	$(".anchor-contact").click(function(e){
		e.preventDefault();
	});

	$(".slider-block, .content-block").each(function(){
		var url = $(this).data('background-url');
		if(url && url.length){
			$(this).find('.container').backstretch([url], {duration: 3000, fade: 750, random: true});
		}
	});

	$("a[href=#contact]:not('#trigger-overlay')").click(function(e){
		e.preventDefault();
		toggleOverlay();
	});//
	
	$("form").submit(function(e){
		e.preventDefault();
		var fields = $(this).serializeArray();
		$("form .btn-cta").text("Sending...");
		$.ajax({
			url: "https://zapier.com/hooks/catch/7baz6/"
			,data: fields
			,type: "POST"
			,dataType: "JSON"
			,success: function(response){
				if(response.status){
					$("form:input").val("");
					$("form .btn-cta").css('opacity', 0);
					$("form .btn-cta").text("Sent! Thank you.");
					$("form .btn-cta").animate({
						'opacity': 1
					}, 'fast');
					setTimeout(function(){
						$("form .btn-cta").css('opacity', 0);
						$("form .btn-cta").animate({
							'opacity': 1
						}, 'fast');
						$("form .btn-cta").text("Submit");
					}, 3000);
				}
			}
		}).always(function(){
			
		});
	});
	//

	/////////////////////////////////////////////////////////////////
	// BACKSTRETCH SLIDER (UNCOMMENT TO USE)
	/////////////////////////////////////////////////////////////////
	
	/*$("body").backstretch([
		"img-1.jpg",
		"img-2.jpg",
		"img-3.jpg"
	], {duration: 3000, fade: 750, random: true}); */
	
	
	
	/////////////////////////////////////////////////////////////////
	// Fancybox
	/////////////////////////////////////////////////////////////////
	
	if ($('body#gallery').is('*')) { // Uncomment to run script on specific page only
		if(jQuery.browser.mobile) {
			var myPhotoSwipe = $(".fancybox").photoSwipe({ enableMouseWheel: false , enableKeyboard: false });
		}
		else {
			// Single Image
			//$("a.fancybox").fancybox();
			
			// Multiple Images
			$("a.fancybox[rel='gallery_group']").fancybox({
				'transitionIn'  :  'elastic',
				'transitionOut' :  'elastic',
				'speedIn'       :  600, 
				'speedOut'      :  200 
			});
		}
    }
	
	/////////////////////////////////////////////////////////////////
	// Animated Entrances
	/////////////////////////////////////////////////////////////////
	
	$(window).scroll(function() {
		$('.animatedEntrance').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+400) {
				$(this).addClass("slideUp"); // slideUp, slideDown, slideLeft, slideRight, slideExpandUp, expandUp, fadeIn, expandOpen, bigEntrance, hatch
			}
		});
	});
	
	/////////////////////////////////////////////////////////////////
	// Form Validation
	/////////////////////////////////////////////////////////////////
	
	$('#custom_form').formValidation({ 
		validateText: ["name","message"],
		validateEmail: ["email"],
		validateSpam: true,
		captchaTheme: 'greyscale' // default, mini, dark, mini-dark, light, mini-light, greyscale, mini-greyscale
	});
	
	/////////////////////////////////////////////////////////////////
	// GOOGLE MAPS
	/////////////////////////////////////////////////////////////////

	function map() {
		var myLatlng = new google.maps.LatLng(-12.47518, 130.99042);
		var mapOptions = {
			zoom: 14,
			center: myLatlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			scrollwheel: false,
			styles:
			[
    	{
        "featureType": "all",
        "stylers": [
            		{
              	  	"saturation": -100
            		},
            		{
                	"gamma": 0.5
            			}
        			]
    			}
			]
		}
		// For Contact Page
		if ($('#map').length > 0) {
			var map = new google.maps.Map(document.getElementById('map'), mapOptions);
			var image = 'img/mapicon.png';
			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				icon: image
			});
			google.maps.event.addDomListener(window, 'resize orientationchange', function() {
				map.setCenter(myLatlng);
			});
		}
		// For Footer
		if ($('#footer-map').length > 0) {
			var map = new google.maps.Map(document.getElementById('footer-map'), mapOptions);
			var image = 'img/mapicon.png';
			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				icon: image
			});
			google.maps.event.addDomListener(window, 'resize orientationchange', function() {
				map.setCenter(myLatlng);
			}); 
		}
	}
	google.maps.event.addDomListener(window, 'load', map);

	
});

/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );

var toggleOverlay;

$(document).ready(function(){
	//fails if javascript is not enabled and stays at display: none;
	$(".navbar-header").css("display", "block");
	if(isMobile.apple.device || isMobile.android.device || isMobile.windows.device){
		// include backstretch only if device is not mobile
		$("figure").removeClass("effect-ruby");
		$("div#window").remove();
		//remove text from figure 
		$(".backstretch img").css("height", "200px");
		$(".backstretch img").css("width", "150px");
	};
	if(isMobile.apple.phone || isMobile.android.phone || isMobile.windows.phone){
		$("figure p").hide();
	}
});
