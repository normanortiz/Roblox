/* SCRIPTS */      
$(function(){
	
    /* GO TO THE TOP */
    $('html, body').animate({scrollTop: 2}).animate({scrollTop: 0});

    /* BACK TO TOP */
	if ($('#back-to-top').length) {
        var scrollTrigger = 200,
            backToTop = function() {
                var scrollTop = $(window).scrollTop();

                if (scrollTop > scrollTrigger) {

                    $('#back-to-top').addClass('show');

                } else {

                    $('#back-to-top').removeClass('show');

                }
            };

        backToTop();

        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 800, 'easeInOutExpo');
        });
	}
    
	/* BACK TO HP */
	function TopPage() {
		$('html,body').animate({scrollTop: 0}, {duration:800, easing:'easeInOutExpo'});
	}
	
	$('.headerlogo').on('click', function() {
		TopPage();
	});
    
    /* CAPTCHA */
    $("#reloadCaptcha").click(function(){
		var captchaImage = $('#captcha').attr('src');	
		captchaImage = captchaImage.substring(0,captchaImage.lastIndexOf("?"));
		captchaImage = captchaImage+"?rand="+Math.random()*1000;
		$('#captcha').attr('src', captchaImage);
	});
    
    /* FORM */
    $.validator.addMethod("atLeastOneLink", function(value, element) {
        return $('#tf_soundcloud').val().trim() !== '' || $('#tf_website').val().trim() !== '';
      }, "Inserisci almeno SoundCloud o Website!");
    
    $('#registration-form').validate({

        errorClass: 'formerror',
        errorElement: 'div',

        rules: {
            tf_nome: 'required',
            tf_cognome: 'required',
            tf_email: { required: true, email: true },
            tf_telefono: { required: true, digits: true },
            tf_eta: { required: true },
            tf_image: 'required',
            tf_instagram: { required: true, url: true },
            tf_bio: 'required',
            securityCode: 'required',
            tf_soundcloud: { atLeastOneLink: true, url: true },
            tf_website: { atLeastOneLink: true, url: true }
        },

        messages: {
            tf_nome: { required: 'campo richiesto!' },
            tf_cognome: { required: 'campo richiesto!' },
            tf_email: { required: 'campo richiesto!', email: 'formato x@x.xxx!' },
            tf_telefono: { required: 'campo richiesto!', digits: 'usa solo numeri!' },
            tf_eta: { required: 'campo richiesto!' },
            tf_image: { required: 'campo richiesto!' },
            tf_instagram: { required: 'campo richiesto!', url: 'https://' },
            tf_bio: { required: 'campo richiesto!' },
            securityCode: { required: 'inserisci il codice!' },
            tf_soundcloud: { atLeastOneLink: 'inserisci almeno SoundCloud o Website!', url: 'https://' },
            tf_website: { atLeastOneLink: 'inserisci almeno SoundCloud o Website!', url: 'https://' }
        },
        
        errorPlacement: function(error, element) {
            
        },
        
        highlight: function(element) {
            $(element).addClass('input-error').removeClass('input-valid');
        },

        unhighlight: function(element) {
            $(element).removeClass('input-error').addClass('input-valid');
        },

        submitHandler: function(form) {

            var formData = new FormData(form);

            $.ajax({

                url: "/process_registration.php",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                dataType: "json",

                beforeSend: function() {

                    $(".response_msg").css("display", "block").html('<div class="loading">Invio in corso...</div>');

                    setTimeout(function(){
                        $(".response_msg").addClass('show');
                    }, 10);
                },

                success: function(response) {

                    if (response.success) {

                        $(".success").css("display", "flex");

                        setTimeout(function(){
                            $(".success").addClass('show');
                        }, 10);

                        $("#registration-form")[0].reset();

                    } else {

                        $(".response_msg").css("display", "block").html('<div class="error">' + response.message + '</div>');

                        setTimeout(function(){
                            $(".response_msg").addClass('show');
                        }, 10);

                        setTimeout(function(){
                            $(".response_msg").removeClass('show');
                        }, 3000);
                    }
                },

                error: function() {

                    $(".response_msg").css("display", "block").html('<div class="error">Errore imprevisto. Riprova più tardi!</div>');

                    setTimeout(function(){
                        $(".response_msg").addClass('show');
                    }, 10);

                    setTimeout(function(){
                        $(".response_msg").removeClass('show');
                    }, 3000);
                }
            });

            return false;
        }
    });
    
    $('#tf_soundcloud, #tf_website').on('input', function() {
        $('#tf_soundcloud').valid();
        $('#tf_website').valid();
    });
    
    /* CHECK EMAIL ACCOUNTS */
    $('#account-form [name="tf_email"]').on('blur', function () {
        var emailField = $(this);
        var emailValue = emailField.val().trim();

        if (emailValue.length > 3 && emailField.valid()) {
            $.ajax({
                url: '/accounts_action.php?action=check_email',
                type: 'POST',
                dataType: 'json',
                data: { email: emailValue },
                success: function (data) {
                    if (data.exists) {
                        emailField.addClass('input-error').removeClass('input-valid');
                        if (emailField.next('.email-exists').length === 0) {
                            emailField.after('<div class="formerror email-exists">Email già registrata!</div>');
                        }
                    } else {
                        emailField.removeClass('input-error').addClass('input-valid');
                        emailField.next('.email-exists').remove();
                    }
                }
            });
        }
    });
    
    /* FOLLOW IG PROFILE */
    $('#submit_form.register')
        .prop('disabled', true)
        .css({
            'opacity': 0.5,
            'pointer-events': 'none',
            'cursor': 'not-allowed'
    });

    $('#follow-instagram').on('click', function() {
        setTimeout(function() {
            $('.btnTools_follow').hide();
            
            $('#submit_form.register')
                .prop('disabled', false)
                .css({
                    'opacity': 1,
                    'pointer-events': 'auto',
                    'cursor': 'pointer'
                });
            $('#instagram-confirmation').show();
        }, 2000);
    });

    $('#account-form, #login_form').on('submit', function(e) {
        if ($('#submit_form.register').is(':disabled')) {
            e.preventDefault();
            alert('Per favore clicca prima su "Segui su Instagram" per continuare con la registrazione!');
        }
    });
    
    /* FORM - REGISTRATION ACCOUNTS */
    $('#account-form').validate({

        errorClass: 'formerror',
        errorElement: 'div',

        rules: {
            tf_nome: 'required',
            tf_cognome: 'required',
            tf_instagram: 'required',
            tf_email: { required: true, email: true },
            tf_password: { required: true },
            tf_confirmpassword: {
                required: true,
                equalTo: '[name="tf_password"]'
            },
            securityCode: 'required'
        },

        messages: {
            tf_nome: { required: 'campo richiesto!' },
            tf_cognome: { required: 'campo richiesto!' },
            tf_instagram: { required: 'campo richiesto!' },
            tf_email: { required: 'campo richiesto!', email: 'formato x@x.xxx!' },
            tf_password: { required: 'campo richiesto!' },
            tf_confirmpassword: {
                required: 'campo richiesto!',
                equalTo: 'le password non coincidono!'
            },
            securityCode: { required: 'inserisci il codice!' }
        },
        
        errorPlacement: function(error, element) {
            
        },
        
        highlight: function(element) {
            $(element).addClass('input-error').removeClass('input-valid');
        },

        unhighlight: function(element) {
            $(element).removeClass('input-error').addClass('input-valid');
        },

        submitHandler: function(form) {

            var formData = new FormData(form);

            $.ajax({

                url: "/process_registration.php",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                dataType: "json",

                beforeSend: function() {

                    $(".response_msg").css("display", "block").html('<div class="loading">Invio in corso...</div>');

                    setTimeout(function(){
                        $(".response_msg").addClass('show');
                    }, 10);
                },

                success: function(response) {

                    if (response.success) {

                        $(".success").css("display", "flex");

                        setTimeout(function(){
                            $(".success").addClass('show');
                        }, 10);

                        $("#registration-form")[0].reset();

                    } else {

                        $(".response_msg").css("display", "block").html('<div class="error">' + response.message + '</div>');

                        setTimeout(function(){
                            $(".response_msg").addClass('show');
                        }, 10);

                        setTimeout(function(){
                            $(".response_msg").removeClass('show');
                        }, 3000);
                    }
                },

                error: function() {

                    $(".response_msg").css("display", "block").html('<div class="error">Errore imprevisto. Riprova più tardi!</div>');

                    setTimeout(function(){
                        $(".response_msg").addClass('show');
                    }, 10);

                    setTimeout(function(){
                        $(".response_msg").removeClass('show');
                    }, 3000);
                }
            });

            return false;
        }
    });
	
	/* FORM - RECOVER PWD */    
    $('#recover-form').validate({
        
        errorClass: 'formerror',
        errorElement: 'div',

        rules: {
            tf_email: { required: true, email: true }
        },

        messages: {
            tf_email: { required: 'campo richiesto!', email: 'formato x@x.xxx!' }
        },
        
        errorPlacement: function(error, element) {
            
        },
        
        highlight: function(element) {
            $(element).addClass('input-error').removeClass('input-valid');
        },

        unhighlight: function(element) {
            $(element).removeClass('input-error').addClass('input-valid');
        },

        submitHandler: function(form) {
            
            var formData = new FormData(form);

            $.ajax({
                url: "/process_recover.php",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                dataType: "json",

                beforeSend: function() {
                    
                    $(".response_msg").css("display", "block").html('<div class="loading">Invio in corso...</div>');
                    setTimeout(function(){
                        $(".response_msg").addClass('show');
                    }, 10);
                    
                },

                success: function(response) {

                    if (response.success) {

                        $(".response_msg").html('<div class="loading">Password inviata con successo!</div>');

						setTimeout(function(){
							$(".success").addClass('show');
						}, 10);

						setTimeout(() => {
							window.location.href = response.redirect;
						}, 2000);

                    } else {

                        $(".response_msg").css("display", "block").html('<div class="error">' + response.message + '</div>');

                        setTimeout(function(){
                            $(".response_msg").addClass('show');
                        }, 10);

                        setTimeout(function(){
                            $(".response_msg").removeClass('show');
                        }, 3000);
                    }
                },

                error: function() {

                    $(".response_msg").css("display", "block").html('<div class="error">Errore imprevisto. Riprova più tardi!</div>');

                    setTimeout(function(){
                        $(".response_msg").addClass('show');
                    }, 10);

                    setTimeout(function(){
                        $(".response_msg").removeClass('show');
                    }, 3000);
                }
            });

            return false;
        }
    });
    
    /* FORM - LOGIN */    
    $('#login-form').validate({
        
        errorClass: 'formerror',
        errorElement: 'div',

        rules: {
            tf_email: { required: true, email: true },
            tf_password: { required: true },
            securityCode: 'required'
        },

        messages: {
            tf_email: { required: 'campo richiesto!', email: 'formato x@x.xxx!' },
            tf_password: { required: 'campo richiesto!' },
            securityCode: { required: 'inserisci il codice!' }
        },
        
        errorPlacement: function(error, element) {
            
        },
        
        highlight: function(element) {
            $(element).addClass('input-error').removeClass('input-valid');
        },

        unhighlight: function(element) {
            $(element).removeClass('input-error').addClass('input-valid');
        },

        submitHandler: function(form) {
            
            var formData = new FormData(form);
            var instagram = $('#tf_instagram').val().trim();
            var isInstagramRequired = $('#ig-info').is(':visible');

            if (isInstagramRequired && instagram === '') {
                alert("Inserisci il tuo profilo Instagram!");
                return false;
            }

            if (isInstagramRequired) {
                formData.append("instagram", instagram);
            }

            $.ajax({
                url: "/process_login.php",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                dataType: "json",

                beforeSend: function() {
                    
                    $(".response_msg").css("display", "block").html('<div class="loading">Invio in corso...</div>');
                    setTimeout(function(){
                        $(".response_msg").addClass('show');
                    }, 10);
                    
                },

                success: function(response) {
                    
                    if (response.success) {
                        $(".response_msg").html('<div class="loading">Login...</div>');
                        setTimeout(() => {
                            window.location.href = response.redirect;
                        }, 2000);
                        
                    } else if (response.require_instagram) {
                        
                        $(".response_msg").hide().html('');
                        $("#ig-info").show();
                        
                        $('#submit_form').addClass("register").prop('disabled', true).css({
                            'opacity': 0.5,
                            'pointer-events': 'none',
                            'cursor': 'not-allowed'
                        });
                        
                        // Abilita login quando campo IG compilato
                        $('#tf_instagram').on('input', function () {
                            const val = $(this).val().trim();
                            if (val !== '') {
                                $('#submit_form.register').prop('disabled', false).css({
                                    'opacity': 1,
                                    'pointer-events': 'auto',
                                    'cursor': 'pointer'
                                });
                            } else {
                                $('#submit_form.register').prop('disabled', true).css({
                                    'opacity': 0.5,
                                    'pointer-events': 'none',
                                    'cursor': 'not-allowed'
                                });
                            }
                        });
                        
                    } else {
                        
                        $(".response_msg").html(`<div class="error">${response.message}</div>`);
                        
                    }
                },

                error: function() {
                    $(".response_msg").css("display", "block").html('<div class="error">Errore imprevisto. Riprova più tardi!</div>');
                    setTimeout(function(){
                        $(".response_msg").addClass('show');
                    }, 10);
                    setTimeout(function(){
                        $(".response_msg").removeClass('show');
                    }, 3000);
                }
            });

            return false;
        }
    });
    
    /* VOTING SYSTEM */
    $('.vote-up, .vote-down').on('click', function () {

        var btn = $(this);
        var dj_id = btn.data('dj-id');
        var action = btn.hasClass('vote-up') ? 'add' : 'remove';

        $.ajax({
            url: '/accounts_action.php?action=vote',
            type: 'POST',
            dataType: 'json',
            data: { dj_id: dj_id, action: action },
            success: function (response) {

                if (response.success) {
                    
                    var contatore = $('#dj-voti-' + dj_id);
                    var tuoiVoti = $('#miei-voti-' + dj_id);
                    var totali = $('#voti-restanti');

                    var totaliVal = parseInt(totali.text());
                    var contVal = parseInt(contatore.text());
                    var mieiVal = parseInt(tuoiVoti.text());

                    if (action === 'add') {
                        contatore.text(contVal + 1);
                        tuoiVoti.text(mieiVal + 1);
                        totali.text(totaliVal - 1);
                    } else {
                        contatore.text(contVal - 1);
                        tuoiVoti.text(mieiVal - 1);
                        totali.text(totaliVal + 1);
                    }

                    var newMieiVal = (action === 'add') ? mieiVal + 1 : mieiVal - 1;
                    var downBtn = $('.vote-down[data-dj-id="' + dj_id + '"]');

                    if (newMieiVal > 0) {
                        downBtn.prop('disabled', false);
                    } else {
                        downBtn.prop('disabled', true);
                    }

                } else {
                    
                    $(".response_msg").css("display", "block").html('<div class="error">' + response.message + '</div>');
                    setTimeout(function () {
                        $(".response_msg").addClass('show');
                    }, 10);

                    setTimeout(function () {
                        $(".response_msg").removeClass('show');
                    }, 3000);
                }
            },
            error: function () {
                $(".response_msg").css("display", "block").html('<div class="error">Errore imprevisto. Riprova più tardi!</div>');
                setTimeout(function () {
                    $(".response_msg").addClass('show');
                }, 10);
                setTimeout(function () {
                    $(".response_msg").removeClass('show');
                }, 3000);
            }
        });
    });
    
    
});