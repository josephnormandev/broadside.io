export function receive(renderer, data)
{
    var base_object = data.base_object != null ? data.base_object : null;

    if(base_object != null)
    {
        renderer.addObject(base_object);
    }
}

export const receiver = 'add-object';
