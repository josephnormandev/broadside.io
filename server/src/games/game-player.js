import assignShipMessage from './io/messages/assign-ship.js';

// this class is NOT related to the Player class. Instead, it is the vessel
// that ties Players to their in game status
export default class GamePlayer
{
	constructor(online_player, team)
	{
		this.connect(online_player);
		this.team = team;

		this.ship_id = null;
		this.ready_state = false;
	}

	get id()
	{
		return this.online_player.id;
	}

	connect(online_player)
	{
		this.online_player = online_player
	}

	ready()
	{
		this.ready_state = true;
	}

	assignShip(ship_id)
	{
		this.ship_id = ship_id;

		if(this.ready_state)
		{
			this.send(assignShipMessage(this.ship_id));
		}
	}

	ship(objects)
	{
		if(this.ship_id != null && objects.has(this.ship_id))
		{
			return objects.get(this.ship_id);
		}
		this.ship_id = null;
		return null;
	}

	get connected()
	{
		return this.online_player != null;
	}

	send(message)
	{
		if(this.connected && this.ready_state)
		{
			this.online_player.send(message);
		}
	}

	disconnect(player)
	{
		this.online_player = null;
	}
}
