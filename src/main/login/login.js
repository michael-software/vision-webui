import LoginView from './LoginView';
import LangHelper from '../../utils/LangHelper';

import CallbackHelper from '../../utils/CallbackHelper';

export default class LoginHelper {
    constructor() {
        this.loginView = new LoginView(this);

        CallbackHelper.register('parseHead', this.parseHead.bind(this), true);

        window.socket.on('loginstatus', (data) => {
            if (data.head && data.head.status == 401) {
                this.showLogin();
				window.dialog.alert(LangHelper.get('wrong_credentials'));
            } else {
                this.parseLogin(data);
            }
        });

		window.socket.on('jwt_update', (data) => {
			if (data.head && data.head.status == 401) {
				this.showLogin();
			} else {
				this.parseLogin(data);
			}
		});


        if(localStorage.getItem('token') && localStorage.getItem('server')) {
            window.socket.emit('login', {
                server: localStorage.getItem('server'),
                bearer: localStorage.getItem('token')
            });
        } else {
            console.log('test');
            this.showLogin();
        }
    }

    parseHead(head) {
        if ( !window.jui.tools.empty(head['jwt']) ) {
            this.saveToken(window.user.server, head['jwt']);
            window.user.token = head['jwt'];

            window.socket.emit('login', {
                server: localStorage.getItem('server'),
                bearer: localStorage.getItem('token')
            });
        }

		if ( head.status === 401 ) {
            this.logout();
		}
    }

    parseLogin(data) {
        if(data.status == 200) {
            if(data.username && data.token) {
                window.user = {
                    username: data.username,
                    token: data.token,
                    server: data.server
                };

                this.saveToken(data.server, data.token);

                this.closeLogin();


                if(this.loginCallback) {
                    this.loginCallback(data);
                }

                return;
            }
        }

        this.showLogin();
    }

    saveToken(server, token) {
        localStorage.setItem('token', token);
        localStorage.setItem('server', server);
    }

    showLogin() {
        this.loginView.show();
		new window.loadingIndicator.hide('login');
    }

    closeLogin() {
        this.loginView.hide();
        new window.loadingIndicator.hide('login');
    }

    on(type, callback) {
        switch(type) {
            case 'login':
                this.loginCallback = callback;
                break;
            default: break;
        }
    }

    login(server, username, password) {
        window.socket.emit('login', {
            server: server,
            username: username,
            password: password
        });

        new window.loadingIndicator.show('login');
    }

    logout() {
		localStorage.removeItem('server');
		localStorage.removeItem('username');

		this.showLogin();
		window.location.reload();
    }
}