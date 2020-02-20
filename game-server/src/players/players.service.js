import WebSocket from 'ws';

import ConfigService from './config/config.service.js';

// import { GamesService } from './games/games.service.js';

import LoggerService from './logger/logger.service.js';

export class PlayersService
{
    static async initialize()
    {
        PlayersService.websocket_server = new WebSocket.Server({
            port: ConfigService.get('player_ws_port'),
            verifyClient: function(info, callback) {
                callback(true);
            },
        }).on('connection', async function(socket, req) {
            var player = null;

            setTimeout(function() {
                if(player == null)
                    socket.close();
            }, 5000);

            socket.on('message', async function(message) {
                var message = JSON.parse(message);
                if(message.receiver && message.data != null)
                {
                    if(message.receiver == "token" && message.data.token != null)
                    {
                        // check if...
                        // a) Player is not already logged in
                        // b) Player is in a game right now
                    }
                    else if(player != null)
                    {
                        PlayersService.handlePlayerMessage(
                            player,
                            message.receiver,
                            message.data,
                        );
                    }
                }
            });
            socket.on('close', function() {
                PlayersService.playerDisconnect(player);
            });
        });

        PlayersService.players = new Map();
        PlayersService.receivers = new Map();
    }

    static playerConnect(player, socket)
    {
        this.players.set(player.token, new OnlinePlayer(player, socket));
        LoggerService.green(`Player '${ player.username }' Connected`);
    }

    static isPlayerOnline(player)
    {
        return PlayersService.players.has(player.token);
    }

    static getOnlinePlayer(player)
    {
        if(PlayersService.players.has(player.token))
            return PlayersService.players.get(player.token);
        return null;
    }

    static handlePlayerMessage(player, receiver, data)
    {
        if(PlayersService.players.has(player.token))
        {
            var online_player = PlayersService.players.get(player.token);

            if(PlayersService.receivers.has(receiver))
            {
                this.receivers.get(receiver).receive(
                    PlayersService,
                    online_player,
                    data
                );
            }
        }
    }

    static playerDisconnect(player)
    {
        if(this.players.has(player.token))
        {
            this.players.delete(player.token);
            LoggerService.red(`Player '${ player.username }' Disconnected`);
        }
    }
}

export class Player
{
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
        return PlayersService.isPlayerOnline(this);
    }
}

export class OnlinePlayer extends Player
{
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
