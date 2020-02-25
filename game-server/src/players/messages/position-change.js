export default function positionSet(self, x, y)
{
    return {
        receiver: 'position-change',
        data: {
            self: self,
            x: x,
            y: y,
        },
    };
}
