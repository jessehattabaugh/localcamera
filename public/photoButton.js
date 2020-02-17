import { component, html, useState } from 'https://cdn.pika.dev/haunted@^4.7.0';

export default component(photoButton);

function photoButton() {
	const [file, setFile] = useState();
	const [coords, setCoords] = useState();

	function requestCoords() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setCoords(position.coords);
				console.debug('🌐 got current position', position);
			},
			(error) => {
				console.error('error getting position', error);
			},
		);
		console.debug('getting location');
	}
	return html`
		<style>
			button,
			label {
				background: purple;
				border-radius: 1em;
				border: 0.1em outset purple;
				display: inline-block;
				font-size: 2em;
				padding: 0.5em;
			}
			input[capture] {
				display: none;
			}
			img {
				max-width: 100%;
			}
		</style>

		${!file
			? html`
					<label @click=${requestCoords}
						>Choose a Photo 📷
						<input
							name="photo"
							@change=${(event) => {
								const { target } = event;
								setFile(target.files[0]);
								console.debug(
									'photo-button changed',
									event,
									target.files,
								);
							}}
							type="file"
							accept="image/*"
							capture="environment"
					/></label>
			  `
			: html`
					<button
						@click=${(event) => {
							setFile(undefined);
						}}
					>
						Choose another photo
					</button>
					<img src="${URL.createObjectURL(file)}" />
			  `}
		${!coords
			? html`
					<button @click=${requestCoords}>
						Get Location
					</button>
			  `
			: html`
					<dl>
						<dt>Latitude</dt>
						<dd>${coords.latitude}</dd>
						<dt>Longitude</dt>
						<dd>${coords.longitude}</dd>
					</dl>
			  `}
	`;
}
