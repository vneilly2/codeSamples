// JavaScript Document

/**Tridion Responsive Rebate Template**/

///Global VARS
var data = [],
    isAuth = "N",
    newPageHgt = '',
    topOffset,
    loaderTop,
	frameOffset, 
    winHeight,
    modalHeight,
    $contentModal = $('[id$=mainModal]'),
    $modalTitle = $('.modal-title'),
    $modalBody = $('.modal-body'),
    $zipFormField = $('input[name="rebate-dlrfind"]');



var buildContentObj = function(_thisTrigger) {
	'use strict';
	var contentObj = {
		trigger        :   (_thisTrigger).attr('name'),
		contentTitle   :   (_thisTrigger).attr('data-content'),
		imageSrc       :   (_thisTrigger).children().attr('src'),
		frameUrl	   :   (_thisTrigger).attr('data-frameurl'),
		contentBlock   :   (_thisTrigger).prev('.readmore').text()
	};
	
	return contentObj;
};


function getModalImage(trigger) {
	return buildContentObj(trigger);
}

function getIframe(trigger) {
    var triggeredFrameType = (trigger).attr('data-frameType');
    switch (triggeredFrameType) {
        case 'YouTube':
            var _videoId = (trigger).attr('data-videoId');
            var _customIframe = $('<iframe class="video-iframe embed-responsive-item" frameborder="0" allowfullscreen mozallowfullscreen webkitallowfullscreen></iframe>');
            var _thisSrc = 'https://www.youtube.com/embed/' + _videoId + '?autoplay=1&rel=0&showinfo=0&enablejaspi=1&origin=http://www.yamaha.com';
            var _thisWidth = (trigger).attr('data-vidWidth') || 640;
            var _thisHeight = (trigger).attr('data-vidHgt') || 360;

            contentObj.trigger = (trigger).attr('name');
            contentObj.frameUrl = _thisSrc;
            contentObj.contentTitle = (trigger).attr('title');
            contentObj.contentBlock = (_customIframe).attr({
                'src': _thisSrc
                //'height':   _thisHeight,
                //'width' :   _thisWidth
            });

            return contentObj;

        case 'dealerfinder':
			/* https://www.yamaha.com/paragon/responsivedealerlocator.html?track_name=RESPONSIVE_REBATE&category=13711371|13701370&divcode=yca&zipcode= */
            //console.log(triggeredFrameType);
			return buildContentObj(trigger);

        case 'model-list':
            //console.log(triggeredFrameType);
            return buildContentObj(trigger);

        case 'modal-login':
            //console.log(triggeredFrameType);
            return buildContentObj(trigger);

    }

}

function getTextBlock(trigger) {

    return buildContentObj(trigger);
}

var setPostMessageObject = function( objType ) {
    
    var pheight = $("body").height(),
            pheight = pheight + 'px';
        
        
    if( objType === 'FRM_HEIGHT_MC'){
        
        //console.log(pheight);

        return {
                type:   "FRM_HEIGHT_MC",
                frmid:  "pageCanvas",
                height: pheight
            	}

    }
    else if( objType === 'GETOFFSET_MC' ){
        var pheight = $("body").height(),
            pheight = pheight + 'px';
        
        //console.log(pheight);

        return {
                type: "GETOFFSET_MC"
                }
    }
   
}

var setObjFrame = function(msgObjType1, msgObjType2) {
    if (window.self !== window.top) {
        var newMsgChannel,
            objFrame,
            objOffset;

        if ( (msgObjType1 === "FRM_HEIGHT_MC") && (msgObjType2 === 'undefined') ) {
            
            objFrame = setPostMessageObject(msgObjType1);
            newMsgChannel = new MessageChannel();
            window.parent.postMessage(objFrame, postDomain, [newMsgChannel.port2]);

        } else if ( (msgObjType1 === "FRM_HEIGHT_MC") && (msgObjType2 === "GETOFFSET_MC") ) {
            
            objFrame = setPostMessageObject(msgObjType1);
            newMsgChannel = new MessageChannel();
            window.parent.postMessage(objFrame, postDomain, [newMsgChannel.port2]);

            var objFrame = setPostMessageObject(msgObjType2);
            var newMsgChannel = new MessageChannel();
            window.parent.postMessage(objFrame, postDomain, [newMsgChannel.port2]);
            newMsgChannel.port1.onmessage = processReceived;
           

        } else if ( (msgObjType1 === "GETOFFSET_MC") && (msgObjType2 === 'FRM_HEIGHT_MC') ) {
            var objOffset = setPostMessageObject(msgObjType1);
            var newMsgChannel = new MessageChannel();
            window.parent.postMessage(objFrame, postDomain, [newMsgChannel.port2]);
            newMsgChannel.port1.onmessage = processReceived;

            setTimeout(function() {
                objFrame = setPostMessageObject(msgObjType2);
                newMsgChannel = new MessageChannel();
                window.parent.postMessage(objFrame, postDomain, [newMsgChannel.port2]);
            }, 250);
           
        }
        else {
            console.log('setObjFrame has been called using ', msgObjType1 + ' and ', msgObjType2);
        }
        
        

    } else {
        return false;
    }
};



function populateModal(modalObj) {
    if ((modalObj.trigger) === 'modal-image') {
        console.log(modalObj);
        ($contentModal)
        .find($modalBody)
            .append('<img src=' + modalObj.imageSrc + '>');

        $contentModal.find($modalTitle)
            .html("")
            .append(modalObj.contentTitle);

        // ADD $postMessage functions here
        setObjFrame();
    }
	else if (modalObj.trigger == 'modal-frame') {
        console.log(modalObj);
        ($contentModal)
        .find($modalBody)
            .append(modalObj.contentBlock);
        $('video-iframe').wrap("<div class='embed-responsive embed-responsive-16by9'></div>");
        $('.modal-dialog').addClass('yt-video');
        $contentModal.find($modalTitle)
            .html("")
            .append(modalObj.contentTitle);

        // ADD $postMessage functions here
        setObjFrame("FRM_HEIGHT_MC", "GETOFFSET_MC");
    }
	else if (modalObj.trigger === 'modal-locator') { 
		var _customIframe = $('<iframe id="rebate-dl" class="locator-frame modal-locator" frameborder="0"></iframe>'),
            _locatorUrlBase = modalObj.frameUrl,
            _locatorZip = $zipFormField.val(),
            _locatorUrl = '',
            constructLocatorUrl = function () {
                _locatorURL = _locatorUrlBase.concat(_locatorZip);
                return _locatorUrl;
            };
       


       

        constructLocatorUrl();
        _customIframe = _customIframe.attr('src', _locatorURL);

		$contentModal.find($modalBody)
			.append(_customIframe);
        $contentModal.find($modalTitle)
            .html("")
            .append(modalObj.contentTitle);

        // ADD $postMessage functions here
        setObjFrame("FRM_HEIGHT_MC", "GETOFFSET_MC");
		if($("#rebate-info").length == 0) {
		  getIframeHeight(700);
		}
		else
		{
			getIframeHeight(300);
		}
         //getIframeHeight(300);
       
    
        calculateModalHeight( 840 ); 
        
    }
    else if (modalObj.trigger === 'begin-rebate') {
		var _customIframe = $('<iframe id="ma-login" class="locator-frame begin-rebate" scrolling="no" frameborder="0"></iframe>');
		var _locatorURL = modalObj.frameUrl;
		
        

        _customIframe = _customIframe.attr('src', _locatorURL);
		$contentModal.find($modalBody)
			.append(_customIframe);
        $contentModal.find($modalTitle)
            .html("")
            .append(modalObj.contentTitle);

        // ADD $postMessage functions here
        setObjFrame("FRM_HEIGHT_MC", "GETOFFSET_MC");
        
    }
    else if (modalObj.trigger === 'view-models') {
		var _customIframe = $('<iframe id="view-models" class="locator-frame model-list" frameborder="0"></iframe>');
		var _urlToFrame = modalObj.frameUrl;
		

       

        _customIframe = _customIframe.attr('src', _urlToFrame);
		$contentModal.find($modalBody)
			.append(_customIframe);
        $contentModal.find($modalTitle)
            .html("")
            .append(modalObj.contentTitle);

        // ADD $postMessage functions here
        setObjFrame("FRM_HEIGHT_MC", "GETOFFSET_MC");
        
    }
    else {
        var _customIframe = $('<iframe id="no-object" class="locator-frame" frameborder="0"></iframe>');
		var _locatorURL = modalObj.frameUrl;
		
        
        _customIframe = _customIframe.attr('src', _locatorURL);
		$contentModal.find($modalBody)
			.append(_customIframe);
        $contentModal.find($modalTitle)
            .html("")
            .append(modalObj.contentTitle);
    }
    
    $contentModal.modal('show');
    $contentModal.on('shown.bs.modal', function() {
        console.log('modal now showing');
        modalReposition();
    });
   
}



function storeFinder(param1, param2) {
	var dlrZip = $zipFormField.val();
	
	
	if (dlrZip === '' || dlrZip === 'Enter ZIP Code') {
		errorMessage = 'Please enter a 5-digit ZIP Code';
		$('.error-msg').html(errorMessage).show();
        return false;
	} 
	else {
		if ((dlrZip.length) < 5 || (isNaN(dlrZip)) ) {
			errorMessage = 'Not a US ZIP. Please Try again.';
			$('.error-msg').html(errorMessage).show();
            return false;
		}
		else {
			
			$('.error-msg').html('').hide();
            return true;
		}
	}

}

var getIframeHeight = function( framePadding ) {
     console.log('test');
    framePadding = (framePadding === undefined ? 0: framePadding);

    var thisDocument = document,
        windowWidth = $(window).width(),
        _iFrameContentHgt = $("body").height(),
        _oldIFrameHgt = '',
        _newIFrameHgt = '';

    _newIFrameHgt = _iFrameContentHgt;
    //console.log('Content height before iFrame check: ', _newIFrameHgt);

    if ((window.self !== window.top)) {
        _oldIFrameHgt = _newIFrameHgt;
        _iFrameContentHgt = $("body").height();
        console.log('Content height after iFrame check: ', _iFrameContentHgt);
        if (_iFrameContentHgt === _oldIFrameHgt) {
            _newIFrameHgt = _iFrameContentHgt;
            //postDomain = getPostDomain(cookieName);

            var objFrame = {
                    type: "FRM_HEIGHT_MC",
                    frmid: "pageCanvas",
                    height: _newIFrameHgt+framePadding 
                },
                mcc = new MessageChannel();
            window.parent.postMessage(objFrame, postDomain, [mcc.port2]);

        }

    } else {
        console.log("This page is being loaded outside iFRAME.");
    }

}

var modalReposition = function () {
        var openModal = $contentModal,
            //$modalDialog = modal.find('.modal-dialog'),
            //modalTopMargin = Math.max(0, ($(window).height() - $modalDialog.height()) / 2),
           // _winScrollTop   = $(window).scrollTop(),
           //_mdScrollTop    = _winScrollTop + (_mdOuterHgt/4),
        _mdOuterHgt     = openModal.outerHeight(),
        _winHgt         = $(window).height(),
        _frameOffset     = frameOffset;
        
       
       
        $contentModal.height( modalHeight );


        console.log("frameOffset= ", _frameOffset, " and ", "_winHgt= ", _winHgt);
        openModal.animate({
            marginTop   :   _frameOffset
        });     

};



function  calculateModalHeight( ModalMinHeight ){

     var __to;
                    __to = setInterval(function(){
                        if(typeof winHeight !=='undefined'){
                            clearInterval(__to);
                            
                             
                             modalHeight = (   (winHeight/2) + 100 );
                             
                             modalHeight = ( modalHeight > ModalMinHeight) ? modalHeight : ModalMinHeight;
                            

                        }
    },100);


   



}

function processReceived(e) {
    console.log('e = ' + JSON.stringify(e.data));
    var str = e.data;
    
    if (typeof str == "object") {

        if (str.type == 'SETOFFSET_MC') {

            parentWinScrollTop = str.winScrollTop;
            iFrameWinTop = str.frameTop;
            winHeight    = str.winHeight;
            
           
            // new code by non
            frameOffset = parentWinScrollTop - iFrameWinTop;
            frameOffset = frameOffset + 'px';

        }
    }
} //END processReceived()



////////***END REBATE FUNCTIONS****/////////


$(document).ready(function() {
	///Modal Open
	
	var $elemThumb = '',
        $elemTitle = '',
        $modalTrigger = '',
        resizeTimer;

        $('a[href="#mainModal"]').click(function() {
            //e.stopPropagation();
            $modalTrigger = $(this);
            var triggerType = $modalTrigger.attr('name');
            //console.log(triggerType);
            if (triggerType === 'modal-locator'){
                if ( storeFinder() ) {
                    var modalObj = getIframe($modalTrigger);
                    console.log(modalObj);
                   
                    populateModal(modalObj);
                } else {
                    return false;
                }

            } else if (triggerType === 'begin-rebate') {
                if (isAuth === "N") {
                    var modalObj = getIframe($modalTrigger);
                    console.log(modalObj);
                    populateModal(modalObj);

                } else {
                    document.location.href = "/Paragon/YamahaAccount/Initiatives/TrideonRebateTemplate/Registration.aspx";
                }

            } else {
                switch (triggerType) {
                    case 'modal-image':
                        var modalObj = getModalImage($modalTrigger);

                        populateModal(modalObj);

                        break;

                    case 'modal-frame':
                        $modalBody.addClass('video-modal');
                        var modalObj = getIframe($modalTrigger);
                        
                        populateModal(modalObj);
                        break;

                    case 'view-models':
                        var modalObj = getIframe($modalTrigger);
                        console.log(modalObj);
                        populateModal(modalObj);
                        break;
                        
                    case 'modal-contentblock':
                        var modalObj = getTextBlock($modalTrigger);
                        console.log(modalObj);
                        populateModal(modalObj);
                        break;
                }//end switch
            }

       });
       

       $(window).on('resize', function(e) {
           
           clearTimeout(resizeTimer);
           resizeTimer = setTimeout(function () {
               if ( ($contentModal).hasClass('in') ) {
                   //getIframeHeight();
                   modalReposition();
                   console.log('done with reposition after resize');
               } else {
                   getIframeHeight();
               }
           }, 250);
           
       });
    
  
    $('body').on('hidden.bs.modal', '.modal', function() {
        ($modalBody).empty();
        getIframeHeight();
    });

    
	
  
}); //END $(document).ready()//