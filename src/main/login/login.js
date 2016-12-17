import LoginView from './LoginView';

export default class LoginHelper {
    constructor() {
        this.loginView = new LoginView(this);

        window.socket.on('loginstatus', (data) => {
            if (data.status == 401) {
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

    parseLogin(data) {
        if(data.status == 200) {
            if(data.username && data.token) {
                window.user = {
                    username: data.username,
                    token: data.token
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
}