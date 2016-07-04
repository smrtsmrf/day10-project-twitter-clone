$(document).ready(function() {
	// initially hide these
	$('#char-count, #tweet-submit, .stats, .reply').hide();
	$('.tweet-actions').css('opacity', 0);



	// show tweet actions only on hover
	// need to do it this way so new tweets will inherit
	$('body').on('mouseenter', '.tweet', function() {
		$(this).find('.tweet-actions').first().fadeTo(1,1);
	})

	$('body').on('mouseleave', '.tweet', function() {
		$(this).find('.tweet-actions').first().fadeTo(1,0);
	})

	// show stuff on click
	// need to do it this way so new tweets will inherit
	$('body').on('click', '.tweet', function() {
		$(this).find('.stats, .reply').slideToggle();
	})

	// increase text box height and show buttons
	$('.tweet-compose').click(function () {
		 $(this).css('height', '5em');
		 $('#char-count, #tweet-submit').show();
	});

	// updated character count - need if statement for backspace
	$('.tweet-compose').keyup(function(e) {
		var charsUsed = $(this);
		$('#char-count').text(140-charsUsed.val().length);
		var charsRemain = $('#char-count').html();

		switch (true) {
			case (0 < charsRemain && charsRemain <= 10):
				$('#char-count').css('color','red');
				break;
			case (charsRemain < 0):
				$('#tweet-submit').prop('disabled', true);
				break;
			default:
				$('#tweet-submit').prop('disabled', false);
		}
	});

	// add new tweet to the feed
	$('#tweet-submit').click(function() {

		var $myAvatar = $('#dashboard').find('img').clone();
		var myName = $('#dashboard').find('p').html();
		var postedWhen = new Date();
		var time = postedWhen.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
		var dateArray = postedWhen.toString().split(' ');
		var date = dateArray[2] + ' ' + dateArray[1] + " '" + dateArray[3].slice(2);

		$('#stream').prepend(
			'<div class="tweet">'+
				'<div class="content">'+
					'<strong class="fullname"></strong>'+
					'<span class="username"> @</span>'+
					'<p class="tweet-text"></p>'+
					'<div class="tweet-actions">'+
						'<ul>'+
							'<li><span class="icon action-reply"></span> Reply</li>'+
							'<li><span class="icon action-retweet"></span> Retweet</li>'+
							'<li><span class="icon action-favorite"></span> Favorite</li>'+
							'<li><span class="icon action-more"></span> More</li>'+
						'</ul>'+
					'</div>'+
					'<div class="stats">'+
						'<div class="retweets">'+
							'<p class="num-retweets">0</p>'+
							'<p>RETWEETS</p>'+
						'</div>'+
						'<div class="favorites">'+
							'<p class="num-favorites">0</p>'+
							'<p>FAVORITES</p>'+
						'</div>'+
						'<div class="users-interact">'+
							'<div>'+
							'</div>'+
						'</div>'+						
						'<div class="time">'+
						'</div>'+
					'</div>'+
					'<div class="reply">'+
						'<img class="avatar" src="img/alagoon.jpg" />'+
						'<textarea class="tweet-compose" placeholder=""/></textarea>'+
					'</div>'+
				'</div>'+
			'</div>'
		 	);
		$('#stream').find('.content').first().prepend($myAvatar);
		$('#stream').find('strong').first().html(myName);
		$('#stream').find('span').first().append(myName.split(' ').join('').toLowerCase());
		$('#stream').find('textarea').first().attr('placeholder','Reply to @'+myName.split(' ').join('').toLowerCase());
		$('#stream').find('.users-interact').first().css('visibility' , 'hidden');
		$('#stream').find('.time').first().html(time + ' - ' + date);
		$('#stream').find('.tweet-text').first().html($('.tweet-compose').val());
	});




}); // end of doc ready




// Black Diamond - times
