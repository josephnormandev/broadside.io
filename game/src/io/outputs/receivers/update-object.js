export function receive(renderer, data)
{
    var update_object = data.update_object != null ? data.update_object : null;

    if(update_object != null)
    {
        renderer.updateObject(update_object);
    }
}

export const receiver = 'update-object';
