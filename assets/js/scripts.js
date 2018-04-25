
jQuery(document).ready(function ($) {

$body              = $('body'),
$mainHeader        = $('#masthead'),
$offcanvasToggle   = $('.offcanvas-toggle'),
$offcanvasMenu     = $('#offcanvas-menu'),
$searchToggle      = $('.search-toggle'),
$searchMenu        = $('#search-menu'),
$searchInner       = $('#search-menu .search-inner'),
$searchResults     = $('#search-results'),
$searchForm        = $('#searchform'),
$searchFormInput   = $('#searchform #s'),
 lastScrollTop     = 0,
 timer             = 800;


// Wait for window load
  setTimeout(function(){
    $body.addClass('loaded');
  }, 1000);

 $(window).scroll(function(event){
            if(timer) {
                window.clearTimeout(timer);
            }

            timer = window.setTimeout(function() {
              var st = $(this).scrollTop();
              if (st > lastScrollTop){
                // Scroll down
                if (st >= 10) {
                  $mainHeader.removeClass('active-header dark');
                }
              } else {
                // Scroll up
                if (st <= 200) {
                  $mainHeader.removeClass('dark').addClass('active-header');
                } else {
                  $mainHeader.addClass('active-header dark');
                }
              }
              lastScrollTop = st;
            }, 20);
          });

////////////////////////////////////////////////

$offcanvasToggle.click( function(e) {
            // Remove default action
              e.preventDefault();
            // Toggle open/close classes
              if ($body.hasClass('search-open')){
                $body.removeClass('search-open');
                $searchMenu.fadeOut(300);
                $offcanvasMenu.delay(300).fadeToggle();
              } else {
                $offcanvasMenu.fadeToggle(300);
              }
              $body.toggleClass('offcanvas-open');
              $mainHeader.toggleClass('remove-dark');
               $mainHeader.addClass('active-header');


              // if ($body.hasClass('single-opinions')){
              //   $('#main-header').toggleClass('remove-gradient');
              //   $('#opinion-single-progress').toggleClass('remove-bar');
              // }

            // Disable fullpage scroll
              // if ($body.hasClass('offcanvas-open') && $body.hasClass('home')){
              //   $.fn.fullpage.setMouseWheelScrolling(false);
              //   $.fn.fullpage.setAllowScrolling(false);
              // } else if ($body.hasClass('home')){
              //   $.fn.fullpage.setMouseWheelScrolling(true);
              //   $.fn.fullpage.setAllowScrolling(true);
              // }

          });

///

 $searchToggle.click( function(e) {
            // Remove default action
              e.preventDefault();
            // Toggle open/close classes
              if ($body.hasClass('offcanvas-open')){
                $body.removeClass('offcanvas-open');
                $offcanvasMenu.fadeOut(300);
                $searchMenu.delay(300).fadeToggle();
              } else {
                $searchMenu.fadeToggle(300);
                $('input#s').focus();
              }
              $body.toggleClass('search-open');
               $mainHeader.toggleClass('remove-dark');
               $mainHeader.addClass('active-header');
            // Disable fullpage scroll
              // if ($body.hasClass('search-open') && $body.hasClass('home')){
              //   $.fn.fullpage.setMouseWheelScrolling(false);
              //   $.fn.fullpage.setAllowScrolling(false);
              // } else if ($body.hasClass('home')) {
              //   $.fn.fullpage.setMouseWheelScrolling(true);
              //   $.fn.fullpage.setAllowScrolling(true);
              // }

          });


  var searchLoader = '<div id="search-loader-wrap"><div id="search-loader"></div></div>';

         function fetch() {

            $.ajax({
              url: myAjax.ajaxurl,
              type: 'POST',
              dataType: 'html',
              data: {
              action: '',
              s: jQuery('#s').val()
              },

              
              success: function (data) {
                  
                if (data === '' || !$.trim($searchFormInput.val()).length){
                  $searchResults.empty();
                  $searchResults.fadeOut('fast');
                } else {
                  $searchResults.empty().append(data).fadeIn('slow');
                }

              },
              complete: function(){
                searchQueryFinish();
              },
              //error: function (errorThrown) {
                  
              //}
            });

          }

          var typingTimer; // timer object
          var doneTypingInterval = 800; // timer interval

          // Prevent default form submit
          $searchForm.submit( function(e){
            e.preventDefault();
          });

          // Detect user input on the search field
          $searchFormInput.on('input',function(){
            clearTimeout(typingTimer); // clear timeout
            typingTimer = setTimeout(passSearchQuery, doneTypingInterval); // add timeout of interval to run query function
          });

          // Pass search query to AJAX
          function passSearchQuery(){

            $inputVal = $searchFormInput.val();

            if (!$.trim($inputVal).length){
              $searchResults.empty();
              searchQueryFinish();
            } else {
              searchQueryBegin();
              fetch($inputVal);
            }

          }

          // Start of query fades/appends
          function searchQueryBegin(){
            $searchInner.append(searchLoader);
            $('#search-loader-wrap').fadeIn('slow');
            $searchResults.fadeOut('fast');
          }

          // End of query fades/appends
          function searchQueryFinish(){
             $('#search-loader-wrap').remove();
            
            $searchResults.fadeIn('slow');
          }


////////////////////////////////////////////////////////////////////
// SIMPLE IMAGE ROLLOVER - set the image class to 'rollover' and have a image-name_off.ext and image-name_on.ext available. ext - eg .png, .jpg

    $("img.rollover").hover(
        function () {
            this.src = this.src.replace("_off", "_on");
        },
        function () {
            this.src = this.src.replace("_on", "_off");
        });

    // Back to top
    $(window).scroll(function() {
  var backToTopButton = $(".back-to-top");
  if ($(window).scrollTop() >= 200) {
    backToTopButton.css("bottom", "0px");
  } else {
    backToTopButton.attr('style', '');
  }
  backToTopButton.click(function() {
    $('body,html').stop().animate({
      scrollTop: 0
    }, 1000);
  });
  return false;
});

    // Page scrolling script
// $('a[href*="#"]:not([href="#"], [title])').click(function () {
//   if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
//     var target = $(this.hash);
//     target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//     if (target.length) {
//     $('html,body').animate({
//     scrollTop: target.offset().top
// }, 1000);
//     return false;
// }
// }
// });

 //Menu
   $(function() {
  var Accordion = function(el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;

    // Variables privadas
    var links = this.el.find('.link');
    // Evento
    links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
  }

  Accordion.prototype.dropdown = function(e) {
    var $el = e.data.el;
      $this = $(this),
      $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');

    if (!e.data.multiple) {
      $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
    };
  } 

  var accordion = new Accordion($('#accordion'), false);
});

    /////////////////////

    $(".accordion-tabs-minimal").each(function(i){$(this).children("li").first().children("a").addClass("is-active").next().addClass("is-open").show()}),$(".accordion-tabs-minimal").on("click","li > a.tab-link",function(i){if($(this).hasClass("is-active"))i.preventDefault();else{i.preventDefault();var s=$(this).closest(".accordion-tabs-minimal");s.find(".is-open").removeClass("is-open").hide(),$(this).next().toggleClass("is-open").toggle(),s.find(".is-active").removeClass("is-active"),$(this).addClass("is-active")}})

$(".md-input").focus(function() {
  $(this).parent().addClass("is-active is-completed");
});

$(".md-input").focusout(function() {
  if ($(this).val() === "") {
    $(this).parent().removeClass("is-completed");
  }
  $(this).parent().removeClass("is-active");
});

    }); // end page load scripts