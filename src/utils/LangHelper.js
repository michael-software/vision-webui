export default class LangHelper {
	static get(identifier) {
		let langShorten = navigator.language || navigator.userLanguage;

		if(langShorten === 'de' && LangHelper.language_de[identifier] != undefined) {
			return LangHelper.language_de[identifier];
		} else {
			return LangHelper.language_en[identifier];
		}
	}

	static language_de = {
		'username': 'Benutzername',
		'password': 'Kennwort',
		'login': 'Anmelden',
		'server': 'Server'
	};

	static language_en = {
		'username': 'Username',
		'password': 'Password',
		'login': 'Login',
		'server': 'Server'
	};
}