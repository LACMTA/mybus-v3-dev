//  Google Translate widget not reloading on page after back button
// This forces the page to reload
(function () {
	window.onpageshow = function(event) {
		if (event.persisted) {
			window.location.reload();
		}
	};
})();

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        // includedLanguages: 'da,de,en,es,fr,hmn,hy,it,ja,km,ko,pt,ru,th,tl,vi,zh-CN,zh-TW',
        includedLanguages: 'en,es,zh-TW,ko,vi,ja,ru,hy',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
        gaTrack: true,
        gaId: 'UA-10002990-1',
    }, 'google_translate_element');
}

//TRANSLATE
let gframe, navTranslate, interval, isOpen, lastResizeWasMobile;

function styleGT() {
    gframe = document.querySelector('.goog-te-menu-frame');
    let gframe_head = gframe.contentWindow.document.head;
    let style_node = document.createElement('style');
    style_node.setAttribute('type', 'text/css');

    let style_code = `
        .goog-te-menu2 {
            background-color: white;
            border: none;
            overflow: auto;
            /*max-height: 350px;*/
            padding:0;
        }
        table,tbody,tr,td{
            display: block;
        }
        .goog-te-menu2-item div,
        .goog-te-menu2-item:link div,
        .goog-te-menu2-item:visited div,
        .goog-te-menu2-item:active div {
            background: transparent;
            letter-spacing: .35px;
            padding: 16px;
            font-family: 'Open Sans', sans-serif;
            font-style: normal;
            font-weight: 600;
            line-height: 130%;
            color: #5E6871;
        }
        .goog-te-menu2-item-selected div,
        .goog-te-menu2-item-selected:link div,
        .goog-te-menu2-item-selected:visited div,
        .goog-te-menu2-item-selected:active div{
            letter-spacing: .35px;
            padding: 16px;
            font-family: 'Open Sans', sans-serif;
            font-style: normal;
            font-weight: 600;
            line-height: 130%;
            color: #ECECEC;
            background: #555;
        }

        .goog-te-menu2-item-selected .text{
            font-family: 'Open Sans', sans-serif;
            font-weight: 600;
            font-style: normal;
            line-height: 130%;
        }
        .goog-te-menu2-item-selected .indicator{
            display:none;
        }
        .goog-te-menu2-item:hover div{
            color: #ECECEC;
            background: #555;
        }
        .goog-te-menu2 {
            width: 100% !important;
        }`;

    style_node.innerHTML = style_code;
    gframe_head.appendChild(style_node);
}

function updateLanguageNames() {
    gframe = document.querySelector('.goog-te-menu-frame');

    let langItems = gframe.contentWindow.document.querySelectorAll('.goog-te-menu2-item,.goog-te-menu2-item-selected');

    for (var i = 0; i < langItems.length; i++) {
        switch (langItems[i].querySelector('.text').innerText) {
            case 'Spanish':
                langItems[i].querySelector('.text').innerText = 'Español (Spanish)';
                langItems[i].addEventListener('click', function(e) { window.location = document.querySelector('input#es-path').value + '#googtrans(en|es)'; });
                break;
            case 'Chinese (Traditional)':
                langItems[i].querySelector('.text').innerText = '中文 (Chinese Traditional)';
                langItems[i].addEventListener('click', function(e) { window.location = document.querySelector('input#zh-tw-path').value + '#googtrans(en|zh-tw)'; });
                break;
            case 'Korean':
                langItems[i].querySelector('.text').innerText = '한국어 (Korean)';
                langItems[i].addEventListener('click', function(e) { window.location = document.querySelector('input#ko-path').value + '#googtrans(en|ko)'; });
                break;
            case 'Vietnamese':
                langItems[i].querySelector('.text').innerText = 'Tiếng Việt (Vietnamese)';
                langItems[i].addEventListener('click', function(e) { window.location = document.querySelector('input#vi-path').value + '#googtrans(en|vi)'; });
                break;
            case 'Japanese':
                langItems[i].querySelector('.text').innerText = '日本語 (Japanese)';
                langItems[i].addEventListener('click', function(e) { window.location = document.querySelector('input#ja-path').value + '#googtrans(en|ja)'; });
                break;
            case 'Russian':
                langItems[i].querySelector('.text').innerText = 'русский (Russian)';
                langItems[i].addEventListener('click', function(e) { window.location = document.querySelector('input#ru-path').value + '#googtrans(en|ru)'; });
                break;
            case 'Armenian':
                langItems[i].querySelector('.text').innerText = 'Армянский (Armenian)';
                langItems[i].addEventListener('click', function(e) { window.location = document.querySelector('input#hy-path').value + '#googtrans(en|hy)'; });
                break;
            case 'English':
                langItems[i].addEventListener('click', function(e) { window.location = document.querySelector('input#en-path').value; });
                break;
            case 'Select Language':
                langItems[i].querySelector('.text').innerText = 'English';
                break;
        }
    }
}
function hideIframeOnClick() {
    setTimeout(function () {
        if (gframe) gframe.style.display = 'none';
        console.log("hidden");
    }, 100);
}

function resetInterval() {
    if (interval) clearInterval(interval);
    interval = setInterval(() => isOpen = isGframeVisible(gframe), 500);
}

function isGframeVisible(elem) {
    return !(elem.offsetWidth === 0 && elem.offsetHeight === 0);
}

window.addEventListener('load', function() {
    gframe = document.querySelector('.goog-te-menu-frame');
    navTranslate = document.querySelector('.header-bar__translate');
    header = document.querySelector(".header");

    navTranslate.addEventListener('click', function(e) {
        console.log('navTranslate onclick even triggered');
        e.stopImmediatePropagation();
        e.stopPropagation();

        if (isOpen) {
            gframe.style.display = 'none';
            isOpen = false;
        } else {
            gframe.style.display = 'block';
            let navContainer = document.querySelector('.nav-container');
            let rect = navContainer.getBoundingClientRect();
            gframe.style.top = (rect.bottom + 300) + 'px';

            if (window.innerWidth > 640) {
                gframe.style.left = (window.innerWidth - 275) + 'px';
                gframe.style.width = '275px';
            } else {
                gframe.style.left = '0px';
                gframe.style.width = window.innerWidth + 'px';
            }

            isOpen = true;
        }
        resetInterval();
    });

    // navTranslate.onclick = (e) => {
        
    // };

    styleGT();
    resetInterval();

    setInterval(function () {
        if (isGframeVisible(gframe) && !header.classList.contains('header--is-open-translate')) {
            header.classList.add('header--is-open-translate');
        } else if (!isGframeVisible(gframe) && header.classList.contains('header--is-open-translate')) {
            header.classList.remove('header--is-open-translate');
        }
    }, 1);

    setInterval(function () {
        updateLanguageNames();
        let elems = gframe.contentWindow.document.querySelectorAll('.goog-te-menu2-item,.goog-te-menu2-item-selected');

        elems.forEach(item => {
            item.removeEventListener('click', hideIframeOnClick);
            item.removeEventListener('touchstart', hideIframeOnClick);
        });

        elems.forEach(item => {
            item.addEventListener('click', hideIframeOnClick);
            item.addEventListener('touch', hideIframeOnClick);
        });
    }, 1000);

});

window.addEventListener('resize', function() {
    if (isOpen) {
        if (window.innerWidth > 640) {
            gframe.style.left = (window.innerWidth - 275) + 'px';
            gframe.style.width = '275px';
        } else {
            gframe.style.left = '0px';
            gframe.style.width = window.innerWidth + 'px';
        }
    }
});
