export const receiver = 'bundled';

export function receive(renderer, data)
{
    console.log('test');
    var messages = data.messages != null ? data.messages : null;

    if(messages != null && Array.isArray(messages))
    {
        for(var message of messages)
        {
            renderer.handleMessage(message);
        }
    }
}
