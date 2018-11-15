jQuery(document).ready(function($) {
    //AOS
    AOS.init({
        duration: 1200,
    });
    //Slider
	$("#main__slider").owlCarousel({
	     items: 1,
	     nav: true,
	     navText: ["",""],
	});
	

    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    var slidesPerPage = 10;
    var syncedSecondary = true;

    sync1.owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: true,
        autoplay: false, 
        dots: true,
        responsiveRefreshRate: 200,
        navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #fff;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #fff;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
    }).on('changed.owl.carousel', syncPosition);

    sync2
        .on('initialized.owl.carousel', function() {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items: slidesPerPage,
            dots: true,
            nav: true,
            smartSpeed: 200,
            slideSpeed: 500,
            slideBy: slidesPerPage, 
            responsiveRefreshRate: 100
        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }

        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function(e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });

	//Tabs
	$(".tab_content_item").not(":first").hide();
	$(".tabs .tab_item").click(function() {
	  $(".tabs .tab_item").removeClass("current").eq($(this).index()).addClass("current");
	  $(".tab_content_item").hide().eq($(this).index()).fadeIn()
	}).eq(0).addClass("current");

	//Video player
	$('#play-video').on('click', function(e) {
		e.preventDefault();
	    $(this).fadeOut('slow');
	    $('.video__bg--wrap').fadeOut('slow');
	    player.playVideo();
	});

    //Scroll
        $(".main").onepage_scroll({
        sectionContainer: "section",
        responsiveFallback: 600,
        loop: true
      });
    
    $('.onepage-pagination li:first-child a').append('<p>Главная</p>');
    $('.onepage-pagination li:nth-child(2) a').append('<p>Наши преимущества</p>');
    $('.onepage-pagination li:nth-child(3) a').append('<p>О комплексе</p>');
    $('.onepage-pagination li:nth-child(4) a').append('<p>Планировки</p>');
    $('.onepage-pagination li:nth-child(5) a').append('<p>Видео</p>');
    $('.onepage-pagination li:nth-child(6) a').append('<p>Галерея</p>');
    $('.onepage-pagination li:nth-child(7) a').append('<p>Новости</p>');
    $('.onepage-pagination li:nth-child(8) a').append('<p>Контакты</p>');

    $(".to__second").on('click', function() {
        $('html, body').animate({
            scrollTop: ($('#second').offset().top)
        },1000);
    });
    $(".to__third").on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: ($('#third').offset().top)
        },1000);
    });
    $(".to__fourth").on('click', function() {
        $('html, body').animate({
            scrollTop: ($('#fourth').offset().top)
        },1000);
    });
    $(".to__fifth").on('click', function() {
        $('html, body').animate({
            scrollTop: ($('#fifth').offset().top)
        },1000);
    });
    $(".to__sixth").on('click', function() {
        $('html, body').animate({
            scrollTop: ($('#sixth').offset().top)
        },1000);
    });
    $(".to__seventh").on('click', function() {
        $('html, body').animate({
            scrollTop: ($('#seventh').offset().top)
        },1000);
    });
    $(".to__footer").on('click', function() {
        $('html, body').animate({
            scrollTop: ($('#footer').offset().top)
        },1000);
    });

    //Language
    $('.language__block a').on('click', function(e) {
        e.preventDefault();
         $('.language__block a').removeClass("active").eq($(this).index()).addClass("active");
    });

    //Menu
    $('.hamburger__box').on('click', function(e) {
        $('.header--nav').css('right', '0');
    })
    $('.close__menu--button').on('click', function(e) {
        e.preventDefault();
        $('.header--nav').css('right', '-100%');
    })

});

//Youtube iframe

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('video', {
        height: '805',
        width: '1525',
        videoId: 'JpZEOGApMDI',
    });

}

// 4. The API will call this function when the video player is ready.

function onPlayerReady(event) {
    //event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
/*
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}

function playVideo() {
    player.playVideo();
}*/


//Map
     function initMap() {
       var uluru = {lat: 50.5126838, lng: 30.4474550};
       var map = new google.maps.Map(
           document.getElementById('map'), {
               zoom: 17,
               center: uluru,
               disableDefaultUI: true
            });
       var iconBase = 'img/';
       var marker = new google.maps.Marker({
          position: uluru,
           map: map,
           icon: iconBase + 'marker.png'
       });
     }