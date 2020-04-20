import Matter from 'matter-js';
const { Body, Bodies, Vector } = Matter;

import * as THREE from 'three';

import { Static, addType } from '../../objects.js';

export default class Tile extends Static
{
    static TYPE()
    {
        return 'tile';
    }

    static RADIUS()
    {
        return 10;
    }

    static create(simulation, base_object)
    {
        if(base_object.category == null)
            throw 'Missing Parameter - Tile.category';
        if(base_object.color == null)
            throw 'Missing Parameter - Tile.color';
        if(base_object.type == null)
            throw 'Cannot create of Abstract Tile';
        if(base_object.adjacents == null)
            throw 'Missing Parameter - Tile.adjacents';
        if(base_object.height == null)
            throw 'Missing Parameter - Tile.height';

        addType(base_object.type, Tile.TYPE());

        var tile = Static.create(
            simulation, base_object,
            Bodies.polygon(0, 0, 6, Tile.RADIUS()),
        );
        tile.adjacents = base_object.adjacents;
        tile.color = base_object.color;
        tile.height = base_object.height;

        return tile;
    }

    static create3D(scene, tile, material)
    {
        tile.vertices = [];
        tile.faces = [];
        tile.vertices.push(new THREE.Vector3(0, 0, 0)); // 0
        tile.vertices.push(new THREE.Vector3(0, 0, - Tile.RADIUS())); // 1, bottom, then left
        tile.vertices.push(new THREE.Vector3(Tile.RADIUS() * Math.sin(Math.PI / 3), 0, -Tile.RADIUS() * Math.cos(Math.PI / 3))); // 2, bot left, then top left
        tile.vertices.push(new THREE.Vector3(Tile.RADIUS() * Math.sin(Math.PI / 3), 0, Tile.RADIUS() * Math.cos(Math.PI / 3))); // 3, top left, then top right
        tile.vertices.push(new THREE.Vector3(0, 0, Tile.RADIUS())); // 4, top, then bot right
        tile.vertices.push(new THREE.Vector3(- Tile.RADIUS() * Math.sin(Math.PI / 3), 0, Tile.RADIUS() * Math.cos(Math.PI / 3))); // 5, top right, then bottom right
        tile.vertices.push(new THREE.Vector3(- Tile.RADIUS() * Math.sin(Math.PI / 3), 0, - Tile.RADIUS() * Math.cos(Math.PI / 3))); // 6, bot right, then bot left
        tile.faces.push(new THREE.Face3(0, 2, 1));
        tile.faces.push(new THREE.Face3(0, 3, 2));
        tile.faces.push(new THREE.Face3(0, 4, 3));
        tile.faces.push(new THREE.Face3(0, 5, 4));
        tile.faces.push(new THREE.Face3(0, 6, 5));
        tile.faces.push(new THREE.Face3(0, 1, 6));

        for(var face of tile.faces)
        {
            face.color.setStyle(tile.color);
            face.color.add(new THREE.Color(
                THREE.Math.randFloat(-.04, .04),
                THREE.Math.randFloat(-.04, .04),
                THREE.Math.randFloat(-.04, .04)
            ));
        }

        var geometry = new THREE.Geometry();
        geometry.vertices = tile.vertices;
        geometry.faces = tile.faces;

        tile.mesh = new THREE.Mesh(geometry, material);
    	tile.mesh.receiveShadow = true;
    	tile.mesh.castShadow = true;

        tile.mesh.position.set(tile.position.x, 0, tile.position.y);
        tile.mesh.rotation.set(0, tile.angle, 0, "YXZ");

        scene.add(tile.mesh);
    }

    static getBaseObject(tile)
    {
        return {
            ...Static.getBaseObject(tile),
            adjacents: tile.adjacents,
            height: tile.height,
        };
    }

    // returns the IDs of the given tiles that form the shortest path from start
    // to destination
    static getShortestTilePath(tiles, start_pos, destination_pos)
    {
        var start_tile = Tile.getObjectAtPosition(tiles, start_pos);
        var destination_tile = Tile.getObjectAtPosition(tiles, destination_pos);

        if(start_tile != null && destination_tile != null)
        {
            var unvisited_nodes = new Set();
            var paths = new Map();
            for(var s_id of tiles.keys())
            {
                paths.set(s_id, {
                    from: null,
                    distance: s_id == start_tile.s_id ? 0 : Infinity,
                });
                unvisited_nodes.add(s_id);
            }

            while(unvisited_nodes.size > 0)
            {
                var minimum_s_id = null;
                var minimum = Infinity;
                for(var unvisited of unvisited_nodes)
                {
                    if(paths.get(unvisited).distance < minimum)
                    {
                        minimum_s_id = unvisited;
                        minimum = paths.get(unvisited).distance;
                    }
                }
                unvisited_nodes.delete(minimum_s_id);

                for(var adjacent of tiles.get(minimum_s_id).adjacents)
                {
                    if(adjacent == null) continue;
                    if(!paths.has(adjacent)) continue;
                    // if the distance from start to visiting is less than
                    if(paths.get(minimum_s_id).distance + 1 < paths.get(adjacent).distance)
                    {
                        paths.get(adjacent).from = minimum_s_id;
                        paths.get(adjacent).distance = paths.get(minimum_s_id).distance + 1;
                    }
                }
            }

            var condensed_path = [];
            var last = destination_tile.s_id;
            while(last != null)
            {
                condensed_path.unshift(last);
                last = paths.get(last).from;
            }
            return condensed_path;
        }
        return null;
    }

    static averageHeights(tile, others)
    {
        for(var vertex_id = 1; vertex_id < tile.vertices.length; vertex_id ++)
        {
            var adjacent_1 = tile.adjacents[vertex_id - 1];
            var adjacent_2 = tile.adjacents[vertex_id != 1 ? vertex_id - 2 : 5];

            var height_1 = (adjacent_1 != null && others.has(adjacent_1)) ? others.get(adjacent_1).height : 0;
            var height_2 = (adjacent_2 != null && others.has(adjacent_2)) ? others.get(adjacent_2).height : 0;

            tile.vertices[vertex_id].y = (height_1 > 0 && height_2 > 0) ? (height_1 + height_2) / 2 : 0;
        }
        tile.mesh.geometry.verticesNeedUpdate = true;
    }
}
