import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer, CssBaseline, AppBar, Toolbar, List, ListItemAvatar, Badge, Typography, Divider, IconButton, ListItem, ListItemText, Avatar, MenuItem, Menu, Backdrop } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, withRouter, useHistory } from 'react-router-dom';
import TemaDialog from 'components/common/TemaDialog';
import Logo from 'assets/images/Logo.svg';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import LoginContext from 'app/context/loginContext';
import ThemeContext from 'app/context/themeContext';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { APP } from 'constants/app';
import AppInteractionContext from 'app/context/appInteraction';
import SidebarNav from 'components/layouts/Sidebar/SidebarNav';
import { AuthTokenRequest } from 'helpers/AxiosInstance';
import { groupNested } from 'helpers/Utils';
import { ID_MENU_PADRE } from 'constants/app';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		display: 'none',
		marginRight: theme.spacing(2),
		[theme.breakpoints.down(768 + theme.spacing(2) * 2)]: {
			display: 'initial'
		}
	},
	menuOpenBig: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.down(768 + theme.spacing(2) * 2)]: {
			display: 'none'
		}
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: '#364049'
	},
	drawerHeader: {
		backgroundColor: '#1f303d',
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	avatarButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
		marginLeft: theme.spacing(22),
		[theme.breakpoints.down(768 + theme.spacing(2) * 2)]: {
			marginLeft: 'auto'
		}
	},
	bigAvatar: {
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		width: 120,
		height: 'auto'
	},
	back: {
		transform: 'translateZ(0px)',
		position: 'fixed',
		zIndex: 100
	},
	lista: {
		color: theme.palette.getContrastText('#364049'),
		'&:hover': {
			backgroundColor: '#1f303d',
			color: theme.palette.getContrastText('#1f303d')
		}
	},
	snack: {
		opacity: '0.8'
	},
	message: {
		display: 'flex',
		alignItems: 'center'
	},
	avatarMensaje: {
		marginRight: theme.spacing(1)
	},
	close: {
		padding: theme.spacing(0.5)
	},
	contenedorLetras: {
		backgroundColor: '#1f303d',
		width: '100%',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		color: theme.palette.getContrastText('#1f303d')
	},
	iconos: {
		color: theme.palette.getContrastText('#364049')
	},
	divisor: {
		backgroundColor: theme.palette.getContrastText('#364049')
	},
	textoPerfil: {
		width: '100%',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar
	},
	nested: {
		paddingLeft: theme.spacing(4),
		color: theme.palette.getContrastText('#364049'),
		'&:hover': {
			backgroundColor: '#1f303d',
			color: theme.palette.getContrastText('#1f303d')
		}
	},
	avatarPerfil: {
		marginLeft: 'auto',
		marginRight: 'auto',
		width: 88,
		height: 88
	}
}));

function Cabecera() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const abrir = Boolean(anchorEl);
	const [openDialog, setOpenDialog] = React.useState(false)
	const { authLogin, dispatchLogin } = React.useContext(LoginContext)
	const history = useHistory()
	const { dispatchTheme } = React.useContext(ThemeContext)
	const { dispatch } = React.useContext(AppInteractionContext)
	const [menuItems, setMenuItems] = React.useState({ plain: [], grouped: [] })

	const handleDrawerOpen = () => {
		setOpen(!open);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleMenu = event => {
		setAnchorEl(event.currentTarget);
	};


	const LogOut = () => {
		setAnchorEl(null);
		var palette = { temaColorPrimario: 'indigo', temaColorSecundario: 'red', temaTipo: 'light' }
		dispatchLogin(['logout', null])
		dispatchTheme(['cambiarTema', palette])
		history.push('/login')
		localStorage.clear();

	}


	const dialog = () => {
		setOpenDialog(true)
	}

	const cerrar = () => {
		setOpenDialog(false)
	}

	React.useEffect(() => {
		const reqMenuLista = async () => {
			await AuthTokenRequest.get("/api/menu/listar")
				.then(response => {
					setMenuItems({
						plain: response.data,
						grouped: groupNested(response.data, ID_MENU_PADRE, "idmenu", "idmenupadre")
					})
				})
				.catch(function (err) {
					console.log("SidebarERROR: ", err);
				})
		}
		reqMenuLista()
	}, []) // vacio para cargar al inicio

	const Sidebarnavdawer = () => {
		return (
			<>
				<div className={classes.drawerHeader}>
					<img alt='...' src={Logo} className={classes.bigAvatar} />
				</div>
				<div className={classes.contenedorLetras}>
					<Typography variant='body1' align='center'>{APP.APP_NAME}</Typography>
					<Typography variant='body2' align='center'>{APP.APP_VERSION}</Typography>
				</div>
				<Divider className={classes.divisor} />
				<SidebarNav
					menuItems={menuItems}
				/>
			</>
		);
	}


	if (localStorage.getItem('token') === null) { return (<Redirect to='/login' />) }

	return (
		<div className={classes.root}>
			<CssBaseline />
			<TemaDialog abrir={openDialog} funcion={() => cerrar()} />
			<Backdrop open={open} className={classes.back} onClick={() => handleDrawerClose()} />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={() => dispatch(['menu', true])}
						edge="start"
						className={classes.menuOpenBig}
					>
						<ChevronRightIcon />
					</IconButton>
					<Typography variant='h6' className={classes.title} />
					<>
						<div>
							<IconButton color="inherit">
								<Badge badgeContent={5} color='secondary'>
									<NotificationsNoneOutlinedIcon />
								</Badge>
							</IconButton>
							<IconButton onClick={() => dialog()} color="inherit">
								<PaletteOutlinedIcon />
							</IconButton>
							<IconButton onClick={handleMenu} color="inherit">
								<PersonOutlineOutlinedIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={abrir}
								onClose={() => setAnchorEl(null)}>
								<MenuItem>
									<List>
										<ListItem>
											<ListItemAvatar>
												<Avatar className={classes.avatarPerfil} src={authLogin.nombre === 'Samuel Bustamante' ? 'https://i.imgur.com/TEdFlIO.jpg' : authLogin.nombre === 'Alexander Rodriguez' ? 'https://i.imgur.com/2pO2Cl7.jpg' : authLogin.foto} alt='...' />
											</ListItemAvatar>
											<ListItemText primary={<div className={classes.textoPerfil}>
												<Typography align='center'>{authLogin.nombre === 'Samuel Bustamante' ? 'programador@gnt.pe' : authLogin.nombre === 'Alexander Rodriguez' ? 'alex.rodriguez@gnt.pe' : authLogin.correo}</Typography>
												<Typography align='center'><b>{authLogin.nombre}</b></Typography>
												<Typography align='center'><em>{authLogin.nombre === 'Samuel Bustamante' ? 'Programador senior Front-end' : authLogin.nombre === 'Alexander Rodriguez'? 'Programador junior fullStack' : authLogin.cargo}</em></Typography>
											</div>} />
										</ListItem>
									</List>
								</MenuItem>
								<Divider />
								<MenuItem>Mi perfil</MenuItem>
								<MenuItem>Mi cuenta</MenuItem>
								<Divider />
								<MenuItem onClick={() => LogOut()}><ExitToAppOutlinedIcon /> Cerrar serión</MenuItem>
							</Menu>
						</div>
					</>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<Sidebarnavdawer />
				<Divider className={classes.divisor} />
			</Drawer>
		</div>
	);
}

export default withRouter(Cabecera);