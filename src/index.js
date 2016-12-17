import LoginHelper from './main/login/login';

var socket = io("http://127.0.0.1:3000");

socket.emit('login', {bearer: 'g4XbwJ4uDpwNeEdms5tyysurm73z7bF1ttDlPNWFips'});

socket.on('loginstatus', function(data) {
    if(data.status == 401) {
        console.log('forbidden');
    } else {
        console.log('loggedin');
    }
});

LoginHelper.init();