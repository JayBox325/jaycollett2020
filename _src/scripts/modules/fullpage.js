import $ from 'jquery'
import fullpage from 'fullpage.js'
import '../../../node_modules/fullpage.js/vendors/scrolloverflow.min.js'

export default function fullPageJS() {
    const $bgElement = $('[data-bg-el]')
    const easing = 'cubic-bezier(.8, 0.000, 0.000, 1)' 
    let activeFullPage = false

    function checkOrientation() {
        // iOS orientation
        if (window.orientation == -90||window.orientation == 90) {
            destroyFullPage()
        } else if (window.orientation == 0){
            renderFullPage()

        // Desktop orientation
        } else if (window.orientation == null) {
            if ($(window).height() < 550) {
                if(screen.availHeight < screen.availWidth||window.orientation == -90){
                    destroyFullPage()
                } else if(screen.availHeight > screen.availWidth) {
                    renderFullPage()
                }
            } else {
                renderFullPage()
            }
        }
    }

    $(window).on('orientationchange', function() {
        checkOrientation()
    })

    $(window).on('resize', function() {
        checkOrientation()
    })

    checkOrientation()

    function destroyFullPage() {
        if (activeFullPage == true) {
            activeFullPage = false
            $('body').removeClass('fullpage-active')
            $('body').addClass('fullpage-inactive')
            fullpage_api.destroy('all')
        }
    }

    function renderFullPage() {
        if (activeFullPage == false) {
            activeFullPage = true

            $('body').addClass('fullpage-active')
            $('body').removeClass('fullpage-inactive')

            new fullpage('#fullpage', {
                licenseKey: '',
                scrollingSpeed: 1000,
                easingcss3: easing, // http://matthewlein.com/ceaser/

                // Slides
                scrollOverflow: true,
                scrollOverflowReset: true,
                slidesNavigation: true,
                slidesNavPosition: 'bottom',
                controlArrows: false,
                dragAndMove: false,
                loopHorizontal: false,

                onLeave: function(origin, destination, direction){
                    let nextBg = destination.item.getAttribute('data-bg-color')
                    let nextSize = destination.item.getAttribute('data-bg-size')

                    $bgElement.attr('data-size', `${nextSize}`)
                    $bgElement.attr('data-color', `${nextBg}`)

                    // // Hiding elements on next slide
                    // if (!destination.item.classList.contains(preparedClass)) {
                    //     elements = getSectionElements(`${destination.index}-0`)
                    //     hideElements(`${destination.index}-0`, elements)
                    // }
                },

                // afterLoad: function(origin, destination, direction){
                //     if (!destination.item.classList.contains(visibleClass)) {
                //         if (elements.length === 0) {
                //             elements = getSectionElements(`${destination.index}-0`)
                //         }
                //         enterTransition(`${destination.index}-0`, elements)
                //         elements = []
                //     }
                // },
                
                onSlideLeave: function(section, origin, destination, direction) {
                    let nextBg = destination.item.getAttribute('data-bg-color')
                    let nextSize = destination.item.getAttribute('data-bg-size')
                    let nextText = destination.item.getAttribute('data-text')

                    setTimeout(function() {
                        $(section.item).find('.fp-slidesNav').attr('data-theme', nextText)
                    }, 300)

                    let nextScrolling = destination.item.getAttribute('data-scrolling')

                    if (nextBg.charAt(0) == '#') {
                        $bgElement.css('background-color', `${nextBg}`)
                        $bgElement.attr('data-color', 'hex')
                    } else {
                        $bgElement.removeAttr('style')
                        $bgElement.attr('data-color', `${nextBg}`)
                    }

                    $bgElement.attr('data-size', `${nextSize}`)

                    if (nextScrolling == 'disable') {
                        fullpage_api.setAllowScrolling(false, 'down, up')
                        fullpage_api.setKeyboardScrolling(false, 'down, up')
                    } else {
                        fullpage_api.setAllowScrolling(true)
                        fullpage_api.setKeyboardScrolling(true)
                        // section.item.attr('data-slide', '')
                    }

                    // if (!destination.item.classList.contains(visibleClass)) {
                    //     elements = getSectionElements(`${section.index}-${destination.index}`)
                    //     hideElements(`${section.index}-${destination.index}`, elements)
                    // }
                },

                afterSlideLoad (section, origin, destination, direction) {
                    $(section.item).attr('data-show-nav', $(destination.item).attr('data-show-nav'))
                }
                //     // console.log(`Loaded slide ${section.index}-${destination.index}`)
                //     if (!destination.item.classList.contains(visibleClass)) {
                //         if (elements.length === 0) {
                //             elements = getSectionElements(`${section.index}-${destination.index}`)
                //         }
                //         enterTransition(`${section.index}-${destination.index}`, elements)
                //         elements = []
                //     }
                // },
            })
        }
    }

    $('[data-slide-move]').on('click', function() {
        let direction = $(this).attr('data-slide-move')

        console.log(direction)

        if (direction == 'right') {  
            fullpage_api.moveSlideRight()
        } else {
            fullpage_api.moveSlideLeft()
        }
    })
}