export default class Client
{
	static initialize()
	{
		Client.client = null;
		Client.opened = false;

		Client.onMessage = null;
		Client.onClose = null;
	}

	static open(onMessage, onClose)
	{
		Client.onMessage = onMessage;
		Client.onClose = onClose;

		if(!Client.isOpen())
		{
			const url = `ws://${ window.location.hostname }:8081`;
			Client.client = new WebSocket(url);

			return (new Promise(function(resolve) {
				Client.client.addEventListener('open', function(e) {
					Client.handleOpen();
					resolve(true);
				});
				Client.client.addEventListener('message', function(e) {
					Client.handleMessage(e.data);
				});
				Client.client.addEventListener('close', function(e) {
					if(!Client.opened)
						resolve(false);
					else
						Client.handleClose();
				});
			}));
		}
		else
		{
			return true;
		}
	}

	static close()
	{
		if(Client.isOpen())
		{
			Client.onMessage = null;
			Client.onClose = null;

			Client.client.close();
		}
	}

	static isOpen()
	{
		return Client.opened && Client.client.readyState === Client.client.OPEN;
	}

	static sendMessage(message)
	{
		if(Client.isOpen())
		{
			Client.client.send(JSON.stringify(message));
		}
	}

	static handleOpen()
	{
		Client.opened = true;
	}

	static handleMessage(message)
	{
		message = JSON.parse(message);

		if(message.receiver && message.data)
			if(Client.onMessage != null)
				Client.onMessage(message.receiver, message.data);
	}

	static handleClose()
	{
		Client.opened = false;
		if(Client.onClose != null)
			Client.onClose();
	}
}
