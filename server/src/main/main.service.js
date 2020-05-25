import GamesService from '../games/games.service.js';
import Game from '../games/game.js';

import Player from '../players/player.js';

// for the time being, the only role this class serves is to tell the Games
// service to create the one game to play

export default class MainService
{
    static async initialize()
    {
        setTimeout(function() {
            GamesService.createGame(new Game({
                id: 101,
                player_1: new Player({
                    token: 'abcd',
                    username: 'Wine_Craft',
                }),
                player_2: new Player({
                    token: '1234',
                    username: 'Jurgmania',
                }),
            }));
        });
    }
}
