export default function addObject(object)
{
    return {
        receiver: 'add-object',
        data: {
            object: object,
        },
    };
}
