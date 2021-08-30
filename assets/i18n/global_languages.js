var set_locale_to = function (locale) {
    console.log('locale: ', locale);
    // 從sessionStorage取得之前存的資料
    //var sessionData = sessionStorage.getItem('locale');    
    //console.log('session: ', sessionData);
    let storageData = localStorage.getItem('locale');
    console.log('storage: ', storageData);
    if (locale) {
        $.i18n().locale = locale;            
    } else if (storageData) {
        $.i18n().locale = storageData;            
    }
    $('body').i18n();
    //$('#welcome').text($.i18n('welcome', 'HACHI'));
};

jQuery(function () {
    $.i18n().load({
        'en': './assets/languages/en.json',
        'zh': './assets/languages/zh.json',
        'ja': './assets/languages/ja.json'
    }).done(function () {
        set_locale_to(url('?locale'));
        
        History.Adapter.bind(window, 'statechange', function () {            
            let locale = url('?locale');
            //sessionStorage.setItem('locale', locale);
            localStorage.setItem('locale', locale);
            set_locale_to(locale);            
        });

        $('.switch-locale').on('click', 'a', function (e) {
            e.preventDefault();
            History.pushState(null, null, "?locale=" + $(this).data('locale'));
        });
    });

    console.log('Length: ', History.length);
});