/*-----------------------------------------------------------------------------------

    Theme Name: Maliya | Responsive Bootstrap 4 Onepage Template 
	Theme URI: http://
	Description: The Multi-Purpose Onepage Template
	Author: ImTyaZz
	Author Email: imtyaz3322@gmail.com 
	Version: 1.0
-----------------------------------------------------------------------------------*/

$(function () {

    "use strict";

    var wind = $(window);


    // scrollIt
    $.scrollIt({
        upKey: 38, // key code to navigate to the next section
        downKey: 40, // key code to navigate to the previous section
        easing: 'swing', // the easing function for animation
        scrollTime: 500, // how long (in ms) the animation takes
        activeClass: 'active', // class given to the active nav element
        onPageChange: null, // function(pageIndex) that is called when page is changed
        topOffset: -63 // offste (in px) for fixed top navigation
    });



    // navbar scrolling background
    wind.on("scroll", function () {

        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar"),
            logo = $(".navbar .logo> img");

        if (bodyScroll > 100) {

            navbar.addClass("nav-scroll");
            logo.attr('src', 'img/logo-dark.png');

        } else {

            navbar.removeClass("nav-scroll");
            logo.attr('src', 'img/logo-light.png');
        }
    });



    // progress bar
    wind.on('scroll', function () {
        $(".skills-progress span").each(function () {
            var bottom_of_object =
                $(this).offset().top + $(this).outerHeight();
            var bottom_of_window =
                $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-value');
            if (bottom_of_window > bottom_of_object) {
                $(this).css({
                    width: myVal
                });
            }
        });
    });



    // sections background image from data background
    var pageSection = $(".bg-img, section");
    pageSection.each(function (indx) {

        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });


    // === owl-carousel === //

    // Testimonials owlCarousel
    $('.testimonials .owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        margin: 15,
        mouseDrag: false,
        autoplay: true,
        smartSpeed: 500
    });

    // Brand owlCarousel
    $('.brand .owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        mouseDrag: false,
        dots: false,
        autoplay: true,
        smartSpeed: 500,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            500: {
                items: 2
            },
            700: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    });

    // Blog owlCarousel
    $('.blog .owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        mouseDrag: false,
        autoplay: true,
        smartSpeed: 500,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            700: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });


    // magnificPopup
    $('.gallery').magnificPopup({
        delegate: '.link',
        type: 'image',
        gallery: {
            enabled: true
        }
    });


    // countUp
    $('.numbers .count').countUp({
        delay: 10,
        time: 1500
    });


});


// === window When Loading === //

$(window).on("load", function () {

    var wind = $(window);

    // Preloader
    $(".loading").fadeOut(500);


    // stellar
    wind.stellar();


    // isotope
    $('.gallery').isotope({
        // options
        itemSelector: '.items'
    });

    var $gallery = $('.gallery').isotope({
        // options
    });

    // filter items on button click
    $('.filtering').on('click', 'span', function () {

        var filterValue = $(this).attr('data-filter');

        $gallery.isotope({
            filter: filterValue
        });

    });

    $('.filtering').on('click', 'span', function () {

        $(this).addClass('active').siblings().removeClass('active');

    });


    // contact form validator
    $('#contact-form').validator();

    $('#contact-form').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data) {
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    if (messageAlert && messageText) {
                        $('#contact-form').find('.messages').html(alertBox);
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    });

});

// Scroll To Top
var html, body, scrollToTopButton;
window.onload = function () {
    html = document.documentElement;
    body = document.body;
    scrollToTopButton = document.getElementById("scrollToTopButton");
};

function scrollToTop(totalTime, easingPower) {
    //console.log("here");
    var timeInterval = 1; //in ms
    var scrollTop = Math.round(body.scrollTop || html.scrollTop);
    //var by=- scrollTop;
    var timeLeft = totalTime;
    var scrollByPixel = setInterval(function () {
        var percentSpent = (totalTime - timeLeft) / totalTime;
        if (timeLeft >= 0) {
            var newScrollTop = scrollTop * (1 - easeInOut(percentSpent, easingPower));
            body.scrollTop = newScrollTop;
            html.scrollTop = newScrollTop;
            //console.log(easeInOut(percentSpent,easingPower));
            timeLeft--;
        } else {
            clearInterval(scrollByPixel);
            //Add hash to the url after scrolling
            //window.location.hash = hash;
        }
    }, timeInterval);
}

function easeInOut(t, power) {
    if (t < 0.5) {
        return 0.5 * Math.pow(2 * t, power);
    } else {
        return 0.5 * (2 - Math.pow(2 * (1 - t), power));
    }
}

window.onscroll = controlScrollToTopButton;

function controlScrollToTopButton() {
    var windowInnerHeight = 0.6 * window.innerHeight;
    if (
        body.scrollTop > windowInnerHeight ||
        html.scrollTop > windowInnerHeight
    ) {
        scrollToTopButton.classList.add("show");
    } else {
        scrollToTopButton.classList.remove("show");
    }
}