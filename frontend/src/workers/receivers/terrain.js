export function receive(page, data)
{
	const objects = data.objects;

	if(objects != null)
	{
		page.terrain.generate(page.scene, objects);
	}
}

export const receiver = 'terrain';
