import Matter from 'matter-js';
const { Engine, Render, World, Bodies, Common } = Matter;

import GameObject from './objects/game-object.js';
import Ship from './objects/ships/ship.js';
import BattleShip from './objects/ships/battle-ship.js';

export default class Simulation
{
    static getType(object)
    {
        switch(object.type)
        {
            case GameObject.TYPE:
                return GameObject;
            case Ship.TYPE:
                return Ship;
            case BattleShip.TYPE:
                return BattleShip;
            default:
                throw 'Unknown Type!';
        }
    }

    constructor()
    {
        this.engine = Engine.create();
        this.engine.world.gravity.y = 0;

        this.teams = {
            1: new Map(),
            2: new Map(),
        };
    }

    update(time)
    {
        Engine.update(this.engine, time);
    }

    // used in the backend to load all of the settings from a map file
    loadFromMap(map)
    {
        for(const team_num in map.teams)
        {
            for(var [id, object] of map.teams[team_num])
            {
                this.addObject(team_num, object);
            }
        }
    }

    // used in the backend to send to the frontend
    dumpToMessage()
    {
        var dumpMessage = {};

        for(const team_num in this.teams)
        {
            dumpMessage[team_num] = {};
            for(var [id, object] of this.teams[team_num])
            {
                dumpMessage[team_num][id] = Simulation.getType(object).dump(object);
            }
        }
        return dumpMessage;
    }

    // used in the frontend to load the instance of the backend to the frontend
    loadFromMessage(message)
    {

    }

    addObject(team_num, object)
    {
        this.teams[team_num].set(GameObject.getId(object), object);
        World.addBody(this.engine.world, object.body);
    }
}
