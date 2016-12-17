import LoginView from './LoginView';

export default class LoginHelper {
    constructor() {
        this.loginView = new LoginView(this);

        window.socket.emit('login', {
            server: 'http://mymanager.no-ip.org',
            bearer: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImp0aSI6IjU4NGRhNjhjZDRjOTciLCJleHAiOjE0ODE5MzM2OTAsIm5hbWUiOiJhZG1pbiIsIl9zZWsiOiI1NmY1NTIwYzI1NDg4YTY2NDNmZmY3NTJhZWJhN2VlMDBiNzJhY2E3NTQyMWNmYTAyMDExNTk3OGY1NGE1NTJmMjc2ZmZlZjgwNWVmYjEwYjZiMzVmMWY0YzQ0OTFkYzA4MDBkZGRhOWQxYjZhMzBkYjY1ZGZmMDk3NzYxNGFlNSJ9.g4XbwJ4uDpwNeEdms5tyysurm73z7bF1ttDlPNWFips'
        });

        window.socket.on('loginstatus', (data) => {
            if (data.status == 401) {
                this.showLogin();
            } else {
                this.closeLogin();
                //this.openMenu();
                console.log('loggedin', data);
            }
        });
    }

    showLogin() {
        this.loginView.show();
    }

    closeLogin() {
        this.loginView.hide();
        new window.loadingIndicator.hide('login');
    }

    openMenu() {
        this.menuView.show();
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