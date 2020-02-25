export default class GenericClient
{
    constructor(ip, port, onMessage, onClose)
    {
        this.ip = ip;
        this.port = port;

        this.client = null;
        this.opened = false;

        this.onMessage = onMessage;
        this.onClose = onClose;
    }

    async open()
    {
        const url = `ws://${ this.ip }:${ this.port }`;
        this.client = new WebSocket(url);

        var self = this;
        return (new Promise(function(resolve) {
            self.client.addEventListener('open', function(e) {
                self.handleOpen();
                resolve(true);
            });
            self.client.addEventListener('message', function(e) {
                self.handleMessage(e.data);
                resolve(true);
            });
            self.client.addEventListener('close', function(e) {
                if(!self.open)
                    resolve(false);
                else
                    self.handleClose();
            });
        }));
    }

    close()
    {
        this.client.close();
    }

    isOpen()
    {
        return this.opened && this.client.readyState === this.client.OPEN;
    }

    sendMessage(message)
    {
        if(this.isOpen())
        {
            this.client.send(JSON.stringify(message));
        }
    }

    handleOpen()
    {
        this.opened = true;
    }

    handleMessage(message)
    {
        message = JSON.parse(message);

        if(message.receiver && message.data)
            this.onMessage(message.receiver, message.data);
    }

    handleClose()
    {
        this.opened = false;
        this.onClose();
    }
}
