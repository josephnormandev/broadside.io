import AuthService from '../../auth/auth.service.js';

async function logout(req, res)
{
	AuthService.playerLogout(req);
	res.status(200).json();
}

export const url = '/players/logout';
export const action = [ logout ];
