require.config({
	baseURL: '/client',
	paths: {
		// Libraries
		THREE: '/bower_components/threejs/build/three.min',
		tweenjs: '/bower_components/createjs-tweenjs/lib/tweenjs-0.5.1.min',
		lodash: '/bower_components/lodash/dist/lodash.min',
		
		// Utilities
		OrbitControls: '/lib/OrbitControls',
		Stats: '/lib/Stats'
	},
	shim: {
		THREE: {
			exports: 'window.THREE'
		},
		tweenjs: {
			exports: 'Tween',
			deps: ['THREE']
		},
		lodash: {
			exports: '_'
		},
		OrbitControls: {
			exports: 'THREE.OrbitControls',
			deps: ['THREE']
		},
		Stats: {
			exports: 'Stats',
			deps: ['THREE']
		}
	},
	deps: [
		'THREE',
		'tweenjs',
		'lodash'
	],
	callback: function (THREE, tweenjs, _) {
		// Export globals
		window.THREE = THREE;
		window.tweenjs = tweenjs;
		window._ = _;

		// Load game and start
		require(['Client'], function (Client) {
			var client = new Client(window);
		});
	}
});
