export default function setPosition(x, y)
{
    return {
        receiver: 'set-position',
        data: {
            x: x,
            y: y,
        },
    };
}
