(function (lang, window) {
    var langShorten = navigator.language || navigator.userLanguage;

    var language_de = {
        month_names: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        select_date: 'Datum auswählen',
        abort: 'Abbrechen',
        ok: 'OK'
    };

    var language_en = {
        month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        select_date: 'Select a date',
        abort: 'Abort',
        ok: 'OK'
    };

    lang.get = function(identifier) {
        if(langShorten === 'de' && language_de[identifier] != undefined) {
            return language_de[identifier];
        } else {
            return language_en[identifier];
        }
    }
})(window.jui.lang = {}, window);