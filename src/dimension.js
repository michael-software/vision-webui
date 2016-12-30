(function(dimension) {
    dimension.getMenu = function(position) {
        switch(position) {
            case 'bottom':
                return 88;
            default:
                return 0;
        }
    };

    function init() {
        window.addEventListener('resize', function () {
            proofMobile();
        });

        proofMobile();
    }

    function proofMobile() {
        let width = window.innerWidth;
        let height = window.innerHeight;

        window.isMobile = (width < 600);
    }

    init();
})(window.dimension = window.dimension || {});