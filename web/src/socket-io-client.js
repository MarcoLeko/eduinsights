import io from 'socket.io-client';

const socket = io('localhost:8080', {secure: true});

socket.on('connect', onConnect.bind(this));
socket.on('reconnect', onReconnect.bind(this));
socket.on('disconnect', onDisconnect.bind(this));

function onConnect() {
    console.log('connected!');
}

function onReconnect() {
    console.log('reconnected!');
}

function onDisconnect() {
    console.log('disconnected!');
}

export default socket;
