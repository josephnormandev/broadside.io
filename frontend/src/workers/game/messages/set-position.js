export default function setPosition(s_id, x, y)
{
    return {
        receiver: 'set-position',
        data: {
            s_id: s_id,
            x: x,
            y: y,
        },
    };
}
