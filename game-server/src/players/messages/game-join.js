export default function gameJoin(team_num, players, objects)
{
    console.log(team_num);
    console.log(players);
    console.log( objects);
    return {
        receiver: 'game-join',
        data: {
            team_num: team_num,
            players: players,
            objects: objects,
        },
    };
}
