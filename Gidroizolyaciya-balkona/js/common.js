window.onload = function () { 
if(!window.FormData) {
		var div = ge('content');
		div.innerHTML = "Ваш браузер не поддерживает объект FormData";
		div.className = 'notSupport'; 
	}
}

$(document).ready(function() {

	/* Lazy: Start */
	$('.lazy').Lazy({
		effect: 'fadeIn', 
		effectTime: 250,
		threshold: 0,
		afterLoad: function (e) {
			e.css('display', '')
		}
	});
	/* Lazy: End */

	/* StickyMenu: Start */
	var hmm = $('.main-top-bar'),
	hmmTop = hmm.position().top;
	
	hmm.clone().appendTo("body").addClass('sticky');
	hmm = $('.main-top-bar:eq(1)');	 
	
	$(window).scroll(function () {
		if ( $(this).scrollTop() >= hmmTop + 450 )
			hmm.addClass('visible');
			else hmm.removeClass('visible');
		});
	/* StickyMenu: End */

	/* JCF: Start */
	jcf.setOptions('File', {
		buttonText: 'Обзор',
		placeholderText: 'Прикрепить файл:'
	});

	jcf.replaceAll();
	/* JCF: End */

	/* MagnificPopupTranslations: Start */
	$.extend(true, $.magnificPopup.defaults, {
		tClose: 'Закрыть (Esc)',
		tLoading: 'Загрузка...',
		gallery: {
			tPrev: 'Назад',
			tNext: 'Далее',
			tCounter: '%curr% из %total%'
		},
		image: { tError: '<a href="%url%">Изображение</a> не удалось загрузить.' },
		ajax: { tError: '<a href="%url%">Содержимое</a> не удалось загрузить.' }
	});
	/* MagnificPopupTranslations: End */

	/* MainPopup: Start */
	$('.callback-popup, .callback-popup2, .callback-popup3, .callback-popup4').magnificPopup({
		type: 'inline',
		midClick: true,
		removalDelay: 600,
		mainClass: 'mfp-fade',
		closeMarkup: '<div title="Закрыть (Esc)" class="mfp-close">&#215;</div>',
	});
	/* MainPopup: End */

	/* GalleryWorksPoups: Start */
	$('.gallery-works').each(function() {
		$(this).magnificPopup({
	        delegate: 'a',
	        type: 'image',
	        removalDelay: 600,
	        mainClass: 'mfp-fade',
	        closeMarkup: '<div title="Закрыть (Esc)" class="mfp-close">&#215;</div>',
	        gallery: {
	        	enabled: true,
	        	arrowMarkup: '<div title="%title%" class="mfp-arrow mfp-arrow-%dir%"></div>',
	        }
	     });
	});


	/* Back to top button: Start */
	var navButton = $('#top-button'),
	    screenHeight = $(window).height(),
		 topShow = screenHeight, // Не показывать до (screenHeight или Number), px 
		 navSpeed = 1000; // Скорость прокрутки, мс 

	function scrollCalc() {
		var scrollOut = $(window).scrollTop();

		if ( scrollOut > topShow && ( navButton.attr('class') == '' || navButton.attr('class') == undefined ) )
			navButton.fadeIn().removeClass('down').addClass('up').attr('title', 'Наверх');
		if ( scrollOut < topShow && navButton.attr('class') == 'up' )
			navButton.fadeOut().removeClass('up down');
		if ( scrollOut > topShow && navButton.attr('class') == 'down' )
			navButton.fadeIn().removeClass('down').addClass('up');
	}

	$(window).bind('scroll', scrollCalc);
	var lastPos = 0;

	navButton.bind('click', function () {
		scrollOut = $(window).scrollTop();

		if ( navButton.attr('class') == 'up' ) {
			lastPos = scrollOut;
			$(window).unbind('scroll', scrollCalc);
			
			$('body, html').animate({
				scrollTop: 0
			}, navSpeed, function () {
				navButton.removeClass('up').addClass('down').attr('title', 'Вернуться');
				$(window).bind('scroll', scrollCalc);
			});
		}
		if ( navButton.attr('class') == 'down' ) {
			$(window).unbind('scroll', scrollCalc);
			
			$('body, html').animate({
				scrollTop: lastPos
			}, navSpeed, function () {
				navButton.removeClass('down').addClass('up').attr('title', 'Наверх');
				$(window).bind('scroll', scrollCalc);
			});
		}
	});
	/* Back to top button: End */

	/* Don't drag elements: Start */
	$('*').each(function (){
		$(this).bind('dragstart', function(e) {
			if (window.event) event.preventDefault();
				e.cancelBubble = true; return false;
			});
	});
	/* Don't drag elements: End */

	/* Hide input's placeholders onfocus: Start */
	document.body.onclick = function (e) {
		if (e.target.hasAttribute('placeholder')) {
			var ph = e.target.placeholder;
			if ( e.target.placeholder != '' ) {
				e.target.removeAttribute('placeholder');
				e.target.addEventListener('focusout', function () { this.placeholder = ph; } );
			}
		}
	};
	/* Hide input's placeholders onfocus: End */


	/*var errorTxt = 'Ошибка отправки';
	$("#sendform1").validate({
		submitHandler: function(form){
			var form = document.forms.sendform1,
				 formData = new FormData(form),
				 xhr = new XMLHttpRequest();

			xhr.open("POST", "/send1.php");
			
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if(xhr.status == 200) {
						document.getElementById('sendform1').reset();
						ThanksPopup();
					}
				}
			};
			xhr.send(formData);
		}
	});	
*/
	$("#sendform2").validate({
		submitHandler: function(form){
			var form = document.forms.sendform2,
				 formData = new FormData(form),
				 xhr = new XMLHttpRequest();

			xhr.open("POST", "/mail.php");
			
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if(xhr.status == 200) {
						document.getElementById('sendform2').reset();
						ThanksPopup();
					}
				}
			};
			xhr.send(formData);
		}
	});	
});




/* Mail: Start */
	function ThanksPopup() {
		$.magnificPopup.open({
			items: {
				src: '#popup-callback-thankyou',
			},
			type: 'inline',
			removalDelay: 600,
			mainClass: 'mfp-fade',
			closeMarkup: '<div title="Закрыть (Esc)" class="mfp-close">&#215;</div>',
		});
	}

var errorTxt = 'Ошибка отправки';
$(document).ready(function() {
	$( "#sendform1" ).submit(function( event ) {
		$("#sendform1 .phoneform1").removeClass("error");
		var phone = $("#sendform1 .phoneform1").val();
		if(phone==""){
			$("#sendform1 .phoneform1").addClass("error");
			return false;
		}else{
			$.ajax({
				type: "POST",
				url: "mail.php",
				cache: false,
				data: {
					AjaxMethod: "sendmail",
					phone:phone
				},
				success: function(d){
					document.getElementById('sendform1').reset();
					ThanksPopup();
					return false;
				}
			});
			return false;
		}
	});
	
	
	$( "#sendform3" ).submit(function( event ) {
		$("#sendform3 .phoneform1").removeClass("error");
		var phone = $("#sendform3 .phoneform1").val();
		if(phone==""){
			$("#sendform3 .phoneform1").addClass("error");
			return false;
		}else{
			$.ajax({
				type: "POST",
				url: "mail.php",
				cache: false,
				data: {
					AjaxMethod: "sendmail",
					phone:phone
				},
				success: function(d){
					document.getElementById('sendform3').reset();
					ThanksPopup();
					return false;
				}
			});
			return false;
		}
	});
	
	
	
	$( "#sendform2" ).submit(function( event ) {
		$("#sendform2 .phoneform2").removeClass("error");
		var phone = $("#sendform2 .phoneform2").val();
		if(phone==""){
			$("#sendform2 .phoneform2").addClass("error");
			return false;
		}else{
			return true;
		}
	});
});

