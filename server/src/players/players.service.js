import WebSocket from 'ws';

import ConfigService from '../config/config.service.js';

import GamesService from '../games/games.service.js';

import LoggerService from '../logger/logger.service.js';

import Player from './player.js';
import OnlinePlayer from './online-player.js';
import GamePlayer from './game-player.js';
import connectedMessage from './messages/connected.js';

export default class PlayersService
{
    static websocket_server;
    static players;
    static receivers;

    static async initialize()
    {
        Player.initialize(PlayersService);
        OnlinePlayer.initialize(PlayersService);
        GamePlayer.initialize(PlayersService);

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
            }, 10000);

            socket.on('message', async function(message) {
                var message = JSON.parse(message);
                if(message.receiver && message.data != null)
                {
                    if(message.receiver == "token" && message.data.token != null)
                    {
                        var temp_player = new Player({
                            token: message.data.token,
                            username: null,
                        });
                        if(PlayersService.isPlayerOnline(temp_player))
                        {
                            socket.close();
                        }
                        else
                        {
                            var result = GamesService.getGamePlayer(temp_player);
                            if(result != null)
                            {
                                player = new Player(result);
                                PlayersService.playerConnect(player, socket);
                            }
                            else
                            {
                                socket.close();
                            }
                        }
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
                if(player != null)
                    PlayersService.playerDisconnect(player);
            });
        });

        PlayersService.players = new Map();

        PlayersService.receivers = new Map();
    }

    static playerConnect(player, socket)
    {
        PlayersService.players.set(player.token, new OnlinePlayer(player, socket));
        LoggerService.green(`Player '${ player.username }' Connected`);

        PlayersService.players.get(player.token).send(connectedMessage());

        GamesService.playerJoin(player);
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
                PlayersService.receivers.get(receiver).receive(
                    PlayersService,
                    online_player,
                    data
                );
            }
            else
            {
                GamesService.handleGameMessage(player, receiver, data);
            }
        }
    }

    static playerDisconnect(player)
    {
        if(PlayersService.players.has(player.token))
        {
            PlayersService.players.delete(player.token);
            LoggerService.red(`Player '${ player.username }' Disconnected`);
            
            GamesService.playerLeave(player);
        }
    }
}
