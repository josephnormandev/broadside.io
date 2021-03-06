// terrain is a massive array of all things that are pertaining to the terrain.
// this can include all the ground/water tiles along with the spawn points. This
// information is necessary to play the game while also being available for the
// prematch phase
export default function terrain(objects, width, height)
{
	return {
		receiver: 'terrain',
		data: {
			objects: objects,
			width: width,
			height: height,
		},
	};
}
