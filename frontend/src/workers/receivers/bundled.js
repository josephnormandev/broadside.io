export function receive(page, data)
{
	var messages = data.messages != null ? data.messages : null;

	if(messages != null && Array.isArray(messages))
	{
		for(const message of messages)
		{
			if(message.receiver != null && message.data != null)
				page.handleMessage(message.receiver, message.data);
		}
	}
}

export const receiver = 'bundled';
