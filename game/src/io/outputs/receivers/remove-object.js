export function receive(renderer, data)
{
    var remove_object = data.remove_object != null ? data.remove_object : null;

    if(remove_object != null)
    {
        renderer.removeObject(remove_object);
    }
}

export const receiver = 'remove-object';
