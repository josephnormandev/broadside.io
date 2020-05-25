export const receiver = 'bundled';

export function receive(game, game_player, data)
{
    var messages = data.messages != null ? data.messages : null;

    for(var message of messages)
    {
        if(message.receiver && message.data)
            game.handleMessage(game_player, message.receiver, message.data);
    }
}
