import CallbackHelper from './utils/CallbackHelper';
import './main/actions/text.js';

(function(actions) {
	actions.openPlugin = (name, view, param, noHistory) => {

		let hash = name;
		if(view) hash += '/' + view;
		if(param) hash += '/' + param;

        if(location.hash == `#${hash}`) {
			CallbackHelper.call('reloadContent');
        }

		if(noHistory) {
			window.location.replace('#' + hash);
		} else {
			location.hash = hash;
		}

		//window.history.pushState({plugin: name}, name, url);
		//CallbackHelper.call('popstate', {plugin: name})
	};
})(window.actions = {});