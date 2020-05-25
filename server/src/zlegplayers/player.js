import GamesService from '../games/games.service.js';

export default class Player
{
    static Service = null;

    static initialize(service)
    {
        Player.Service = service;
    }

    constructor(player)
    {
        this.token = player.token;
        this.username = player.username;
    }

    equals(other)
    {
        if(other.token != null)
        {
            return other.token == this.token;
        }
        return false;
    }

    get inGame()
    {
        return GamesService.isPlayerInGame(this);
    }

    get online()
    {
        return Player.Service.isPlayerOnline(this);
    }
}
