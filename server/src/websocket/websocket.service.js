import Websocket from 'ws';

import AppService from '../app/app.service.js';

export default class WebsocketService
{
	static server;

	static players;
	static receivers;

	static async initialize()
	{
		WebsocketService.players = new Map();
		WebsocketService.receivers = new Map();

		const server = AppService.server;
		WebsocketService.server = new Websocket.Server({ server });
		WebsocketService.server.on('connection', WebsocketService.onConnection);
	}

	static async onConnection(socket, req)
	{
		console.log(socket, req);
	}
}
