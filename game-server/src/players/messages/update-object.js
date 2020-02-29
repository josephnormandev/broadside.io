export default function updateObject(update_object)
{
    return {
        receiver: 'update-object',
        data: {
            update_object: update_object,
        },
    };
}
