export default function positionSet(self, x, y)
{
    return {
        receiver: 'connected',
        data: {
            self: self,
            x: x,
            y: y,
        },
    };
}
