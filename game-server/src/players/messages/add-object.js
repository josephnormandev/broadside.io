export default function addObject(base_object)
{
    return {
        receiver: 'add-object',
        data: {
            base_object: base_object,
        },
    };
}
