import CallbackHelper from '../../utils/CallbackHelper';
import LangHelper from '../../utils/LangHelper';

import './SearchView.scss';

export default class SearchView {
    constructor(socket) {
        this.socket = socket;

        this.socket.on('search', this.getSearch.bind(this));
    }

    init() {
        CallbackHelper.register('openSearch', this.show.bind(this));

        document.addEventListener("keydown", function(e) {
            if ((e.keyCode == 83 || e.keyCode == 70) && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                e.preventDefault();
                CallbackHelper.call('openSearch');
            }
        }, false);

        this.initElements();
    }

    initElements() {
        if(!this._searchView) {
            this._searchView = document.createElement('div');
            this._searchView.className = 'search-view';
            this._searchView.addEventListener('click', function(event) {
                event.stopPropagation();

                return false;
            });

            this._searchInput = document.createElement('input');
            this._searchInput.className = 'search-view__input';
            this._searchInput.setAttribute('type', 'search');
            this._searchInput.setAttribute('placeholder', LangHelper.get('search'));
            this._searchInput.addEventListener('keyup', this.onSearch.bind(this), false);

            this._searchContent = document.createElement('div');
            this._searchContent.className = 'search-view__content';

            this._searchView.appendChild(this._searchInput);
            this._searchView.appendChild(this._searchContent);
        }
    }

    show() {
        this.initElements();

        window.overlay.show(() => {
            this.close();
        }, {
            color: '#FFFFFF',
            content: this._searchView,
            centerContent: true
        });

        this._searchInput.focus();

        console.log('search');
    }

    close() {
        window.overlay.hide();
    }

    onSearch(event) {
        clearTimeout(this.searchTimeout);

        if(this._searchInput.value.length && this.lastSearch != this._searchInput.value)
        this.searchTimeout = window.setTimeout(() => {
            this.socket.emit('search', {query: this._searchInput.value});
            this.lastSearch = this._searchInput.value;
        }, 500);
    }

    getSearch(data) {
        if(data.request && data.request.query == this.lastSearch && data.response) {
            this._searchContent.innerHTML = '';
            window.jui.parse(data.response, this._searchContent, true);
        }
    }
}