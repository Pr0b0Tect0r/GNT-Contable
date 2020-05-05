
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
	Container,
	FormControlLabel,
	Checkbox,
	Link,
	LinearProgress,
	Fade
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../../layouts/Footer/Copyright';


const useStyles = makeStyles(theme => ({
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
		height: '77%',
		marginTop: theme.spacing(10),
		[theme.breakpoints.down(400 + theme.spacing(2) * 2)]: {
			marginTop: 0,
			width: '100%',
			height: '100%'
		},
		[theme.breakpoints.between('sm', 'md')]: {
			height: '77%'
		}
	}
}));

export default function CrearCuenta({ cerrar }) {
	const [cuerpo, setCuerpo] = React.useState({ nickname: '', password: '', cpassword: '' })
	const [isLoading, setIsLoading] = React.useState(false)
	const classes = useStyles();


	const onChange = (e) => {
		setCuerpo({ ...cuerpo, [e.target.name]: e.target.value })
	}

	const crear = () => {
		if (!isLoading) {
			setIsLoading(true);
			setTimeout(() => {
				setIsLoading(false)
			}, 1000)
		}
	}

	return (
		<Fade in={true} timeout={1000}>
			<Container component={Paper} elevation={5} maxWidth='xs' className={classes.main}>
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Crear cuenta
        			</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							label='Nickname'
							name="nickname"
							autoComplete="nickname"
							onKeyDown={e => { if (e.keyCode === 13) { document.getElementById('email').focus() } }}
							disabled={isLoading}
							onChange={onChange}
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id='email'
							name="email"
							label='email'
							onChange={onChange}
							disabled={isLoading}
							onKeyDown={e => { if (e.keyCode === 13) { document.getElementById('password').focus() } }}
							autoComplete="password"
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id='password'
							name="password"
							label='Password'
							type="password"
							onChange={onChange}
							disabled={isLoading}
							onKeyDown={e => { if (e.keyCode === 13) { document.getElementById('cpassword').focus() } }}
							autoComplete="password"
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id='cpassword'
							name="cpassword"
							label='Confirm Password'
							type="password"
							error={cuerpo.password !== cuerpo.cpassword ? true : false}
							helperText={cuerpo.password !== cuerpo.cpassword ? 'Ambas password deben coincidir' : null}
							onChange={onChange}
							disabled={isLoading}
							onKeyDown={e => { if (e.keyCode === 13) { crear() } }}
							autoComplete="password"
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Acepto terminos y condiciones"
							disabled={isLoading}
						/>
						{isLoading && <LinearProgress color='secondary' />}
						<Button
							fullWidth
							variant="contained"
							color="primary"
							onClick={() => crear()}
							disabled={cuerpo.cpassword === '' ? true : isLoading ? true : false}
							className={classes.submit}>
							Crear cuenta
          				</Button>
						<Grid container alignContent='center'>
							<Grid item>
								<Link href="#" variant="body2" onClick={() => cerrar()}>
									{"Ya posees cuenta?"}
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
	);
}