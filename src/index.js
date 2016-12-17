import LoginHelper from './main/login/login';
import './jui/juiLoader';
import './main/loading/loading';
import './main/overlay/overlay';
import './styles/general.scss';
import Promise from 'promise-polyfill';



window.ready(function () {
    window.socket = io("http://127.0.0.1:3000");


    if (!window.Promise) {
        window.Promise = Promise;
    }

    let loginHelper = new LoginHelper();
});