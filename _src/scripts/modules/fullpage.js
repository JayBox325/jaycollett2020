import $ from 'jquery'
import fullpage from 'fullpage.js'

export default function fullPageJS() {
    const $bgElement = $('[data-bg-el]')

    new fullpage('#fullpage', {
        licenseKey: '',
        scrollingSpeed: 1000,

        // Slides
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        controlArrows: false,

        onLeave: function(origin, destination, direction){
            let nextBg = destination.item.getAttribute('data-bg-color')
            let nextWidth = destination.item.getAttribute('data-bg-width')

            $bgElement.css('width', nextWidth)
            $bgElement.addClass(`bg-el--${nextBg}`)
        },
        
        // onSlideLeave: function(section, origin, destination, direction) {
        //     if (direction == 'right') {
        //         fullpage_api.setAllowScrolling(false)
        //         fullpage_api.setKeyboardScrolling(false)
        //     } else {
        //         fullpage_api.setAllowScrolling(true)
        //         fullpage_api.setKeyboardScrolling(true)
        //     }
        // }
    })
}