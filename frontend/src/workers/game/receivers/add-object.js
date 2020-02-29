import { Simulation, Objects } from 'game';

export function receive(page, data)
{
    var object = data.object != null ? data.object : null;

    if(object != null)
    {
        var type = Objects.getType(object);
        page.simulation.addObject(type.create(object));
    }
}

export const receiver = 'add-object';
