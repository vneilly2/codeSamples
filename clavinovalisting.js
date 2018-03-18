// JavaScript Document

$(document).ready(function() {

    var $pageBody = $('body');
    var $subNav = $('div[name="page-subnav"]');
    var _agt = navigator.userAgent.toLowerCase();
    var isMobile = (_agt.match(/iphone/i)||_agt.match(/ipod/i)||(_agt.match(/android/i)&&_agt.match(/mobile/i))||_agt.match(/iemobile/i) )?true : false;
    var isTablet = (_agt.match(/ipad/i) || (_agt.match(/android/i) && !_agt.match(/mobile/i)  ) || (_agt.match(/android/i) && !_agt.match(/mobile/i)  ))? true : false;
    var topVideo = $('#main_video');
	var $body = $('body');
	var winHeight = $(window).height();
	var winWidth = $(window).width();
    var mobiBannerHtml = " ";

//WINDOW RESIZE
var resizeTimer;

$(window).on('resize', function(e) {

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
      console.log('resize event done');
            
  }, 250);

});
//END WINDOWS RESIZE
//set cinemagraph to play on slickJS INIT
    $('.banners-wrap').on('init', function(event, slick) {
        main_video.play();
        $topVideo = $('#main_video');
    });

//SLICK SLIDER Functionality
var bannerWrapLength = $('.banners-wrap').length;

if (bannerWrapLength > 0) {
    console.log('banners-wrap element does exist');
    //Initialize BAnner container element
    $('.banners-wrap').slick({
        dots			:	true,
        infinite		:	true,
        slidesToScroll	: 	1,
        autoplay		:	true,
        autoplaySpeed	:	5000,
        adaptiveHeight	:	true,
        prevArrow		:	false,
        nextArrow		:	false,
        fade	:	true,
        cssEase	:	'linear'
    });
    // END SLICK SLIDER Functionality

} else {
    $('.banners-wrap').on('init', function(event, slick) {
        main_video.play();
        mid_video.play();
        $topVideo = $('#main_video');
    });

    var timerId = setTimeout(function initSlick() {
        if( bannerWrapLength > 0 ) {
            //Initialize BAnner container element
            $('.banners-wrap').slick({
                dots			:	true,
                infinite		:	true,
                slidesToScroll	: 	1,
                autoplay		:	true,
                autoplaySpeed	:	5000,
                adaptiveHeight	:	true,
                prevArrow		:	false,
                nextArrow		:	false,
                fade	:	true,
                cssEase	:	'linear'
            });
            // END SLICK SLIDER Functionality

        } else {
            alert('element does not exist');
            timerId = setTimeout(initSlick, 200);
        }
    }, 150)
    clearTimeout(timerId);
    alert('Element exist');
}

// END SLICK SLIDER Functionality    



/* ADD class to Page Body for Navigation scroll*/
$pageBody.attr('data-spy', "scroll");
$pageBody.attr('data-target', ".navbar");
$pageBody.attr('data-offset', "80");

    /*MOBILE CHECK */
    
    if ( isMobile === true || isTablet === true ) {
        //alert('true');
        mobiBannerHtml += '<div class"media-banner banner1">' + '<img src="https://www.yamaha.com/US/ClavinovaListingPage/images/clav-streaminglights-poster2.jpg" class="img-responsive" />' + '</div>'

        topVideo.hide();
        $('.video-container').append(mobiBannerHtml);


	} else {
        

	}
    /*END MOBILE CHECK */



    //STICKY NAVIGATION ON SCROLL
    $(window).scroll(function() {
        scrollTopValue = $(window).scrollTop();
        //console.log(scrollTopValue)
        if ($(window).scrollTop() > 805 ) {
            //alert('add class');
            $('#sticky-nav').addClass('sticky-nav');    
        } else {
            $('#sticky-nav').removeClass('sticky-nav');
        }
    });

    var topPosition = $(this).scrollTop();
    if (topPosition > 100) {
    $('html, body').animate({
             scrollTop: 0
        }, 800);
         return false;
     }
     

     //Model Compare Text Scroll Into View
 
 
     $("div[name='model-compare-text']").on('show.bs.collapse', function(){
         //alert('The collapsible content is now fully shown.');
         
         var faIcon = $('div.fa.fa-plus');
         faIcon.toggleClass('down');
  
         var $targetTextBlock = $('#model-compare-text');
         var $docBody = $('html, body');
  
          $docBody.animate({
              scrollTop   :   $targetTextBlock.offset().top-100
          }, 300, function() {
              //alert('done');
          });
         
      });
      



//Model Compare Text Collapse
    $("div[name='model-compare-text']").on('hide.bs.collapse', function(){
        //alert('The collapsible content is now fully shown.');
        var faIcon = $('div.fa.fa-plus');
        faIcon.toggleClass('down');

        var $targetTextBlock = $('#model-compare-text');
        var $docBody = $('html, body');
 
         $docBody.animate({
             scrollTop   :   $('.clavinova-logo').offset().top+75
         }, 300, function() {
             //alert('done');
         });

    });



      //Image Hover
	var $videoImage = $('.card-front figure');
	$videoImage.hover(function() {
		$(this).find('figcaption .video-info-text .video-play-btn i').addClass('hoverOn red');

	}, function() {
		$(this).find('figcaption .video-info-text .video-play-btn i').removeClass('hoverOn red');
    });
    
    //YouTube Video Functionality
    var videoBox = $('.video-box');
    var videoClose = $('.video-close');
    
    function buildVideo(vidID) {
        var videoId = vidID;
        var videoUrl = '';
    
        //alert(videoBox.length);
        var customIframe = $('<iframe class="video-iframe" frameborder="0" allowfullscreen mozallowfullscreen webkitallowfullscreen></iframe>');
        videoUrl = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0&showinfo=0&enablejaspi=1&origin=http://www.yamaha.com';
        $(customIframe).attr('src', videoUrl);
    
        videoBox.append(customIframe).html();
    
        videoBox.removeClass('off');
        $('body').css({
            'overflow': 'hidden'
        });
    }
    
    function YTcloseVideo() {
        videoBox.find('iframe').remove();
        videoBox.addClass('off');
        $('body').css({
            'overflow': 'initial'
        });
    }

    

	$('div[data-frametype="YouTube"]').on('click', function(event) {
        var _this = $(this);
        console.log(_this);
		if (_this.attr('data-videoid')) {
			buildVideo(_this.attr('data-videoid'));			
        } else {
            
        }
    });
    $('.play-icon').click(function() {
        //$('div[data-frametype="YouTube"]').trigger('click');
        //alert('icon clicked');
        $(this).next().trigger('click');
    });
    
	
	videoClose.click(function() {
        YTcloseVideo();
    });
    

    //Bootstrap StickNAV
    $('#nav').affix({
        offset  :   {
            top :   $('div[name="sticky-nav-point"]').height()-$('#nav').height()
        }
    });
    
    //Scolling To SECTIONS
    $('#nav .navbar-nav li>a').click(function(){
        var navLink = $(this).attr('href');
        var sectionPos = $(navLink).offset().top;

        $('body,html').animate({scrollTop   :   sectionPos}, 750);
    });

    //BOOTSTRAP SCROLL NAVIGATION
    function scrollNav() {
        $('.navbar-nav li a').click(function () {
            if ($(this).parent().parent().parent().hasClass('in')) {
                //alert('got it');
                $('.navbar-collapse.collapse.in').removeClass('in');
            }
            //Toggle Class
            $(".active").removeClass("active");
            $(this).closest('li').addClass("active");
            var theClass = $(this).attr("class");
            $('.' + theClass).parent('li').addClass('active');

            //Animate
            $('html, body').stop().animate({
                scrollTop: $($(this).attr('href')).offset().top - 80
            }, 400);
            return false;
        });
        $('.scrollTop a').scrollTop();
    }
    scrollNav();


});