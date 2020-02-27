export default class TestMap
{
    constructor()
    {
        this.teams = {
            1: new Map(),
            2: new Map(),
        };
        this.body_id = 0;

        for(const team of Object.values(this.teams))
        {
            team.set(this.body_id ++, null);
        }
    }
}
