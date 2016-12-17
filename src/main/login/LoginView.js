import LangHelper from '../../utils/LangHelper';
import './LoginView.scss';

export default class LoginView {
	constructor(loginHelper) {
		this.loginHelper = loginHelper;
	}

	show() {
		if(!this._loginForm) {
			if(document.querySelector('.loginView')) {
				this._loginForm = document.querySelector('.loginView');

				this._loginServer	= this._loginForm.querySelector('.loginView__server-input');
				this._loginUsername	= this._loginForm.querySelector('.loginView__username-input');
				this._loginPassword = this._loginForm.querySelector('.loginView__password-input');

				this._loginButton = this._loginForm.querySelector('.loginView__login-button');
			} else {
				this._loginForm = document.createElement('div');
					this._loginForm.className = 'loginView';
				document.body.appendChild(this._loginForm);


				this._loginServer = document.createElement('input');
					this._loginServer.type = 'url';
					this._loginServer.className = 'loginView__server-input';
					this._loginServer.placeholder = LangHelper.get('server');
				this._loginForm.appendChild(this._loginServer);

				this._loginUsername = document.createElement('input');
					this._loginUsername.type = 'text';
					this._loginUsername.className = 'loginView__username-input';
					this._loginUsername.placeholder = LangHelper.get('username');
				this._loginForm.appendChild(this._loginUsername);

				this._loginPassword = document.createElement('input');
					this._loginPassword.type = 'password';
					this._loginPassword.className = 'loginView__password-input';
					this._loginPassword.placeholder = LangHelper.get('password');
				this._loginForm.appendChild(this._loginPassword);

				this._loginButton = document.createElement('button');
					this._loginButton.className = 'loginView__login-button';
					this._loginButton.innerHTML = LangHelper.get('login');
				this._loginForm.appendChild(this._loginButton);
			}

			this._loginPassword.addEventListener('keydown', (event) => {
				if(event.keyCode == 13) {
					this._login();
				}
			}, false);
			this._loginButton.addEventListener('click', this._login.bind(this));
		}

		this._loginServer.value = 'http://mymanager.no-ip.org';
		this._loginUsername.value = 'admin';
		this._loginPassword.value = '';

		this._loginForm.classList.remove('loginView--hidden');
		this._loginServer.focus();
	}

	hide() {
		if(this._loginForm)
			this._loginForm.classList.add('loginView--hidden');
	}

	_login() {
		if(this.loginHelper && this.loginHelper.login) {
			if(this._loginServer && this._loginServer.value &&
				this._loginUsername && this._loginUsername.value &&
				this._loginPassword && this._loginPassword.value) {

				this.loginHelper.login(this._loginServer.value, this._loginUsername.value, this._loginPassword.value);
			}
		}
	}
}