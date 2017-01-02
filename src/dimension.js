(function(dimension) {
    var resizeListener = [];

    dimension.getMenu = function(position) {
        switch(position) {
            case 'bottom':
                return 88;
            default:
                return 0;
        }
    };

    function init() {
        window.addEventListener('resize', function (event) {
            proofMobile();

            for(var i = 0, z = resizeListener.length; i < z; i++) {
				resizeListener[i](event);
            }
        });

        proofMobile();
    }

	dimension.onResize = function(callback) {
        if(window.jui.tools.isFunction(callback)) {
			resizeListener.push(callback);

            return true;
        }

        return false;
    };

    function proofMobile() {
        let width = window.innerWidth;
        let height = window.innerHeight;

        window.isMobile = (width < 600);
    }

    init();
})(window.dimension = window.dimension || {});