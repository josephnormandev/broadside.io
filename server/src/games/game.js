import Matter from 'matter-js';

import GamePlayer from './game-player.js';

export default class Game
{
	static Service = null;

	static initialize(service)
	{
		Game.Service = service;
	}

	constructor(id, team_1, team_2)
	{
		this.id = id;

		this.game_players = new Map();
		for(const online_player of team_1) this.game_players.set(online_player.id, new GamePlayer(online_player, 1));
		for(const online_player of team_2) this.game_players.set(online_player.id, new GamePlayer(online_player, 2));

		this.engine = Matter.Engine.create();
		this.engine.world.gravity.y = 0;

		var self = this;
		setInterval(function() {
			self.sendDummyMessage();
		}, 1000);
	}

	sendDummyMessage()
	{
		for(var [id, game_player] of this.game_players)
		{
			game_player.send({
				id: id
			});
		}
	}

	handleConnect(online_player)
	{
		this.game_players.get(online_player.id).connect(online_player);
	}

	handleMessage(online_player, receiver, data)
	{
		const game_player = this.game_players.get(online_player.id);
		Game.Service.receivers.get(receiver)(this, online_player, game_player, data);
	}

	handleDisconnect(player)
	{
		this.game_players.get(player.id).disconnect(player);
	}
}
