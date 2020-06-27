import QueueingService from '../../queueing/queueing.service.js';

import queueRequestFailMessage from '../messages/queue-request-fail.js';
import queueRequestPendingMessage from '../messages/queue-request-pending.js';

export async function receive(online_player, data)
{

	if(online_player.inGame)
	{
		online_player.send(queueRequestFailMessage());
	}
	else if(online_player.inQueue)
	{
		online_player.send(queueRequestPendingMessage());
	}
	else
	{
		QueueingService.queue(online_player);
		online_player.send(queueRequestPendingMessage());
	}
}

export const receiver = 'queue-request';
