import Matter from 'matter-js';

import TerrainsService from '../terrains/terrains.service.js';

import GamePlayer from './game-player.js';

import { getType } from './objects/objects.js';

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

		this.s_id = 0;
		this.objects = new Map();
		for(const base of TerrainsService.loadMap())
		{
			this.addObject(base);
		}
	}

	update()
	{
		Engine.update(this.engine, time);
	}

	send()
	{

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
		const game_player = this.game_players.get(online_player.id);
		game_player.connect(online_player);
	}

	handleMessage(online_player, receiver, data)
	{
		const game_player = this.game_players.get(online_player.id);
		Game.Service.receivers.get(receiver)(this, game_player, data);

	}

	handleDisconnect(player)
	{
		this.game_players.get(player.id).disconnect(player);
	}

	addObject(base)
	{
		try {
			this.s_id = (base.s_id != null ? base.s_id : this.s_id);
			const game_object = getType(base).create(null, {
				...base,
				s_id: this.s_id,
			});
			this.objects.set(game_object.s_id, game_object);

			Matter.World.addBody(this.engine.world, game_object);
		} catch(e) {
			console.log(e, base);
		}
		this.s_id ++;
	}
}
