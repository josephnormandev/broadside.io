import Matter from 'matter-js';

import TerrainsService from '../terrains/terrains.service.js';

import GamePlayer from './game-player.js';
import Vision from './vision.js';

import { getType, isType, Dynamic } from './objects/objects.js';

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

		this.visions = new Map();
		this.visions.set(1, new Vision(1));
		this.visions.set(2, new Vision(2));

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

		const self = this;
		this.updates = 0;
		this.update_loop = setInterval(function() {
			self.update(1000 / 60);
		}, 1000 / 60);

		this.addObject({
			type: 'ship',
			team: 1,
			position: {
				x: 135,
				y: 60,
			},
			angle: 0,
			velocity: {
				x: 5,
				y: 5,
			},
			angularVelocity: 1,
		});

		this.addObject({
			type: 'ship',
			team: 2,
			position: {
				x: 135,
				y: 60,
			},
			angle: 0,
			velocity: {
				x: 5,
				y: 5,
			},
			angularVelocity: 1,
		});
	}

	update(time)
	{
		const dynamic_ids = [];
		for(const [s_id, object] of this.objects)
		{
			if(isType(object, Dynamic.TYPE))
			{
				getType(object).tick(object);
				dynamic_ids.push(s_id);
			}
		}

		if(this.updates % 20 == 0)
		{
			this.send(dynamic_ids);
		}

		this.updates ++;

		Matter.Engine.update(this.engine, time);
	}

	send(dynamic_ids)
	{
		const team_1_ids = [];
		const team_2_ids = [];

		// split the dynamics into team_1 and team_2
		for(const s_id of dynamic_ids)
		{
			const dynamic = this.objects.get(s_id);

			if(dynamic.team == 1)
				team_1_ids.push(s_id);
			else if(dynamic.team == 2)
				team_2_ids.push(s_id);
		}

		// these two loops CAN be optimized into one but was hacked for the sake
		// of achieving short-term goals.
		for(const s_id_1 of team_1_ids)
		{
			this.visions.get(1).addVision(s_id_1);

			const dynamic_1 = this.objects.get(s_id_1);

			for(const s_id_2 of team_2_ids)
			{
				this.visions.get(2).addVision(s_id_2);

				const dynamic_2 = this.objects.get(s_id_2);

				if(Dynamic.observable(this.objects, dynamic_1, dynamic_2))
				{
					this.visions.get(1).addVision(s_id_2);
					this.visions.get(2).addVision(s_id_1);
				}
			}
		}

		const packets_1 = this.visions.get(1).createPackets(this.objects);
		const packets_2 = this.visions.get(2).createPackets(this.objects);

		for(const [id, game_player] of this.game_players)
		{
			if(game_player.ready_state == false) continue;
			if(game_player.team == 1)
				game_player.send(packets_1);
			else
				game_player.send(packets_2);
		}
	}

	end()
	{
		clearInterval(this.update_loop);
		clearInterval(this.send_loop);
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

		var all_disconnected = true;
		for(const [id, game_player] of this.game_players)
		{
			if(game_player.connected == true)
			{
				all_disconnected = false;
				break;
			}
		}
		if(all_disconnected)
		{
			Game.Service.endGame(this.id);
		}
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
			this.s_id ++;

			return this.s_id - 1;
		} catch(e) {
			console.log(e, base);
		}
	}
}
