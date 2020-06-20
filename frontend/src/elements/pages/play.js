import React from 'react';
import { withRouter } from 'react-router-dom';

import * as THREE from 'three';

import checkMe from '../../workers/check-me';
import Client from '../../workers/client';

import Inputs from '../../game/inputs/inputs';

import Terrain from '../../game/terrain/terrain';

class PlayPage extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			authorized: false,
		};

		this.receivers = new Map();
	}

	start()
	{
		this.scene = new THREE.Scene();
		this.scene.add(new THREE.AxesHelper(5));

		this.inputs = new Inputs(this);

		this.terrain = new Terrain();
		this.dynamics = new Map();

		// tell the server we are ready to play the game

		
		this.animate();
	}

	mount()
	{
		this.inputs.mount(this.renderer_mount, this.scene);
	}

	animate()
	{
		requestAnimationFrame(this.animate.bind(this));

		if(this.inputs.mounted)
		{
			this.inputs.update();
			this.inputs.render(this.scene);
		}
	}

	unmount()
	{
		this.inputs.unmount(this.scene);
	}

	handleMessage(receiver, data)
	{
		if(this.inputs.mounted)
		{
			if(this.receivers.has(receiver))
			{
				this.receivers.get(receiver)(this, data);
			}
		}
	}

	handleClose()
	{
		console.log('Websocket closed...');
		this.setState({
			authorized: false,
		});
	}

	async componentDidMount()
	{
		window.addEventListener('resize', this.handleResize.bind(this));
		const { logged_in, in_game } = await checkMe();

		if(!logged_in)
		{
			return this.props.history.push('/login');
		}
		else if(!in_game)
		{
			return this.props.history.push('/lobby');
		}

		if(await Client.open(this.handleMessage.bind(this), this.handleClose.bind(this)))
		{
			this.setState({
				authorized: true,
			});
			console.log('Websocket opened...');

			this.start();
			this.mount();
		}
		else
		{
			console.log('Websocket failed to open');
		}
	}

	render()
	{
		return (
			<div>
				<> { !this.state.authorized &&
					<h1>
						Authorizing...
					</h1>
				} { this.state.authorized &&
					<div style={{
						width: '100vw',
						height: '100vh',
					}} ref={
						ref => (this.renderer_mount = ref)
					} />
				} </>
			</div>
		);
	}

	handleResize()
	{
		if(this.state.authorized)
		{
			this.unmount();
			this.mount();
		}
	}
}

export default withRouter(PlayPage);
