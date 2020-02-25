export function receive(page, data)
{
    var self = data.self != null ? data.self : null;
    var x = data.x != null ? data.x : null;
    var y = data.y != null ? data.y : null;

    if(self != null && x != null && y != null)
    {
        if(self)
        {
            page.setState({
                pos_self: {
                    x: x,
                    y: y,
                },
            });
        }
        else
        {
            page.setState({
                pos_enemy: {
                    x: x,
                    y: y,
                },
            });
        }
    }
}

export const receiver = 'position-change';
