import Websocket from 'ws';

import AuthService from '../auth/auth.service.js';
import ConfigService from '../config/config.service.js';
import DatabaseService from '../database/database.service.js';
import LoggerService from '../logger/logger.service.js';
import QueueingService from '../queueing/queueing.service.js';

import Player from './player.js';
import OnlinePlayer from './online-player.js';

export default class PlayersService
{
	static model;

	static server;
	static players;

	static async initialize()
	{
		Player.initialize(PlayersService);
		OnlinePlayer.initialize(PlayersService);

		PlayersService.initializeDatabase();
		PlayersService.initializeWebsocket();
	}

	// DATABASE RELATED
	static async initializeDatabase()
	{
		PlayersService.model = DatabaseService.createModel('Player', Player);
	}

	static async createPlayer(data)
	{
		return await PlayersService.model.create(data);
	}

	static async getPlayerById(id)
	{
		return await PlayersService.model.findOne({
			_id: id,
		});
	}

	static async getPlayerByEmail(email)
	{
		return await PlayersService.model.findOne({
			email: email,
		});
	}

	static async getPlayerByUsername(username)
	{
		return await PlayersService.model.findOne({
			username: username,
		});
	}

	// WEBSOCKET SERVER RELATED
	static initializeWebsocket()
	{
		PlayersService.server = new Websocket.Server({
			port: ConfigService.get('ws_port'),
			verifyClient: function(info, callback) {
				AuthService.session_parser(info.req, {}, async function() {
					const player_id = info.req.session.player_id;
					if(player_id != null)
					{
						const player = await PlayersService.getPlayerById(player_id);

						if(player != null)
						{
							info.req.player = player;
							return callback(!player.online);
						}
					}
					callback(false);
				});
			},
		}).on('connection', async function(socket, req) {
			const player = req.player;

			PlayersService.playerConnect(player, socket);

			socket.on('message', function(message) {
				var message = JSON.parse(message);

				if(message.receiver != null && message.data != null)
				{
					PlayersService.handlePlayerMessage(
						player,
						message.receiver,
						message.data
					);
				}
			});
			socket.on('close', function() {
				PlayersService.playerDisconnect(player);
			});
		});

		PlayersService.players = new Map();
	}

	static async playerConnect(player, socket)
	{
		PlayersService.players.set(player.id, new OnlinePlayer(player, socket));
		LoggerService.green(`Player '${ player.username }' Connected`);
	}

	static isPlayerOnline(player)
	{
		return player.id != null && PlayersService.players.has(player.id);
	}

	static async handlePlayerMessage(player, receiver, data)
	{
		const online_player = PlayersService.players.get(player.id);

		if(player.inGame)
		{

		}
		else
		{
			if(QueueingService.receivers.has(receiver))
			{
				QueueingService.receivers.get(receiver)(online_player, data);
			}
		}
	}

	static async playerDisconnect(player)
	{
		if(PlayersService.players.has(player.id))
		{
			PlayersService.players.delete(player.id);
			LoggerService.red(`Player '${ player.username }' Disconnected`);

			QueueingService.removeFromQueue(player);
		}
	}
}
