
import React from 'react';
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Box,
	Grid,
	Typography,
	Paper,
	IconButton,
	Container,
	FormControlLabel,
	Checkbox,
	Link,
	LinearProgress,
	Snackbar,
	Fade
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import Copyright from 'components/layouts/Footer/Copyright';
import LoginContext from 'app/context/loginContext';
import ThemeContext from 'app/context/themeContext';
import CrearCuenta from './crearCuenta';
import axios from 'axios';
import { useFormik } from 'formik'


const useStyles = makeStyles(theme => ({
	root: {
		backgroundImage: 'url(https://i.imgur.com/lCikkLi.jpg)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: '100vh'
	},
	close: {
		padding: theme.spacing(0.5)
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	main: {
		opacity: '0.8',
		height: '60%',
		marginTop: theme.spacing(10),
		[theme.breakpoints.down(400 + theme.spacing(2) * 2)]: {
			marginTop: 0,
			width: '100%',
			height: '100%'
		},
		[theme.breakpoints.between('sm', 'md')]: {
			height: '60%'
		}
	}
}));

export default function Login() {
	const [aviso, setAviso] = React.useState({ mensaje: '', aviso: false })
	const [crear, setCrear] = React.useState(false)
	const [isLoading, setIsLoading] = React.useState(false)
	const classes = useStyles()
	const { dispatchLogin } = React.useContext(LoginContext)
	const { dispatchTheme } = React.useContext(ThemeContext)

	const handleCloseMensaje = () => {
		setAviso({ mensaje: '', aviso: false })
	};


	const onSubmitLogin = values => {
		if (!isLoading) {
			setIsLoading(true);
			axios.post('http://191.98.184.211:8080/nt/token', values)
				.then(result => {
					axios.get(`http://191.98.184.211:8080/nt/api/usuario/obtener`, {
						headers: {
							'Authorization': `Bearer ${result.data.accessToken}`
						}
					}).then(response => {
						localStorage.setItem('token', JSON.stringify(result.data.accessToken))
						localStorage.setItem('perfil', JSON.stringify(response.data))
						dispatchLogin(['login', response.data])
						dispatchTheme(['cambiarTema', { temaColorPrimario: response.data.temaColorPrimario, temaColorSecundario: response.data.temaColorSecundario, temaTipo: response.data.temaTipo }])
					});
				}).catch(() => {
					setAviso({ mensaje: 'NICKNAME O PASSWORD INCORRECTOS', aviso: true })
					setIsLoading(false)
					document.getElementById('password').focus();
				})
		}
	}

	const formik = useFormik({
		initialValues: {
			nickname: '',
			password: ''
		},
		onSubmit: onSubmitLogin
	})

	const cerrarCrear = () => {
		setCrear(false)
	}

	if (localStorage.getItem('token')) {
		return (<Redirect to='/inicio' />)
	}

	return (
		<Grid container component="main" className={classes.root}>
			{crear ? <CrearCuenta cerrar={cerrarCrear} /> :
				<Fade in={true} timeout={1000}>
					<Container component={Paper} elevation={5} maxWidth='xs' className={classes.main}>
						<CssBaseline />
						<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={aviso.aviso} autoHideDuration={3000} onClose={handleCloseMensaje} style={{ opacity: '0.8' }}
							ContentProps={{ 'aria-describedby': 'mensaje' }} message={<Typography id="mensaje" variant='button'>{aviso.mensaje}</Typography>}
							action={[<IconButton key="close" aria-label="close" color="inherit" className={classes.close} onClick={handleCloseMensaje}><CloseIcon /></IconButton>]} />
						<div className={classes.paper}>
							<Avatar className={classes.avatar}>
								<LockOutlinedIcon />
							</Avatar>
							<Typography component="h1" variant="h5">
								Sign in
        					</Typography>
							<form className={classes.form} onSubmit={formik.handleSubmit}>
								<TextField
									variant="outlined"
									margin="normal"
									required
									fullWidth
									label='Nickname'
									name="nickname"
									autoComplete="nickname"
									onKeyDown={e => { if (e.keyCode === 13) { formik.handleSubmit() } }}
									disabled={isLoading}
									value={formik.values.nickname}
									onChange={formik.handleChange}
									autoFocus
									error={aviso.aviso}
								/>
								<TextField
									variant="outlined"
									margin="normal"
									error={aviso.aviso}
									required
									fullWidth
									id='password'
									name="password"
									label='Password'
									type="password"
									value={formik.values.password}
									onChange={formik.handleChange}
									disabled={isLoading}
									onKeyDown={e => { if (e.keyCode === 13) { formik.handleSubmit() } }}
									autoComplete="password"
								/>
								<FormControlLabel
									control={<Checkbox value="remember" color="primary" />}
									label="Recordarme"
									disabled={isLoading}
								/>
								{isLoading && <LinearProgress color='secondary' />}
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									disabled={formik.values.password === '' ? true : isLoading ? true : false}
									className={classes.submit}>
									Ingresar
          				</Button>
								<Grid container>
									<Grid item xs>
										<Link href="#" variant="body2">
											Recuperar contraseña
              					</Link>
									</Grid>
									<Grid item>
										<Link href="#" variant="body2" onClick={() => setCrear(true)}>
											{"Crear cuenta"}
										</Link>
									</Grid>
								</Grid>
							</form>
							<Box mt={8}>
								<Copyright />
							</Box>
						</div>
					</Container>
				</Fade>
			}
		</Grid>
	);
}