// JavaScript Document

//Global VARS
var $animationElement = $('.ani-element');
var $window = $(window);

///Modal Open
const $contentModal = $('.modal[name="mainModal"]');
const $modalTitle = $('.gweb2 .modal-title').html();
const $modalBody = $('.gweb2 .modal-body');
var contentObj = {
    trigger: '',
    contentTitle: '',
    imageSrc: '',
    frameUrl: '',
    contentBlock: ''
}



///Function CODE

var checkInView = function() {
	var $animationElement = $('.ani-element');
	//console.log($animationElement);
	var winHgt = $window.height();
	var winTopPos = $window.scrollTop();
	var winBotPos = (winTopPos + winHgt);
	//console.log(winBotPos);

	$.each($animationElement, function() {
		var $targetElement = $(this);
		var _elementHgt = $targetElement.outerHeight();
		var _elementTop = $targetElement.offset().top;
		var _elementBot = (_elementTop + _elementHgt);

		//console.log(_elementHgt+", "+_elementTop+", "+_elementBot);
		
		//position check
		if ( (_elementBot >= winTopPos) &&
		   	 (_elementTop <= winBotPos) ) {
				//alert($targetElement+" in view!");
				$targetElement.addClass('in-view');
		} else {
			$targetElement.removeClass('in-view');
		}
	});
};


function buildVideo(vidID) {
		var videoId = vidID;
		var videoUrl = '';

		//alert(videoBox.length);
		var customIframe = $('<iframe class="video-iframe" frameborder="0" allowfullscreen mozallowfullscreen webkitallowfullscreen></iframe>');
		videoUrl = 'https://www.youtube.com/embed/'+videoId+'?autoplay=1&rel=0&showinfo=0&enablejaspi=1&origin=http://www.yamaha.com';
		$(customIframe).attr('src', videoUrl);
		
		videoBox.append(customIframe).html();
		
		videoBox.removeClass('off');
		$('body').css({
			'overflow'	: 'hidden'
		});
	}

function YTcloseVideo() {
		videoBox.find('iframe').remove();
		videoBox.addClass('off');
		$('body').css({
			'overflow'	: 'initial'
		});
}



$(document).ready(function() {
	$window.on('scroll resize', checkInView);
	$window.trigger('scroll');

	videoBox = $('.video-box');
	videoClose = $('.video-close');

	$('a.modal-trigger').click(function(event) {
		event.preventDefault();
		var _this = $(this);
		if (_this.attr('data-videoid')) {
			buildVideo(_this.attr('data-videoid'));			
		}
	});
	
	videoClose.click(function() {
        YTcloseVideo();
    });

	var topCarousel = $("#carousel-837745");
	var sxBreadCrumb = $("ol[typeof='BreadcrumbList']");
	var productTabs = $('#wrap-product-tabs');
	var eCommBlock	= $(".price");

	var hideElements = function() {
		//alert('hi!');
		if (topCarousel) {
			//alert('found - 1');
			topCarousel.hide();
			if (productTabs) {
				productTabs.hide();
			}
			if (sxBreadCrumb) {
				//alert('found - 2');
				sxBreadCrumb.hide();
			}
		}

	};

	hideElements();

	//CHANGE DISCLAIMER TEXT AND UNHIDE
	var $disclaimerParagraph = $('.excuse p:first-of-type');
	$disclaimerParagraph.html('Depending upon the region, a piano bench may not be supplied or may differ from those shown above.<br />Specifications are subject to change without notice.');
	$('.excuse').css('display', 'block');
///************************/////////


	if (Modernizr.touch) {
		alert('In Touch Mode');
		//show close overlay btn
		$('.close-link-overlay').removeClass('hidden');
		
		//handle add of hover class when clicked
		$('.prod-image').click(function(e) {
			if (!$(this).hasClass('hover')) {
				$(this).addClass('hover');
			}
		});

		//handle closing of overlay
		$('close-link-overlay').click(function(e) {
			e.preventDefault();
			e.stopPropagation();

			if ($(this).closest('.prod-image').hasClass('hover')) {
				$(this).closest('.prod-image').removeClass('hover');
			}
		});
	} else {
		//alert('In Non-Touch Mode');
		// handle mouseEnter functionality
		$prodImage = $('.prod-image img');
		$prodImage.hover(function() {
			/* if (!$(this).hasClass('animated')) {
				$(this).dequeue().stop().animate({opacity: 0.7}, 250);
			} */
			$prodImage.each(function() {

			});
			
		}, function() {
			$(this).addClass('animated').animate({opacity: 1.0}, 250, function() {
				$(this).removeClass('animated').dequeue();
			});
		});
	}

	//Image Hover
	var $videoImage = $('.card-front figure');
	$videoImage.hover(function() {
		$(this).find('figcaption .video-info-text .video-play-btn i').addClass('hoverOn red');

	}, function() {
		$(this).find('figcaption .video-info-text .video-play-btn i').removeClass('hoverOn red');
	});

});