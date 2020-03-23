export const receiver = 'bundled';

export function receive(simulation, team_num, data)
{
    console.log('rest');
    var messages = data.messages != null ? data.messages : null;

    if(messages != null && Array.isArray(messages))
    {
        for(var message of messages)
        {
            renderer.handleMessage(message);
        }
    }
}
