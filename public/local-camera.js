import { component, html, useState } from 'https://cdn.pika.dev/haunted';

export default component(LocalCamera);

function LocalCamera() {
	const [coords, setCoords] = useState();

	function getCoords(clickEvent) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setCoords(position.coords);
				console.debug('got current position', position);
			},
			(error) => {
				console.error('failed to get current position', error);
			},
			/*{
				maximumAge: 1000 * 60,
				timeout: 0,
				enableHighAccuracy: true,
			},*/
		);
	}

	return !coords
		? html`
				<button @click=${getCoords}>Locate Me</button>
		  `
		: html`
				<dl>
					<dt>Latitude</dt>
					<dd>${coords.latitude}</dd>
					<dt>Longitude</dt>
					<dd>${coords.longitude}</dd>
				</dl>
		  `;
}
