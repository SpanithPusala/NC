$(document).ready(function() {
    const lottie = Webflow.require('lottie').lottie;
    let lottie_animations = lottie.getRegisteredAnimations();
    console.log("lottie_animations - ", lottie_animations);

    // Stop all animations on page load
    lottie_animations.forEach(animation => {
        animation.stop();
    });

    // Play animations in the hero/first section immediately
    const firstSectionAnimationIds = ['w-node-a77bcfd4-0ad0-3c1c-212b-12462fa61829-0b1081c7']; // Add IDs of animations in the first section

    firstSectionAnimationIds.forEach(animationId => {
        const animation = lottie_animations.find(anim => anim.wrapper.id === animationId);

        if (animation) {
            animation.play();
        }
    });

    // Add scroll listener to play/pause animations when fully in view
    $(window).scroll(function() {
        lottie_animations.forEach(animation => {
            const animationElementId = animation.wrapper.id;
            console.log("animationElementId - "+animationElementId);
            const animationElement = $('#' + animationElementId);

            if (animationElement.length > 0) {
                if (isElementFullyInViewport(animationElement)) {
                    console.log(`Element '${animationElementId}' is fully in view.`);
                    animation.play();
                } else {
                    console.log(`Element '${animationElementId}' is out of view.`);
                    animation.goToAndStop(0);
                }
            } else {
                console.warn(`Element with ID '${animationElementId}' not found.`);
            }
        });
    });

    // Function to check if an element is fully in the viewport without any clipping
    function isElementFullyInViewport($el) {
        const rect = $el.get(0).getBoundingClientRect();
        const windowHeight = $(window).height();
        const windowWidth = $(window).width();

        const isFullyInViewport =
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= windowHeight &&
            rect.right <= windowWidth &&
            rect.top <= windowHeight &&
            rect.left <= windowWidth;

        return isFullyInViewport;
    }
});
