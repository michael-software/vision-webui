import LoginHelper from './main/login/login';
import './jui/juiLoader';
import './main/loading/loading';
import './main/overlay/overlay';
import Promise from 'promise-polyfill';



window.ready(function () {
    var socket = io("http://127.0.0.1:3000");

    socket.emit('login', {bearer: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImp0aSI6IjU4NGRhNjhjZDRjOTciLCJleHAiOjE0ODE5MzM2OTAsIm5hbWUiOiJhZG1pbiIsIl9zZWsiOiI1NmY1NTIwYzI1NDg4YTY2NDNmZmY3NTJhZWJhN2VlMDBiNzJhY2E3NTQyMWNmYTAyMDExNTk3OGY1NGE1NTJmMjc2ZmZlZjgwNWVmYjEwYjZiMzVmMWY0YzQ0OTFkYzA4MDBkZGRhOWQxYjZhMzBkYjY1ZGZmMDk3NzYxNGFlNSJ9.g4XbwJ4uDpwNeEdms5tyysurm73z7bF1ttDlPNWFips'});

    socket.on('loginstatus', function (data) {
        if (data.status == 401) {
            console.log('forbidden');
        } else {
            console.log('loggedin');
        }
    });

    LoginHelper.init();
});