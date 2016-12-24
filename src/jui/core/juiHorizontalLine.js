window.jui.views.horizontalline = (function (jsonObject) {
    window.jui.views.horizontalline.getDomElement = function () {
        var retval = document.createElement('hr');
        retval.className = 'jui__horizontal-line';

        return retval;
    };

    return window.jui.views.horizontalline;
});