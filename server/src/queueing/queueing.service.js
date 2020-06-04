import * as QueueRequestReceiver from './receivers/queue-request.js';

import queueRequestSuccessMessage from './messages/queue-request-success.js';

export default class QueueingService
{
	static queue;

	static receivers;

	static initialize()
	{
		QueueingService.queue = [];

		QueueingService.receivers = new Map();
		QueueingService.receivers.set(QueueRequestReceiver.receiver, QueueRequestReceiver.receive);
	}

	static queue(online_player)
	{
		if(QueueingService.queue.length > 0)
		{
			QueueingService.queue.push(online_player);
		}
		else
		{
			const other_player = QueueingService.queue.first();

			console.log(`Making a game with ${ other_player.username } && ${ online_player.username }`);
			other_player.send(queueRequestSuccessMessage());
			online_player.send(queueRequestSuccessMessage());
		}
	}

	static inQueue(player)
	{
		for(var online_player of QueueingService.queue)
		{
			if(online_player.equals(player))
			{
				return true;
			}
		}
		return false;
	}
}
