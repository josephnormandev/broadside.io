

export default class GameObject
{
    static TYPE = 'game-object';

    static createObject(id, type)
    {
        return {
            id: id,
            type: type,
        };
    }
}
