import PasswordHash from 'password-hash';

import DatabaseObject from '../database/database-object.js';

import QueueingService from '../queueing/queueing.service.js';
import GamesService from '../games/games.service.js';

export default class Player extends DatabaseObject
{
	static Service = null;

	static initialize(service)
	{
		Player.Service = service;
	}

	constructor(object)
	{
		super(object, Player.schema);
	}

	checkPassword(password)
	{
		return PasswordHash.verify(password, this.password);
	}

	get reduce()
	{
		return {
			id: this.id,
			username: this.username,
			email: this.email,
			admin: this.admin,
			online: this.online,
			inQueue: this.inQueue,
			inGame: this.inGame,
		};
	}

	get online()
	{
		return Player.Service.isPlayerOnline(this);
	}

	get inQueue()
	{
		return QueueingService.inQueue(this);
	}

	get inGame()
	{
		return GamesService.inGame(this);
	}

	static hashPassword(password)
	{
		return PasswordHash.generate(password);
	}

	static schema = {
		username: String,
		password: String,
		email: String,
		admin: Boolean,
	}
}
