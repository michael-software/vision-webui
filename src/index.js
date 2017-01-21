import LoginHelper from './main/login/login';
import MenuView from './main/menu/MenuView';
import ContentView from './main/content/ContentView';
import SearchView from './main/search/SearchView';

import './dimension';

import './jui/juiLoader';
import './actions';
import './main/loading/loading';
import './main/overlay/overlay';
import './styles/general.scss';

import './jui/general.css';
import './jui/desktop.css';
import './jui/mobile.css';
import Promise from 'promise-polyfill';
import addHeadElement from './utils/addHeadElement';


let server = window.location.protocol + '//' + window.location.hostname;
if(window.location.protocol == 'https:') {
	server += ':3443';
} else {
    server += ':3000';
}

window.ready(function () {
    addHeadElement(server + '/socket.io/socket.io.js', 'JS', () => {
        window.socket = io(server);

        if (!window.Promise) {
            window.Promise = Promise;
        }

        let loginHelper = new LoginHelper();
        let contentView = new ContentView();
        let searchView = new SearchView(socket);

        loginHelper.on('login', (data) => {
            searchView.init();


            let menuView = new MenuView();
            menuView.load();


            contentView.show();
            console.log(window.user);

            document.addEventListener("keydown", function(e) {
                if ((e.keyCode == 68 || e.keyCode == 72) && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                    e.preventDefault();
                    location.hash = '';
                }

				if ((e.keyCode == 69) && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
					e.preventDefault();

					window.ui.floatingMenu.show();
				}
            }, false);
        });
    } );
});