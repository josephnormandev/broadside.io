export default function updateObject(update)
{
    return {
        receiver: 'update-object',
        data: {
            update: update,
        },
    };
}
