import Player from './player.js';

export default class GamePlayer extends Player
{
    static Service = null;

    static initialize(service)
    {
        GamePlayer.Service = service;
    }

    constructor(player, team_num)
    {
        super(player);

        this.team_num = team_num;
    }

    send(message)
    {
        if(GamePlayer.Service.isPlayerOnline(this))
            GamePlayer.Service.getOnlinePlayer(this).send(message);
    }
}
