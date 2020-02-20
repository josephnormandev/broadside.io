import { GamesService, Game } from '../games/games.service.js';

import { Player } from '../players/players.service.js';

// for the time being, the only role this class serves is to tell the Games
// service to create the one game to play

export class MainService
{
    static async initialize()
    {
        setTimeout(function() {
            GamesService.createGame(101, new Game({
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
