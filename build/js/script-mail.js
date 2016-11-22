$(document).ready(function(){


	var _target='', $button = [];
	$("input[name='phone']").mask("+7 999 999-99-99");
	$('form').ajaxForm({
		beforeSubmit: function(d, $e){
			if (!$e.hasClass('dis')) {
				console.log("123");

				$button[0] = $e.find('.submit');
				$button[1] = $e.find('.submit').text();

				$e.addClass('dis');

				var emailReg = new RegExp("^[-0-9a-z\._]+\@[-0-9a-z\.]+\.[a-z]{2,4}$", "i"),
					phoneReg = '';

				for (var j in d) {
					console.log(d[j]);
					if(d[j].name == 'phone' && d[j].value== '') {
						$e
						 .removeClass('dis')
						 .find('input[name="phone"]')
						 .addClass('err-form');

						return false;
					}
					if(d[j].name == 'phone' && d[j].value != '') {
						for (var i = 0; i <= 9; i++) {
							phoneReg = new RegExp(i.toString() + i.toString() + i.toString() + i.toString() + i.toString() + i.toString() + i.toString());

							if (phoneReg.test(d[j].value)) {
								$e.removeClass('dis')
								 .find('input[name="phone"]')
								 .addClass('err-form');


								return false;
							}
						}
					}

					if(d[j].name == 'name' && d[j].value == '') {


						$e
						 .removeClass('dis')
						 .find('input[name="name"]')
						 .addClass('err-form');

						return false;
					}

					if (d[j].name == 'email' && d[j].required && d[j].value == "") {
						$e.removeClass('dis')
						 .find('input[name="email"]')
						 .addClass('err-form');

						return false;
					}

					if (d[j].name == 'email' && d[j].value != "") {
						if (!emailReg.test(d[j].value)) {
							$e.removeClass('dis')
							 .find('input[name="email"]')
							 .addClass('err-form');


							return false;
						}
					}

					if (d[j].name == 'target') {
						_target = d[j].value;
					}
				}

				$button[0].text('Идёт отправка...');
				$(".triget-thank-block").click();
				$e.removeClass('dis');
				return true;
			} else return false;
		},

		success: function(data){
			console.info(data);
			console.log("1234");
			try {

			} catch(e){}

		}
	});



});
