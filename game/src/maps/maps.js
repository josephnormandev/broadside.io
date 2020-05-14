import Matter from 'matter-js';
const { Common, Vector } = Matter;

import TestMap from './test-map.js';

import generated_map from './generated-map.json';

function saveMap(json)
{
	
}

function loadMap()
{
	return new Set(generated_map);
}

export {
	saveMap,
	loadMap,
};
