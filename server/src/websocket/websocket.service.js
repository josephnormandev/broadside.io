import Websocket from 'ws';

import AppService from '../app/app.service.js';
import AuthService from '../auth/auth.service.js';
import ConfigService from '../config/config.service.js';

export default class WebsocketService
{
	static server;

	static players;
	static receivers;

	static async initialize()
	{
		WebsocketService.players = new Map();
		WebsocketService.receivers = new Map();

		WebsocketService.server = new Websocket.Server({
			port: ConfigService.get('ws_port'),
		}).on('connection', async function(socket, req) {
			console.log('Connected');
			socket.on('close', function() {
				console.log('Disconnected');
			});
		});
	}
}
