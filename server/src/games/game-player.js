// this class is NOT related to the Player class. Instead, it is the vessel
// that ties Players to their in game status
export default class GamePlayer
{
	constructor(online_player, team)
	{
		this.connect(online_player);
		this.team = team;
	}

	get id()
	{
		return this.online_player.id;
	}

	connect(online_player)
	{
		this.online_player = online_player
	}

	get connected()
	{
		return this.online_player != null;
	}

	send(message)
	{
		if(this.connected)
		{
			this.online_player.send(message);
		}
	}

	disconnect(player)
	{
		this.online_player = null;
	}
}
