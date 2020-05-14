import Matter from 'matter-js';
const { Common, Vector } = Matter;

import * as FS from 'fs';

import TestMap from './test-map.js';

import generated_map from './generated-map.json';

function saveMap(array)
{
	FS.writeFileSync('/home/joseph/Documents/broadside.io/game/src/maps/generated-map.json', JSON.stringify(array));
}

function loadMap()
{
	return new Set(generated_map);
}

export {
	saveMap,
	loadMap,
};
