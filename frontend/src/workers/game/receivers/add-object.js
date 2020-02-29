export function receive(page, data)
{
    var base_object = data.base_object != null ? data.base_object : null;

    if(base_object != null)
    {
        page.simulation.addObject(base_object);
    }
}

export const receiver = 'add-object';
