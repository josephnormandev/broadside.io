import Player from './player.js';

export default class OnlinePlayer extends Player
{
    static Service = null;

    static initialize(service)
    {
        OnlinePlayer.Service = service;
    }

    constructor(player, socket)
    {
        super(player);

        this.socket = socket;
    }

    send(message)
    {
        this.socket.send(JSON.stringify(message));
    }

    kick()
    {
        this.socket.close();
    }
}
