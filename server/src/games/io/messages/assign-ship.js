export default function assignShip(ship_id)
{
	return {
		receiver: 'assign-ship',
		data: {
			ship_id: ship_id,
		},
	};
}
