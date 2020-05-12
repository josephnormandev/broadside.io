import Matter from 'matter-js';
const { Common, Vector } = Matter;

import TestMap from './test-map.js';

function saveMap(json)
{

}

function loadMap()
{
	return (new TestMap()).objects;
}

export {
	saveMap,
	loadMap,
};
