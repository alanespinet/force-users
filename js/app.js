(function($){
    // DESKTOP MENU ACCESSIBILITY
    $('.main-menu-desktop a[aria-haspopup]').on('click', function(e){
        e.preventDefault();
        clearOpenMenusDesktop();

        var _open = $(this).attr('aria-expanded');
        if( _open.toLowerCase() === 'false' ){
            $(this).siblings('ul').css('display', 'block');
            $(this).attr('aria-expanded', 'true');
        }
    });

    function clearOpenMenusDesktop(){
        $('.main-menu-desktop a[aria-haspopup]').siblings('ul').each( function(){
            $(this).removeAttr('style');
        });

        $('.main-menu-desktop a[aria-haspopup]').each( function(){
            $(this).attr('aria-expanded', 'false');
        });
    }

    // MOBILE MENU ACCESSIBILITY
    $('#menu-toggler-mobile').on('click', function(e){
        e.preventDefault();
        clearOpenMenusMobile();

        var _open = $(this).attr('aria-expanded');
        var _controls = $(this).attr('aria-controls');
        
        if( _open.toLowerCase() === 'false' ){
            $('#' + _controls).css('display', 'block');
            $(this).attr('aria-expanded', 'true');
        } else {
            $('#' + _controls).removeAttr('style');
            $(this).attr('aria-expanded', 'false');
        }
    });

    $('.main-menu-mobile a[aria-haspopup]').on('click', function(e){
        e.preventDefault();
        clearOpenMenusMobile();

        var _open = $(this).attr('aria-expanded');
        if( _open.toLowerCase() === 'false' ){
            $(this).siblings('ul').css('display', 'block');
            $(this).attr('aria-expanded', 'true');
        }
    });

    function clearOpenMenusMobile(){
        $('.main-menu-mobile a[aria-haspopup]').siblings('ul').each( function(){
            $(this).removeAttr('style');
        });

        $('.main-menu-mobile a[aria-haspopup]').each( function(){
            $(this).attr('aria-expanded', 'false');
        });
    }

    function resetMobileMenuButton(){
        $('#menu-toggler-mobile').attr('aria-expanded', 'false');
        $('.main-menu-mobile').removeAttr('style');
    }

    // BOTH DESKTOP AND MOBILE
    $('main').on('click', function(){
        clearOpenMenusDesktop();
        clearOpenMenusMobile();
        resetMobileMenuButton();
    });

    // MEDIA QUERIES TO CLEAN MENUS ON SCREEN CHANGE
    var mq_mobile = window.matchMedia('(max-width: 767px)');
    var mq_not_mobile = window.matchMedia('(min-width: 768px)');

    function scl_change(e){
        if( e.matches ){
            clearOpenMenusDesktop();
            clearOpenMenusMobile();
            resetMobileMenuButton();
        }
    }

    mq_mobile.addListener( scl_change );
    mq_not_mobile.addListener( scl_change );
})(jQuery);
