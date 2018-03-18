// JavaScript Document

$(document).ready(function() {
	'use strict';
	
	var cookieName = 'PaqueteMexicanoDownloads',
	postDomain = '',
	inFrameCheck = function () {
		try {
			return window.self !== window.top;
		} catch (e) {
			return true;
		}
	};

var getIframeHeight = function () {
	var thisDocument = document,
		windowWidth  = $(window).width(),
		_iFrameContentHgt = $("body").height(),
		_oldIFrameHgt =	'',
		_newIFrameHgt = '';
	
	_newIFrameHgt = _iFrameContentHgt;
	//console.log('Content height before iFrame check: ', _newIFrameHgt);
	
	if ( (window.self !== window.top) ) {
		_oldIFrameHgt = _newIFrameHgt;
		_iFrameContentHgt = $("body").height();
		//console.log('Content height after iFrame check: ', _iFrameContentHgt);
		if (_iFrameContentHgt === _oldIFrameHgt) {
			_newIFrameHgt = _iFrameContentHgt;
			postDomain = getPostDomain(cookieName);

			var objFrame = {
				type	:	"FRM_HEIGHT_MC",
				frmid	:	"pageCanvas",
				height	:	_newIFrameHgt
			},
			mcc	= new MessageChannel();
			window.parent.postMessage(objFrame, postDomain, [mcc.port2]);

		}

	} else {
		console.log("This page is being loaded outside iFRAME.");
	}
	
};

$(window).on('load', function() {
	getIframeHeight();
	$(window).resize(function () {
		getIframeHeight();
		
	});
});

	var page  = {
				"languages":{
								"english":{
											"labels":{
														"select_language":"Select Language:",
														"new_styles_include":"New Styles Include:",
														"section_title":"Section Title",
														"content_type":"Content Type",
														"download":"Download",
														"learn_more":"Learn More",
														"other_possibilities":"Other Expansion Possibilities",
														"video_title":"Listen To Some Of The Sounds"
														
														
													 },
											"contents":{
														"content1":"Spice up Your Performances with the Free",
														"content2":"&nbsp;Yamaha Paquete Mexicano Junior Style Pack.",
														"bolero_romantic":"BOLERO ROMANTIC",
														"cumbia_duranguense":"CUMBIA DURANGUENSE",
														"cumbia_norte":"CUMBIA NORTE",
														"polca_norte":"POLCA NORTE",
														"quebradita":"QUEBRADITA",
														"click_the_download":"Click the Download Link For Your Model",
														"psr_s670_desc":"A new generation of Arranger Workstation. With a stunning design, new Voices and Styles and DJ functions, the PSR-S670 is a performance keyboard like no other."
													   }
										  },
								"spanish":{
											"labels":{
														"select_language":"Seleccione el idioma:",
														"new_styles_include":"NUEVOS ESTILOS INCLUIDOS:",
														"section_title":"Section Title2",
														"content_type":"Tipo De Contenido",
														"download":"Descarga",
														"learn_more":"Aprende mas",
														"other_possibilities":"Otras Posibilidades de Expansion",
														"video_title":"Escucha algunos de los nuevos sonidos"
														
													 },
											"contents":{
														"content1":"A&ntilde;ade Sabrosura a su M&uacute;sica, con el Paquete Mexicano Junior",
														"content2":"&nbsp;de Estilos de Yamaha, Descargalo Gratis Aqui",
														"bolero_romantic":"BOLERO ROMANTIC",
														"cumbia_duranguense":"CUMBIA DURANGUENSE",
														"cumbia_norte":"CUMBIA NORTE",
														"polca_norte":"POLCA NORTE",
														"quebradita":"QUEBRADITA",
														"click_the_download":"Haga Click En La Liga De Descarga De Su Modelo",
														"psr_s670_desc":"A new generation of Arranger Workstation. With a stunning design, new Voices and Styles and DJ functions, the PSR-S670 is a performance keyboard like no other.2"
													   }
										  }
							}

 			};

 			/*
 			"labels":"labels",
		    	"contents":"contents",
		    	"images":"images"
		    */
	

	$(function(){

		changeLanguage( 'english' );


		$('select[name="prod_name"]').change(function(){

			changeLanguage( $(this).val() );

		});

	});

	function changeLanguage( language ){

		if( language === 'english' ){
				//window.location.href = "https://dev.usa.yamaha.com/MexicanStylesDownload/english.aspx
				
				$('label[name="select_language"]').html( page.languages.english.labels.select_language );
				$('span[name="content1"]').html( page.languages.english.contents.content1 );
				$('span[name="content2"]').html( page.languages.english.contents.content2 );
				
				$('h2[name="new_styles_include"]').html( page.languages.english.labels.new_styles_include );
				$('li[name="bolero_romantic"]').html( page.languages.english.contents.bolero_romantic );
				$('li[name="cumbia_duranguense"]').html( page.languages.english.contents.cumbia_duranguense );
				$('li[name="cumbia_norte"]').html( page.languages.english.contents.cumbia_norte );
				$('li[name="polca_norte"]').html( page.languages.english.contents.polca_norte );
				$('li[name="quebradita"]').html( page.languages.english.contents.quebradita );

				$('h2[name="section_title"]').html( page.languages.english.labels.section_title  );
				$('h3[name="click_the_download"]').html( page.languages.english.contents.click_the_download );

				$('span[name="content_type"]').html( page.languages.english.labels.content_type );
				$('a[name="download"]').html( page.languages.english.labels.download );


				$('a[name="learn_more"]').html( page.languages.english.labels.learn_more );
				$('p[name="psr_s670_desc"]').html( page.languages.english.contents.psr_s670_desc );
				$('h2[name="other_possibilities"]').html(page.languages.english.labels.other_possibilities);
				$('h2[name="video_title"]').html(page.languages.english.labels.video_title);
				
								
								

		}else if( language === 'spanish' ){
				//window.location.href = "https://dev.usa.yamaha.com/MexicanStylesDownload/spanish.aspx";
				
				$('label[name="select_language"]').html( page.languages.spanish.labels.select_language );
				$('span[name="content1"]').html( page.languages.spanish.contents.content1 );
				$('span[name="content2"]').html( page.languages.spanish.contents.content2 );
				
				$('h2[name="new_styles_include"]').html( page.languages.spanish.labels.new_styles_include );
				$('li[name="bolero_romantic"]').html( page.languages.spanish.contents.bolero_romantic );
				$('li[name="cumbia_duranguense"]').html( page.languages.spanish.contents.cumbia_duranguense );
				$('li[name="cumbia_norte"]').html( page.languages.spanish.contents.cumbia_norte );
				$('li[name="polca_norte"]').html( page.languages.spanish.contents.polca_norte );
				$('li[name="quebradita"]').html( page.languages.spanish.contents.quebradita );

				$('h2[name="section_title"]').html( page.languages.spanish.labels.section_title  );
				$('h3[name="click_the_download"]').html( page.languages.spanish.contents.click_the_download );

				$('span[name="content_type"]').html( page.languages.spanish.labels.content_type );
				$('a[name="download"]').html( page.languages.spanish.labels.download );

				$('a[name="learn_more"]').html( page.languages.spanish.labels.learn_more );
				$('p[name="psr_s670_desc"]').html( page.languages.spanish.contents.psr_s670_desc );
				$('h2[name="other_possibilities"]').html(page.languages.spanish.labels.other_possibilities);
				$('h2[name="video_title"]').html(page.languages.spanish.labels.video_title);

		}

	}

	
	var $launchVideoBtn = $('.video-play-btn a');
	
	$launchVideoBtn.click(function(e) {
		e.preventDefault();
		//alert('video btn clicked');
		var ytVideoId = $(this).attr('data-videoid');
		//console.log(ytVideoId);
		var iframeURL = 'https://www.youtube.com/embed/'+ytVideoId+'?title=0&byline=0&portrait=0&badge=0&color=e89a3e';
		var $targetModal = '#'+$(this).attr('data-modalid');
		var $iframeTarget = $('iframe.embed-responsive-item');
		$iframeTarget.attr('src', iframeURL);
		$('#'+$(this).data('modal-id')).modal();
        
        $('#modal-video').on('hidden.bs.modal', function() {
            $iframeTarget.attr('src', '');
        });
        
	});
}); // end documentReady