import $ from 'jquery'
import { TweenMax, TimelineLite, Sine, TweenLite} from 'gsap'

const visibleClass = 'is-visible'
const preparedClass = 'is-prepared'

function hideElements(id,elements) {
    $.each(elements, function( index, value ) {
        TweenLite.set($(this),{opacity: 0})
    })
    $(`[data-section=${id}]`).addClass(preparedClass)
}

function getSectionElements(id) {
    for ( var i = 0; i < $(`[data-section='${id}'] [data-reveal]`).length; i++ ) {
        elements.push($(`[data-section=${id}] [data-reveal]`)[i])
    }
    return elements
}

function enterTransition(id, elements) {
    // if (!$(`[data-section=${id}]`).hasClass(preparedClass)) {
    //     hideElements(id, elements)
    // }

    let tl = new TimelineLite()
    
    if (!$(`[data-section=${id}]`).hasClass(visibleClass)) {
        $(`[data-section=${id}]`).addClass(visibleClass)
        for (var i = 0; i < elements.length; i++) {
            let delay = 0.05 * 1
    
            tl.to(elements[i], .5, {ease: Sine.inOut, opacity: 1}, `+=${delay}`)
        }
    }
}

export {hideElements, enterTransition, getSectionElements}