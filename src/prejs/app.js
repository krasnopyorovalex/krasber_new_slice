jQuery(document).ready(function() {

    [].forEach.call(document.querySelectorAll('img[data-src]'),function(img) {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.onload = function() {
            var figure = img.parentNode.parentNode;
            figure.classList.remove("is__loaded");
            img.removeAttribute('data-src');
        };
    });

    var owl = jQuery('.guestbook .owl-carousel'),
        mainSection = jQuery("main"),
        body = jQuery("body");

    if (owl.length) {
        owl.owlCarousel({
            loop:true,
            margin:10,
            nav:false,
            items: 1
        });
    }

    var owlSeoPos = jQuery('.seo_positions');

    if (owlSeoPos.length) {
        owlSeoPos.owlCarousel({
            loop:true,
            margin: 0,
            nav:false,
            items: 1
        });
    }

    var adsCarousel = jQuery(".ads__carousel");
    if (adsCarousel.length) {
        adsCarousel.owlCarousel({
            loop:true,
            autoplay: true,
            margin:2,
            dots:false,
            nav:false,
            items: 1
        });
    }

    var stickyMenu = jQuery(".sticky__menu");
    if(stickyMenu.length) {
        var header = jQuery("header"),
            height = header.height();
        height = height - 100;

        if (window.innerWidth > 992) {
            jQuery(window).scroll(function(){
                if (window.pageYOffset >= height) {
                    return stickyMenu.addClass("sticky");
                }
                return stickyMenu.removeClass("sticky");
            });
        }

        stickyMenu.on("click", ".icon", function () {

            var _this = jQuery(this);
            _this.closest(".sticky__menu").toggleClass("is__open");
            body.toggleClass("not__overflow");

            if(_this.hasClass("menu")) {
                _this.removeClass("menu").addClass("close");
                return _this.find("use").attr("xlink:href", "../img/symbols.svg#close");
            }
            _this.removeClass("close").addClass("menu");

            return _this.find("use").attr("xlink:href", "../img/symbols.svg#menu");
        });

        stickyMenu.on("click", "nav>ul>li span", function () {
            var _this = jQuery(this);
            if( _this.next('ul').is(':hidden') ) {
                _this.next('ul').slideDown();
            } else {
                _this.next('ul').slideUp();
            }
            return false;
        });
    }

    var callPopup = jQuery("section.tariffs,.ad");
    if(callPopup.length) {
        var popup = jQuery(".popup"),
            popupBg = jQuery(".popup__show-bg");
        callPopup.on("click", ".call__popup", function (e) {
            e.preventDefault();
            popup.find("form select option[value='" + jQuery(this).attr("data-service") + "']").prop("selected", true);
            return popup.fadeIn() && popupBg.show();
        });
        popup.on("click", ".close", function () {
            return popup.fadeOut("slow") && popupBg.fadeOut();
        });
    }

    var faq = mainSection.find(".faq");
    if(faq.length) {
        faq.on("click", "li .q", function () {
            var _this = jQuery(this),
                parent = _this.parent("li");
            faq.find(".a").hide();
            if(parent.hasClass("active")) {
                return faq.find("li").removeClass("active");
            }
            return faq.find("li").removeClass("active") && _this.next(".a").fadeIn("slow") && parent.addClass("active");
        });
    }

    var filterCategories = jQuery(".filter__categories"),
        portfolioList = jQuery(".portfolio__list");
    if(filterCategories.length) {
        filterCategories.on("click", "li", function () {
            var _this = jQuery(this),
                filter = _this.attr("data-filter");

            if (filter) {
                portfolioList.find(" > div").hide().fadeIn().filter(":not(."+filter+")").hide();
            }

            filterCategories.find("li").removeClass("active");
            return _this.addClass("active") && filterCategories.toggleClass("is__opened");
        });
        filterCategories.on("click", ".btn__arrow", function () {
            return filterCategories.find("li.active").click();
        });
    }

    var tariffs = jQuery(".tariffs");
    if(tariffs.length && window.innerWidth <= 992) {
        tariffs.on("click", ".tariff .box", function () {
            var _this = jQuery(this);
            return _this.closest(".tariff").toggleClass("is__open") && _this.closest(".tariff").find(".body").slideToggle();
        });
    }

    jQuery('form input[name=phone]').mask('+0 (000) 000-00-00', {placeholder: "+_ (___) ___-__-__"});

    var serviceName = jQuery(".container h1");
    if(serviceName.length) {
        jQuery(".order__service select option[value='" + serviceName.text() + "']").attr("selected", "selected");
    }

    lightbox.option({
        'albumLabel': 'Изображение %1 из %2'
    });

    var stepsForm = jQuery('.steps_form');
    if (stepsForm.length) {

        var maxSteps = stepsForm.find('fieldset').length,
            result = stepsForm.find('.result');
        stepsForm.append('<div class="error_change">Выберите, пожалуйста, необходимый вариант</div>');
        var errorMsg = stepsForm.find('.error_change');

        stepsForm.on('click', 'fieldset li', function () {
            var _this = jQuery(this),
                parentFieldset = jQuery(this).closest('fieldset');

            if (parentFieldset.hasClass('multiple')) {
                _this.toggleClass('active');
                var activeValues = parentFieldset.find('li.active').toArray();
                activeValues = jQuery.map(activeValues, function (t) {
                    return jQuery(t).text().trim();
                });

                if (activeValues.length) {
                    parentFieldset.find('input[type=hidden]').val(activeValues.join(', '));
                } else {
                    parentFieldset.find('input[type=hidden]').val('');
                }
            } else {
                _this.siblings('li').removeClass('active');
                _this.addClass('active');
                parentFieldset.find('input[type=hidden]').val(parentFieldset.find('li.active').text().trim());
            }

            return parentFieldset.find('input:visible').val('');
        });

        stepsForm.on("keyup", "fieldset input", function () {
            var _this = jQuery(this);
            _this.closest('fieldset').find('input[type=hidden]').val(_this.val().trim());

            return jQuery(this).closest('fieldset').find('li').removeClass('active');
        });

        stepsForm.on("click", '.continue, .previous', function () {
            var _this = jQuery(this),
                value = _this.closest('fieldset').find('input[type=hidden]').val(),
                fieldset = _this.closest('fieldset'),
                step = fieldset.attr('data-step');

            if (value.length > 0 && ! _this.hasClass('previous')) {
                stepsForm.find('.steps_form-step li').eq(step - 1).toggleClass('success');
                step++;

                if (step === maxSteps) {
                    var inputs = stepsForm.find('fieldset input[type=hidden]').toArray(),
                        txtResult = '<ol>';
                    jQuery.map(inputs, function (t,i) {
                        var currentInput = jQuery(t);

                        txtResult += '<li><b>' + stepsForm.find('.steps_form-step li').eq(i).find('div').text() + '</b> - ' + currentInput.val() + '</li>';
                    });
                    txtResult += '</ol>';
                    result.html(txtResult);
                }

                if (step > maxSteps) {
                    return false;
                }
            } else if (_this.hasClass('previous')) {
                step--;
                stepsForm.find('.steps_form-step li').eq(step-1).toggleClass('success');
            } else {
                return errorMsg.fadeIn().delay(1500).fadeOut();
            }

            if(window.innerWidth <= 992) {
                jQuery.scrollTo(jQuery(stepsForm), 750,  {offset: {top:20} });
            }

            return fieldset.hide().removeClass('active') && stepsForm.find('fieldset[data-step='+ step +']').fadeIn().addClass('active');;
        });

        stickyMenu.on("submit", "form", function () {
            return stepsForm.find('li:last-child').addClass('success');
        });
    }

    jQuery("form").on("keyup", "input[name=name]", function () {
        var _this = jQuery(this),
            value = _this.val().replace(/[^а-яА-ЯёЁ\s]/ig,'');
        return _this.val(value);
    });

    /*
    |-----------------------------------------------------------
    |   notification
    |-----------------------------------------------------------
    */
    var Notification = {
        element: false,
        setElement: function (element) {
            this.element = element;
        },
        notify: function (message) {
            if( ! this.element) {
                this.setElement(jQuery(".notify"));
            }
            return this.element.html('<div>' + message + '</div>') && this.element.fadeIn().delay(7000).fadeOut();
        }
    };

    formHandler("#order__service-form", Notification);
    formHandler("#order__service-form_content", Notification);
    formHandler("#order__service-form_bottom", Notification);
    formHandler("#order__consultation-form", Notification);
    //formHandler("#subscribe__form", Notification);
    formHandler("#quiz__form", Notification);
    formHandler("#order__tariff-form", Notification, callPopup);
    formHandler("#order__service-form-banner", Notification, callPopup);
});

function formHandler(selector, Notification, callPopup) {
    return jQuery(document).on("submit", selector, function(e){
        e.preventDefault();
        var _this = jQuery(this),
            url = _this.attr('action'),
            data = _this.serialize(),
            submitBlock = _this.find(".submit__block"),
            agree = _this.find(".agree__block input[type=checkbox]");
        if (agree.length && ! agree.prop("checked")) {
            agree.parent(".agree__block").find(".error").fadeIn().delay(3000).fadeOut();
            return false;
        }
        return jQuery.ajax({
            type: "POST",
            dataType: "json",
            url: url,
            data: data,
            beforeSend: function(jqXHR, settings) {
                return submitBlock.addClass("is__sent");
            },
            success: function (data) {
                if(typeof callPopup !== "undefined" && callPopup.length) {
                    jQuery(".popup").fadeOut("slow") && jQuery(".popup__show-bg").fadeOut();
                }
                Notification.notify(data.message);
                return submitBlock.removeClass("is__sent") && _this.trigger("reset");
            }
        });
    });
}
jQuery(document).ajaxError(function () {
    return jQuery("form .submit__block").removeClass("is__sent") && jQuery('.notify').html('<div>Произошла ошибка =(</div>').fadeIn().delay(3000).fadeOut();
});
function addLink() {
    var body_element = document.getElementsByTagName('body')[0];
    var selection = window.getSelection();

    // Вы можете изменить текст в этой строчке
    var pagelink = "<p>Источник: <a href='"+document.location.href+"'>"+document.location.href+"</a> - Читать подробнее</p>";
    var copytext = selection + pagelink;
    var newdiv = document.createElement('div');
    newdiv.style.position = 'absolute';
    newdiv.style.left = '-99999px';
    body_element.appendChild(newdiv);
    newdiv.innerHTML = copytext;
    selection.selectAllChildren(newdiv);
    window.setTimeout( function() {
        body_element.removeChild(newdiv);
    }, 0);
}
document.oncopy = addLink;
