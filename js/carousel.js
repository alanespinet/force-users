(function($){
    var can_move = true;

    $('body').on('click', '.carousel .next-button', function(e){
        e.preventDefault();
        
        if( can_move ){
            can_move = false;

            var carousel_parent = $(this).parents('.carousel');
            var elements_wrapper = carousel_parent.find('.elements-wrapper');
            var wrapper_width = elements_wrapper.css('width');
            var wrapper_width_numeric = parseFloat(wrapper_width);
            var items_count = parseInt( carousel_parent.attr('data-items') );
            var current_item = parseInt( carousel_parent.attr('data-showing-item') );

            if( current_item < items_count ){                
                var wrapper_left = parseFloat( elements_wrapper.css('left') );
                var new_left = wrapper_left - wrapper_width_numeric;
                elements_wrapper.css('left', new_left + 'px');
                current_item++;
                carousel_parent.attr('data-showing-item', current_item);
            } else {
                // loop
                var first_element_clone = carousel_parent.find('.element[data-item="1"]').clone();
                elements_wrapper.append( first_element_clone );
                var wrapper_left = parseFloat( elements_wrapper.css('left') );
                var new_left = wrapper_left - wrapper_width_numeric;
                elements_wrapper.css('left', new_left + 'px');

                setTimeout( function(){
                    elements_wrapper.css('transition', 'none');
                    elements_wrapper.css('left', '0');
                    first_element_clone.remove();
                    current_item = 1;
                    carousel_parent.attr('data-showing-item', current_item);

                    setTimeout( function(){
                        elements_wrapper.removeAttr('style');
                    }, 50 );
                }, 550 );

            }

            // elements visibility for SR
            carousel_parent.find('.element').attr('aria-hidden', 'true');
            carousel_parent.find('.element[data-item="' + current_item + '"]').attr('aria-hidden', 'false');

            // elements focusable
            carousel_parent.find('.element a').attr('tabindex', '-1');
            carousel_parent.find('.element[data-item="' + current_item + '"] a').attr('tabindex', '0');
            carousel_parent.find('.element input').attr('tabindex', '-1');
            carousel_parent.find('.element[data-item="' + current_item + '"] input').attr('tabindex', '0');
            carousel_parent.find('.element button').attr('tabindex', '-1');
            carousel_parent.find('.element[data-item="' + current_item + '"] button').attr('tabindex', '0');

            setTimeout( function(){ can_move = true; }, 600 );
        }
    });

    $('body').on('click', '.carousel .prev-button', function(e){
        e.preventDefault();

        if( can_move ){
            can_move = false;

            var carousel_parent = $(this).parents('.carousel');
            var elements_wrapper = carousel_parent.find('.elements-wrapper');
            var wrapper_width = elements_wrapper.css('width');
            var wrapper_width_numeric = parseFloat(wrapper_width);
            var items_count = parseInt( carousel_parent.attr('data-items') );
            var current_item = parseInt( carousel_parent.attr('data-showing-item') );
    
            if( current_item > 1 ){
                var wrapper_left = parseFloat( elements_wrapper.css('left') );
                var new_left = wrapper_left + wrapper_width_numeric;
                elements_wrapper.css('left', new_left + 'px');
                current_item--;
                carousel_parent.attr('data-showing-item', current_item);
            } else {
                // loop
                var last_element_clone = carousel_parent.find('.element[data-item="' + items_count + '"]').clone();
                var wrapper_left = parseFloat( elements_wrapper.css('left') );
                var new_left = wrapper_left + wrapper_width_numeric;
                elements_wrapper.css('transition', 'none');
                elements_wrapper.prepend( last_element_clone );
                elements_wrapper.css('left', (-1 * wrapper_width_numeric) + 'px');

                setTimeout( function(){
                    elements_wrapper.removeAttr('style');
                }, 10);

                setTimeout( function(){
                    var total_left = wrapper_width_numeric * (items_count - 1) * -1;
                    elements_wrapper.css('transition', 'none');
                    elements_wrapper.css('left', total_left + 'px');
                    last_element_clone.remove();
                    current_item = items_count;
                    carousel_parent.attr('data-showing-item', current_item);

                    setTimeout( function(){
                        elements_wrapper.css('transition', 'left .5s ease');
                    }, 50 );
                }, 550);
            }

            // elements visibility for SR
            carousel_parent.find('.element').attr('aria-hidden', 'true');
            carousel_parent.find('.element[data-item="' + current_item + '"]').attr('aria-hidden', 'false');

            // elements focusable
            carousel_parent.find('.element a').attr('tabindex', '-1');
            carousel_parent.find('.element[data-item="' + current_item + '"] a').attr('tabindex', '0');
            carousel_parent.find('.element input').attr('tabindex', '-1');
            carousel_parent.find('.element[data-item="' + current_item + '"] input').attr('tabindex', '0');
            carousel_parent.find('.element button').attr('tabindex', '-1');
            carousel_parent.find('.element[data-item="' + current_item + '"] button').attr('tabindex', '0');

            setTimeout( function(){ 
                can_move = true; 
            }, 600 );
        }
    });

    function carouselCreation(){
        $('.carousel').each( function(){
            var items_count = $(this).find('.element').length;
            
            $(this).attr('aria-label', 'carousel of ' + items_count + ' elements');
            $(this).attr('data-items', items_count);
            $(this).attr('data-showing-item', '1');
            
            var $prev_button = $('<a href="#" role="button" aria-label="previous element" class="prev-button"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>');
            var $next_button = $('<a href="#" role="button" aria-label="next element" class="next-button"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>');

            $(this).prepend( $prev_button );

            var $elements_container = $('<div class="elements-container"></div>');
            var $elements_wrapper = $('<div class="elements-wrapper"></div>');

            var counter = 1;
            $(this).find('.element').each( function(){
                $(this).addClass('element_' + counter);
                $(this).attr('data-item', counter);

                if( counter === 1 ){
                    $(this).attr('aria-hidden', 'false');
                } else {
                    $(this).attr('aria-hidden', 'true');
                }

                $(this).attr('aria-label', 'carousel element ' + counter + ' of ' + items_count);
                $(this).appendTo( $elements_wrapper );

                counter++;
            });

            $elements_container.append( $elements_wrapper );
            $(this).append( $elements_container );
            $(this).append( $next_button );

            // reset links to be unfocusable except the first element
            $(this).find('.element a').each( function(){
                $(this).attr('tabindex', '-1');
            });
            $(this).find('.element[data-item="1"] a').attr('tabindex', '0');

            // reset inputs to be unfocusable except the first element
            $(this).find('.element input').each( function(){
                $(this).attr('tabindex', '-1');
            });
            $(this).find('.element[data-item="1"] input').attr('tabindex', '0');

            // reset buttons to be unfocusable except the first element
            $(this).find('.element button').each( function(){
                $(this).attr('tabindex', '-1');
            });
            $(this).find('.element[data-item="1"] button').attr('tabindex', '0');
        });
    }

    carouselCreation();

    $(window).on('resize', function(){
        $('.carousel').each( function(){
            var current_item = parseInt( $(this).attr('data-showing-item') );
            var current_width = parseFloat( $(this).find('.elements-wrapper').css('width') );
            var fixed_position = (current_item - 1) * current_width * -1;
            var fixed_position_css = fixed_position + 'px';
            $(this).find('.elements-wrapper').css('left', fixed_position_css);
        });
    });
})(jQuery);





/* 
STRUCTURE YOU WRITE:
-------------------------------------------------
    <div class="carousel">
        <div class="element">
            <h4>Element 1</h4>
            <a href="#">element 1</a>
        </div>
        <div class="element">
            <h4>Element 2</h4>
            <a href="#">element 2</a>
        </div>
        <div class="element">
            <h4>Element 3</h4>
            <a href="#">element 3</a>
        </div>
        <div class="element">
            <h4>Element 4</h4>
            <a href="#">element 4</a>
        </div>
    </div>
-------------------------------------------------

STRUCTURE YOU GET:
-------------------------------------------------
    <div class="carousel" aria-label="carousel of 3 elements" data-items="3" data-showing-item="1">
        <a href="#" role="button" aria-label="previous element" class="prev-button"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>
        <div class="elements-container">
            <div class="elements-wrapper">
                <div class="element element_1" data-item="1" aria-hidden="false" aria-label="carousel element 1 of 3">
                    <h4>Element 1</h4>
                    <a href="#">element 1</a>
                </div>
                <div class="element element_2" data-item="2" aria-hidden="false" aria-label="carousel element 2 of 3">
                    <h4>Element 2</h4>
                    <a href="#">element 2</a>
                </div>
                <div class="element element_3" data-item="3" aria-hidden="false" aria-label="carousel element 3 of 3">
                    <h4>Element 3</h4>
                    <a href="#">element 3</a>
                </div>
                <div class="element element_4" data-item="4" aria-hidden="false" aria-label="carousel element 4 of 3">
                    <h4>Element 4</h4>
                    <a href="#">element 4</a>
                </div>
            </div>
        </div>
        <a href="#" role="button" aria-label="next element" class="next-button"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>
    </div>
-------------------------------------------------
*/