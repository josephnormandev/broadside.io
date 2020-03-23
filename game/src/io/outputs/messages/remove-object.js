export default function removeObject(remove_object)
{
    return {
        receiver: 'remove-object',
        data: {
            remove_object: remove_object,
        },
    };
}
