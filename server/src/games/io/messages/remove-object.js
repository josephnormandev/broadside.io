export default function removeObject(remove)
{
    return {
        receiver: 'remove-object',
        data: {
            remove: remove,
        },
    };
}
