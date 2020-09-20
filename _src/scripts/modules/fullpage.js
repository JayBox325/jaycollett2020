import $ from 'jquery'
import fullpage from 'fullpage.js'
import '../../../node_modules/fullpage.js/vendors/scrolloverflow.min.js'

export default function fullPageJS() {
    const $bgElement = $('[data-bg-el]')
    const easing = 'cubic-bezier(.8, 0.000, 0.000, 1)' 

    new fullpage('#fullpage', {
        licenseKey: '',
        scrollingSpeed: 1000,
        easingcss3: easing, // http://matthewlein.com/ceaser/

        // Sections
        anchors: [
            'landing',
            'intro',
            'about',
            'portfolio',
            // 'blog'
        ],

        // Slides
        scrollOverflow: true,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        controlArrows: false,

        onLeave: function(origin, destination, direction){
            let nextBg = destination.item.getAttribute('data-bg-color')
            let nextSize = destination.item.getAttribute('data-bg-size')

            $bgElement.attr('data-size', `${nextSize}`)
            $bgElement.attr('data-color', `${nextBg}`)
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