document.addEventListener('DOMContentLoaded', function() {
    let form = document.querySelector('#downloadTakeone');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
       const form = e.target;
       window.open(form.elements['options'].value);
    });

    // document.querySelector('#optionsTakeone').addEventListener('change', function(e) {
    //     window.open(e.currentTarget.value);
    // });

    let allMaps = document.querySelectorAll('.map-accordion__content');
    allMaps.forEach(function(x) {
        x.setAttribute('hidden', '');
    });

    let allAccordions = document.querySelectorAll('.map-accordion__button');
    allAccordions.forEach(function(x) {
        x.addEventListener('click', function(e) {
            let isExpanded = e.currentTarget.getAttribute('aria-expanded') == 'true' ? true : false;
            e.currentTarget.setAttribute('aria-expanded', !isExpanded);
            
            if (isExpanded) {
                e.currentTarget.querySelector('svg use').setAttribute('xlink:href', './assets/uswds/img/sprite.svg#expand_more');
            } else {
                e.currentTarget.querySelector('svg use').setAttribute('xlink:href', './assets/uswds/img/sprite.svg#expand_less');
            }
            

            let targetContentId = e.currentTarget.getAttribute('aria-controls');
            let targetContentNode = document.querySelector('.' + targetContentId);

            targetContentNode.toggleAttribute('hidden');
            

        });
    });
    
    let allChiclets = document.querySelectorAll('.chiclet-inner');
    allChiclets.forEach(function(x) {
        x.addEventListener('click', function(e) {
            let allLineChangeInfos = document.querySelectorAll('.line-change-info');
            allLineChangeInfos.forEach(function(x) {
                x.classList.remove('line-change-info__selected');
            });

            let targetId = e.currentTarget.getAttribute('href');
            let targetObject = document.querySelector(targetId + ' .line-change-info');
            targetObject.classList.add('line-change-info__selected');
        });
    });

    let hash = window.location.hash.substring(1);
    if (hash) {
        document.getElementById(hash).scrollIntoView();
        console.log(hash);
    }
});

