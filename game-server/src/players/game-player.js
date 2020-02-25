import Player from './player.js';

export default class GamePlayer extends Player
{
    static Service = null;

    static initialize(service)
    {
        GamePlayer.Service = service;
    }

    constructor(player, number, game)
    {
        super(player);

        this.number = number;
        this.game = game;

        this.setPosition(0, 0);
    }

    setPosition(x, y)
    {
        this.x = x;
        this.y = y;
    }

    send(message)
    {
        if(GamePlayer.Service.isPlayerOnline(this))
            GamePlayer.Service.getOnlinePlayer(this).send(message);
    }
}
