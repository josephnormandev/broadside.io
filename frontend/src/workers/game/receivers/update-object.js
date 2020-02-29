export function receive(page, data)
{
    console.log(receiver);
    var update_object = data.update_object != null ? data.update_object : null;

    if(update_object != null)
    {
        page.simulation.updateObject(update_object);
    }
}

export const receiver = 'update-object';
