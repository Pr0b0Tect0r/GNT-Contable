import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, Typography, Divider, IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Logo from '../../../assets/images/Logo.svg';
import { APP } from 'constants/app';
import AppInteractionContext from 'app/context/appInteraction';
import { AuthTokenRequest } from 'helpers/AxiosInstance';
import { groupNested } from 'helpers/Utils';
import { ID_MENU_PADRE } from 'constants/app';
import SidebarNav from './SidebarNav'

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		[theme.breakpoints.down(768 + theme.spacing(2) * 2)]: {
			display: 'none'
		}
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: '#364049',
	},
	drawerHeader: {
		backgroundColor: '#1f303d',
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	title: {
		flexGrow: 1,
	},
	bigAvatar: {
		marginLeft: theme.spacing(10),
		marginRight: 'auto',
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		width: 120,
		height: 'auto'
	},
	lista: {
		color: theme.palette.getContrastText('#364049'),
		'&:hover': {
			backgroundColor: '#1f303d',
			color: theme.palette.getContrastText('#1f303d')
		}
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
	nested: {
		paddingLeft: theme.spacing(4),
		color: theme.palette.getContrastText('#364049'),
		'&:hover': {
			backgroundColor: '#1f303d',
			color: theme.palette.getContrastText('#1f303d')
		}
	}
}));

function Sidebar() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const [menuItems, setMenuItems] = React.useState({ plain: [], grouped: [] })
	const theme = useTheme();
	const classes = useStyles()

	const ocultar = () => {
		dispatch(['menu', false])
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
					<IconButton style={{ color: '#ffffff' }} onClick={() => ocultar()}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
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

	return (
		<Drawer
			className={classes.drawer}
			variant="persistent"
			anchor="left"
			open={interactions.menuOpen}
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			<Sidebarnavdawer />
			<Divider className={classes.divisor} />
		</Drawer>
	);
}

export default withRouter(Sidebar);