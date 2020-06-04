import QueueingService from '../../queueing/queueing.service.js';

import queueRequestFailMessage from '../messages/queue-request-fail.js';
import queueRequestPendingMessage from '../messages/queue-request-pending.js';

export async function receive(online_player, data)
{
	if(!online_player.inGame && !online_player.inQueue)
	{
		QueueingService.queue(online_player);
		online_player.send(queueRequestPendingMessage());
	}
	else
	{
		online_player.send(queueRequestFailMessage());
	}
}

export const receiver = 'queue-request';
