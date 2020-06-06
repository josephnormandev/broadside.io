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
	}

	static queue(online_player)
	{
		if(QueueingService.queueing_player == null)
		{
			QueueingService.queueing_player = online_player;
		}
		else
		{
			const queueing_player = QueueingService.queueing_player;

			console.log(`Making a game with ${ queueing_player.username } && ${ online_player.username }`);
			queueing_player.send(queueRequestSuccessMessage());
			online_player.send(queueRequestSuccessMessage());

			// make the game using gameservice
		}
	}

	// called from
	static removeFromQueue(player)
	{
		if(QueueingService.queueing_player != null && QueueingService.queueing_player.equals(player))
		{
			QueueingService.queueing_player = null;
			return true;
		}
		return false;
	}

	static inQueue(player)
	{
		return QueueingService.queueing_player != null
			&& QueueingService.queueing_player.equals(player);
	}
}
