import GamesService from '../games/games.service.js';
import LoggerService from '../logger/logger.service.js';

import * as QueueRequestReceiver from './receivers/queue-request.js';

import queueRequestSuccessMessage from './messages/queue-request-success.js';

export default class QueueingService
{
	static queueing_player;

	static receivers;

	static initialize()
	{
		QueueingService.queueing_player = null;

		QueueingService.receivers = new Map();
		QueueingService.receivers.set(QueueRequestReceiver.receiver, QueueRequestReceiver.receive);

		QueueingService.queue_loop = setInterval(function() { // this loop is for testing purposes and seeing if anyone is actually in queue
			
		}, 1000);
	}

	static queue(online_player)
	{
		LoggerService.blue(`Queueing '${ online_player.username }'`);
		if(QueueingService.queueing_player == null)
		{
			QueueingService.queueing_player = online_player;
		}
		else
		{
			const queueing_player = QueueingService.queueing_player;

			queueing_player.send(queueRequestSuccessMessage());
			online_player.send(queueRequestSuccessMessage());

			QueueingService.queueing_player = null;
			GamesService.createGame([ online_player ], [ queueing_player ]);
		}
	}

	static inQueue(player)
	{
		return QueueingService.queueing_player != null
			&& QueueingService.queueing_player.equals(player);
	}

	static dequeue(player)
	{
		LoggerService.yellow(`Dequeueing '${ player.username }'`);
		QueueingService.queueing_player = null;
	}

	static handleConnect(online_player)
	{
		// do nothing
	}

	static handleMessage(online_player, receiver, data)
	{
		QueueingService.receivers.get(receiver)(online_player, data);
	}

	// called from the player disconnect
	static handleDisconnect(player)
	{
		if(QueueingService.queueing_player != null && QueueingService.queueing_player.equals(player))
		{
			QueueingService.dequeue(player);
		}
	}
}
