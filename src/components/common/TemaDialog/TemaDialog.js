import React from 'react';
import {
	Dialog,
	DialogTitle,
	Typography,
	DialogContent,
	Box,
	List,
	ListItem,
	ListItemIcon,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Divider,
	Hidden,
	Button
} from '@material-ui/core';
import OpacityOutlinedIcon from '@material-ui/icons/OpacityOutlined';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import { AuthTokenRequest } from 'helpers/AxiosInstance';
import ThemeContext from 'app/context/themeContext';
import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';
import lime from '@material-ui/core/colors/lime';
import yellow from '@material-ui/core/colors/yellow';
import amber from '@material-ui/core/colors/amber';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';
import brown from '@material-ui/core/colors/brown';
import gray from '@material-ui/core/colors/grey';
import blueGray from '@material-ui/core/colors/blueGrey';

function TemaDialog({ abrir, funcion }) {
	const colors = {
		red: {
			id: 'red',
			name: 'Red',
			import: red
		},

		pink: {
			id: 'pink',
			name: 'Pink',
			import: pink
		},

		purple: {
			id: 'purple',
			name: 'Purple',
			import: purple
		},

		deepPurple: {
			id: 'deep-purple',
			name: 'Deep Purple',
			import: deepPurple
		},

		indigo: {
			id: 'indigo',
			name: 'Indigo',
			import: indigo
		},

		blue: {
			id: 'blue',
			name: 'Blue',
			import: blue
		},

		lightBlue: {
			id: 'light-blue',
			name: 'Light Blue',
			import: lightBlue
		},

		cyan: {
			id: 'cyan',
			name: 'Cyan',
			import: cyan
		},

		teal: {
			id: 'teal',
			name: 'Teal',
			import: teal
		},

		green: {
			id: 'green',
			name: 'Green',
			import: green
		},

		lightGreen: {
			id: 'light-green',
			name: 'Light Green',
			import: lightGreen
		},

		lime: {
			id: 'lime',
			name: 'Lime',
			import: lime
		},

		yellow: {
			id: 'yellow',
			name: 'Yellow',
			import: yellow
		},

		amber: {
			id: 'amber',
			name: 'Amber',
			import: amber
		},

		orange: {
			id: 'orange',
			name: 'Orange',
			import: orange
		},

		deepOrange: {
			id: 'deep-orange',
			name: 'Deep Orange',
			import: deepOrange
		},

		brown: {
			id: 'brown',
			name: 'Brown',
			import: brown
		},

		gray: {
			id: 'gray',
			name: 'Gray',
			import: gray
		},

		blueGray: {
			id: 'blue-gray',
			name: 'Blue Gray',
			import: blueGray
		}
	};

	const types = {
		light: {
			id: 'light',
			name: 'Light'
		},

		dark: {
			id: 'dark',
			name: 'Dark'
		}
	};

	const { dispatchTheme } = React.useContext(ThemeContext)
	const data = JSON.parse(localStorage.getItem('perfil'))
	const [tema, setTema] = React.useState({
		temaColorPrimario: data.temaColorPrimario,
		temaColorSecundario: data.temaColorSecundario,
		temaTipo: data.temaTipo
	})

	const handleColorChange = (event) => {
		setTema({
			...tema,
			[event.target.name]: event.target.value
		})
	};

	const cambiarTema = () => {
		AuthTokenRequest.post('/api/usuario/guardartema', tema)
			.then(() => {
				AuthTokenRequest.get(`/api/usuario/obtener`)
					.then(result => {
						localStorage.setItem('perfil', JSON.stringify(result.data))
						dispatchTheme(['cambiarTema', tema])
						funcion()
					})
			})
	}

	return (
		<Dialog open={abrir} onClose={funcion}>
			<DialogTitle disableTypography>
				<Typography variant="h6">
					Cambiar paleta de colores
          </Typography>
			</DialogTitle>
			<DialogContent>
				<List disablePadding>
					<Box mb={1}>
						<ListItem>
							<ListItemIcon>
								<OpacityOutlinedIcon color='primary' />
							</ListItemIcon>

							<FormControl fullWidth>
								<InputLabel>Color primario</InputLabel>

								<Hidden smUp>
									<Select
										native
										value={tema.temaColorPrimario}
										name='temaColorPrimario'
										onChange={handleColorChange}
									>
										{Object.keys(colors).map((color) => {
											color = colors[color];
											return (
												<option key={color.id} value={color.id}>{color.name}</option>
											);
										})}
									</Select>
								</Hidden>

								<Hidden xsDown>
									<Select
										value={tema.temaColorPrimario}
										name='temaColorPrimario'
										onChange={handleColorChange}
									>
										{Object.keys(colors).map((color) => {
											color = colors[color];
											return (
												<MenuItem key={color.id} value={color.id}>{color.name}</MenuItem>
											);
										})}
									</Select>
								</Hidden>
							</FormControl>
						</ListItem>
					</Box>

					<Box mb={1}>
						<ListItem>
							<ListItemIcon>
								<OpacityOutlinedIcon color='secondary' />
							</ListItemIcon>

							<FormControl fullWidth>
								<InputLabel>Color secundario</InputLabel>

								<Hidden smUp>
									<Select
										native
										value={tema.temaColorSecundario}
										name='temaColorSecundario'
										onChange={handleColorChange}

									>
										{Object.keys(colors).map((color) => {
											color = colors[color];

											return (
												<option key={color.id} value={color.id}>{color.name}</option>
											);
										})}
									</Select>
								</Hidden>

								<Hidden xsDown>
									<Select

										value={tema.temaColorSecundario}
										name='temaColorSecundario'
										onChange={handleColorChange}
									>
										{Object.keys(colors).map((color) => {
											color = colors[color];

											return (
												<MenuItem key={color.id} value={color.id}>{color.name}</MenuItem>
											);
										})}
									</Select>
								</Hidden>
							</FormControl>
						</ListItem>
					</Box>

					<Box mb={1}>
						<ListItem>
							<ListItemIcon>
								<InvertColorsIcon />
							</ListItemIcon>

							<FormControl fullWidth>
								<InputLabel>Tipo</InputLabel>

								<Hidden smUp>
									<Select
										native
										value={tema.temaTipo}
										name='temaTipo'
										onChange={handleColorChange}

									>
										{Object.keys(types).map((type) => {
											type = types[type];

											return (
												<option key={type.id} value={type.id}>{type.name}</option>
											);
										})}
									</Select>
								</Hidden>

								<Hidden xsDown>
									<Select
										value={tema.temaTipo}
										name='temaTipo'
										onChange={handleColorChange}
									>
										{Object.keys(types).map((type) => {
											type = types[type];

											return (
												<MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
											);
										})}
									</Select>
								</Hidden>
							</FormControl>
						</ListItem>
					</Box>

					<Box mt={2} mb={1}>
						<Divider light />
					</Box>

					<ListItem>
						<Box mb={1}>
							<Hidden smUp>
								<Button
									color="secondary"
									variant="contained"
									onClick={() => cambiarTema()}>
									Cambiar
              				</Button>
							</Hidden>
							<Hidden xsDown>
								<Button
									color="secondary"
									variant="contained"
									onClick={() => cambiarTema()}>
									Cambiar
              				</Button>
							</Hidden>
						</Box>
					</ListItem>
				</List>
			</DialogContent>
		</Dialog>
	)
}

export default TemaDialog;
