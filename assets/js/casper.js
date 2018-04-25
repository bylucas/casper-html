
jQuery(document).ready(function ($) {
// NOTE: Scroll performance is poor in Safari
// - this appears to be due to the events firing much more slowly in Safari.
//   Dropping the scroll event and using only a raf loop results in smoother
//   scrolling but continuous processing even when not scrolling

 var $postContent = $(".post-full-content");
    $postContent.fitVids();
    // End fitVids
    //$body              = $('body');
    var progressBar = document.querySelector('.progress');
    var header = document.querySelector('.floating-header');
    var title = document.querySelector('.post-full-title');

    var lastScrollY = window.scrollY;
    var lastWindowHeight = window.innerHeight;
    var lastDocumentHeight = $(document).height();
    var ticking = false;


    function onScroll() {
        lastScrollY = window.scrollY;
        requestTick();
    }

    function onResize() {
        lastWindowHeight = window.innerHeight;
        lastDocumentHeight = $(document).height();
        requestTick();
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(update);
        }
        ticking = true;
    }

    function update() {
        var trigger = title.getBoundingClientRect().top + window.scrollY;
        var triggerOffset = title.offsetHeight + 35;
        var progressMax = lastDocumentHeight - lastWindowHeight;
        var nav = document.querySelector('.post-template .site-header');

        // show/hide floating header
        if (lastScrollY >= trigger + triggerOffset) {
            header.classList.add('floating-active');
        } else {
            header.classList.remove('floating-active');
        }

        if ($body.hasClass('search-open')){
            header.classList.remove('floating-active');
            nav.classList.add('fixed-head');
            } else {
                nav.classList.remove('fixed-head');
        }

        if ($body.hasClass('offcanvas-open')){
            header.classList.remove('floating-active');
            nav.classList.add('fixed-head');
            } else {
                nav.classList.remove('fixed-head');
        }

        progressBar.setAttribute('max', progressMax);
        progressBar.setAttribute('value', lastScrollY);

        ticking = false;
    }

    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onResize, false);

    update();

    // Adds delay to author card dropups to disappear. This gives enough
// time for the user to interact with the author card while they move
// the mouse from the avatar to the card. Also makes space for the
// interacted avatar.

 var hoverTimeout;
    var direction = 'left';

    $('.author-list-item:first-child').addClass('first-child');

    function makeSpaceForAvatar(avatar) {
        if (avatar.hasClass('first-child')) {
            return;
        }

        $('.author-list-item').each(function(i, obj) {

            if ($(this)[0] != avatar[0]) {
                if (Number($(this).css('z-index')) > Number(avatar.css('z-index'))) {
                    $(this).children('.moving-avatar').addClass('left');
                } else {
                    $(this).children('.moving-avatar').addClass('right');
                }
            }

        });
    }

    $('.author-list-item').hover(function(){
        var $this = $(this);

        clearTimeout(hoverTimeout);

        $('.author-card').removeClass('hovered');
        $(this).children('.author-card').addClass('hovered');

        makeSpaceForAvatar($this);
    }, function() {
        var $this = $(this);

        $('.author-list-item').children('.moving-avatar').removeClass('left right');

        hoverTimeout = setTimeout(function() {
            $this.children('.author-card').removeClass('hovered');
        }, 800);
    });


}); // end page load scripts