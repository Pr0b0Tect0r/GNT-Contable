import React from 'react';
import { CssBaseline, Paper, Typography, Grid, Button, Fade, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Box, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AnexoContext from './anexoContext';
import { AuthTokenRequest } from 'helpers/AxiosInstance';
import MaterialTable from 'material-table';
import Alert from 'components/common/Alert';
import AppInteractionContext from 'app/context/appInteraction';
import DialogHistorial from 'components/common/DialogHistorial';
import Loader from 'components/common/Loader';
import Speed from 'components/common/SpeedDial';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		marginTop: theme.spacing(6),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 800,
			marginBottom: theme.spacing(10),
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	card: {
		width: 400,
		margin: theme.spacing(5)
	},
	avatar: {
		backgroundColor: theme.palette.secondary.main,
		width: 70,
		height: 70,
		margin: 'auto'
	},
	texto: {
		marginTop: theme.spacing(4)
	},
	info: {
		marginTop: theme.spacing(1)
	},
	input: {
		display: 'none',
	},
	cabecera: {
		position: 'relative',
		marginTop: theme.spacing(1)
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	table: {
		minWidth: 300
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
	formControl: {
		marginTop: theme.spacing(2),
		width: '100%'
	}
}));


const defaultValues = {
	"id_anexo": "",
	"id_empresa": "1",
	"ap_paterno": "",
	"ap_materno": "",
	"nombre": "",
	"nm_anexo": "",
	"nm_alias": "",
	"direccion": "",
	"ciudad": "",
	"id_pais": "1",
	"region": "",
	"departamento": "",
	"provincia": "",
	"distrito": "",
	"telef_1": "",
	"telef_2": "",
	"telef_3": "",
	"fax": "",
	"id_tdocumento": "06",
	"ruc": "",
	"notas": "",
	"codcli": "",
	"nodomiciliado": false,
	"estado": "1",
	"rg_identificacion": ""
}

const defaultProps = {
	bgcolor: 'background.paper',
	m: 1,
	border: 1,
	style: { width: '100%', height: 'auto' },
};

const defaultOptions = {
	draggable: false,
	search: false,
	paging: false,
	pageSizeOptions: []
}

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} timeout={500} />;
});

export default function AnexoForm() {
	const { anexo, dispatchAnexo } = React.useContext(AnexoContext)
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	const tableRef = React.useRef()
	const [infoAnexo, setInfoAnexo] = React.useState(interactions.path === '/smnuAnexo/form' ? anexo.anexoInfo : defaultValues)
	const [idTAnexo, setidTAnexo] = React.useState(null)
	const [tDocumento, setTDocumento] = React.useState([])
	const [pais, setPais] = React.useState([])
	const [tipoAnexo, setTipoAnexo] = React.useState([])
	const [openDialog, setOpenDialog] = React.useState(false)
	const [openAlert, setOpenAlert] = React.useState(false)
	const [mensajeAlert, setMensajeAlert] = React.useState({ mensaje: 'j', severity: 'info' })
	const classes = useStyles()

	const closeAlert = () => {
		setOpenAlert(false)
	}

	const consultar = () => {
		AuthTokenRequest.get(`/api/general/historial?codhistoriareg=D383F6CE-74F1-47C2-9CCE-A5056D5698C9`)
			.then(result => {
				dispatch(['historial', result.data])
			})

		AuthTokenRequest.get('/api/tipodocumentoidentidad/listar')
			.then(result => {
				setTDocumento(result.data)
			})

		AuthTokenRequest.get('/api/pais/listar')
			.then(result => {
				setPais(result.data)
			})

		AuthTokenRequest.get('/api/anexotipo/listar')
			.then(result => {
				setTipoAnexo(result.data)
			})
	}

	const handleChange = e => {
		setInfoAnexo({
			...infoAnexo,
			[e.target.name]: e.target.value
		})
	}

	const handleChangeTanexo = e => {
		setidTAnexo(e.target.value)
	}

	const onSubmitGuardar = () => {
		dispatch(['openLoader', true])
		if (typeof anexo.anexoInfo.id_anexo !== 'undefined') {
			AuthTokenRequest.post('/api/anexo/modificar', infoAnexo)
				.then(result => {
					setOpenAlert(true)
					setMensajeAlert({
						...mensajeAlert,
						mensaje: result.data.error === '' ? 'Operación exitosa' : result.data.error,
						severity: result.data.error === '' ? 'success' : 'error'
					})
					dispatch(['openLoader', false])
				})
		} else {
			AuthTokenRequest.post('/api/anexo/insertar', infoAnexo)
				.then(result => {
					if (result.data.error === '') {
						AuthTokenRequest.get(`/api/anexo/obtener?id_anexo=${result.data.salida}`)
							.then(response => {
								dispatchAnexo(['anexoInfo', response.data])
								setInfoAnexo(response.data)
								dispatch(['anexoForm', '/smnuAnexo/form'])
								dispatch(['openLoader', false])
							})
						setOpenAlert(true)
						setMensajeAlert({
							...mensajeAlert,
							mensaje: 'Operación exitosa',
							severity: 'success'
						})
					} else {
						dispatch(['openLoader', false])
						setOpenAlert(true)
						setMensajeAlert({
							...mensajeAlert,
							mensaje: result.data.error,
							severity: 'error'
						})
					}
				})
		}
	}

	const onSubmitGuardarTAnexo = () => {
		AuthTokenRequest.post('/api/anexomaestro/insertar', { id_anexo: infoAnexo.id_anexo, id_tanexo: idTAnexo })
			.then(result => {
				onRefreshData()
				setOpenDialog(false)
				setOpenAlert(true)
				setMensajeAlert({
					...mensajeAlert,
					mensaje: result.data.error === '' ? 'Operación exitosa' : result.data.error,
					severity: result.data.error === '' ? 'success' : 'error'
				})
			})
	}

	const anexoMaestro = query => new Promise((resolve, reject) => {
		AuthTokenRequest.get(`/api/anexomaestro/examinar?id_anexo=${anexo.anexoInfo.id_anexo}`)
			.then(result => {
				resolve({
					data: result.data,
					page: query.page,
					pageSize: result.data.length,
					totalCount: result.data.length,
				})
			})
	})

	const onRefreshData = () => {
		tableRef.current && tableRef.current.onQueryChange()
	}

	const onDeleteTAnexo = id => {
		AuthTokenRequest.post(`/api/anexomaestro/eliminar?id_anexo=${anexo.anexoInfo.id_anexo}&id_tanexo=${id}`)
			.then(result => {
				onRefreshData()
				setOpenAlert(true)
				setMensajeAlert({
					...mensajeAlert,
					mensaje: result.data.error === '' ? 'Operación exitosa' : result.data.error,
					severity: result.data.error === '' ? 'success' : 'error'
				})
			})
	}

	React.useEffect(consultar, [])

	return (
		<React.Fragment>
			<CssBaseline />
			<main className={classes.layout}>
				<Loader />
				<DialogHistorial />
				<Speed action={[{nombre:'Volver'}, {nombre: 'Guardar'}, {nombre:'Historial'}]} guardar={onSubmitGuardar} />
				<Alert openAlert={openAlert} closeAlert={closeAlert} mensaje={mensajeAlert.mensaje} severity={mensajeAlert.severity} />
				<Dialog
					open={openDialog} TransitionComponent={Transition} keepMounted onClose={() => setOpenDialog(false)} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
					<DialogTitle id="alert-dialog-slide-title">Maestro asociado</DialogTitle>
					<DialogContent>
						<Grid container spacing={2}>
							<FormControl className={classes.formControl}>
								<Select value={idTAnexo || ''} onChange={handleChangeTanexo} fullWidth>
									{tipoAnexo.map((tanexo, index) => (
										<MenuItem key={index} value={tanexo.id_tanexo}>{tanexo.nombre}</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setOpenDialog(false)} color="secondary">
							Cancelar
          			</Button>
						<Button variant='contained' onClick={onSubmitGuardarTAnexo} color="primary">
							Guardar
          			</Button>
					</DialogActions>
				</Dialog>
				<Fade in={true} timeout={500}>
					<Paper elevation={4} className={classes.root}>
						<Typography variant='h6' color='textPrimary'>Anexo</Typography>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={4}>
								<TextField
									value={infoAnexo.id_anexo}
									margin='normal'
									disabled
									fullWidth
									label='Código'
								/>
							</Grid>
							<Grid item xs={12} sm={4}>
								<TextField
									value={''}
									margin='normal'
									disabled
									fullWidth
									label='Código antiguo'
								/>
							</Grid>
							<Grid item xs={12} sm={4} />
							<Grid item xs={12} sm={4}>
								<FormControl className={classes.formControl}>
									<InputLabel>Documento de identidad</InputLabel>
									<Select value={tDocumento.length ? infoAnexo.id_tdocumento : ""} name='id_tdocumento' onChange={handleChange} fullWidth>
										{tDocumento.map((documento, index) => (
											<MenuItem key={index} value={documento.id_tdocumento}>{documento.alias}</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={4}>
								<TextField
									name='ruc'
									required
									value={infoAnexo.ruc || ''}
									margin='normal'
									fullWidth
									onChange={handleChange}
									label='Número de identificación'
								/>
							</Grid>
							<Grid item xs={12} sm={4} />
							<Grid item xs={12} sm={6}>
								<TextField
									name='nm_anexo'
									value={infoAnexo.nm_anexo || ''}
									margin='normal'
									required
									fullWidth
									onChange={handleChange}
									placeholder='Nombre o razón comercial'
									label='Nombre o razón comercial'
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									name='nm_alias'
									value={infoAnexo.nm_alias}
									margin='normal'
									fullWidth
									onChange={handleChange}
									placeholder='Nombre comercial o alias'
									label='Nombre comercial o alias'
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									name='direccion'
									value={infoAnexo.direccion}
									margin='normal'
									fullWidth
									onChange={handleChange}
									placeholder='Dirección'
									label='Dirección'
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									name='ciudad'
									value={infoAnexo.ciudad}
									margin='normal'
									fullWidth
									onChange={handleChange}
									placeholder='Ciudad'
									label='Ciudad'
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControl className={classes.formControl}>
									<InputLabel>País</InputLabel>
									<Select value={pais.length ? infoAnexo.id_pais : ""} name='id_pais' onChange={handleChange} fullWidth>
										{pais.map((pais, index) => (
											<MenuItem key={index} value={pais.id_pais}>{pais.nm_pais}</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12} sm={4}>
								<TextField
									name='departamento'
									value={infoAnexo.departamento}
									margin='normal'
									fullWidth
									onChange={handleChange}
									placeholder='Departamento'
									label='Departamento'
								/>
							</Grid>
							<Grid item xs={12} sm={4}>
								<TextField
									name='provincia'
									value={infoAnexo.provincia}
									margin='normal'
									fullWidth
									onChange={handleChange}
									placeholder='Provincia'
									label='Provincia'
								/>
							</Grid>
							<Grid item xs={12} sm={4}>
								<TextField
									name='distrito'
									value={infoAnexo.distrito}
									margin='normal'
									fullWidth
									onChange={handleChange}
									placeholder='Distrito'
									label='Distrito'
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									name='telef_1'
									value={infoAnexo.telef_1}
									margin='normal'
									fullWidth
									onChange={handleChange}
									placeholder='Teléfono 1'
									label='Teléfono 1'
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									name='telef_2'
									value={infoAnexo.telef_2}
									margin='normal'
									fullWidth
									onChange={handleChange}
									placeholder='Teléfono 2'
									label='Teléfono 2'
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									name='telef_3'
									value={infoAnexo.telef_3}
									margin='normal'
									fullWidth
									onChange={handleChange}
									placeholder='Movil'
									label='Movil'
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									name='fax'
									value={infoAnexo.fax}
									margin='normal'
									fullWidth
									onChange={handleChange}
									placeholder='Fax'
									label='Fax'
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									name='notas'
									multiline
									rows={5}
									value={infoAnexo.notas}
									margin='normal'
									fullWidth
									onChange={handleChange}
									placeholder='Notas'
									label='Notas'
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControlLabel
									control={
										<Checkbox
											checked={infoAnexo.nodomiciliado}
											onChange={handleChange}
											name="nodomiciliado"
										/>
									}
									label="No domiciliado"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControl className={classes.formControl}>
									<InputLabel>Estado</InputLabel>
									<Select value={infoAnexo.estado} name='estado' onChange={handleChange} fullWidth>
										<MenuItem key='1' value='1'>Activo</MenuItem>
										<MenuItem key='2' value='0'>Inactivo</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							{interactions.path === '/smnuAnexo/form' ?
								<>
									<Box borderColor='primary.main' borderRadius={5} {...defaultProps}>
										<Grid container spacing={2} style={{ padding: '5px' }}>
											<Grid item xs={12}>
												<MaterialTable
													title='Categoría anexo'
													columns={[
														{ title: 'Código', field: 'id_tanexo' },
														{ title: 'Nombre', field: 'nombre' },
													]}
													data={anexoMaestro}
													options={defaultOptions}
													tableRef={tableRef}
													actions={[
														{
															icon: 'delete',
															tooltip: 'Eliminar',
															onClick: (event, rowData) => onDeleteTAnexo(rowData.id_tanexo)
														},
														{
															icon: 'add',
															tooltip: 'Nuevo',
															isFreeAction: true,
															onClick: (event) => setOpenDialog(true)
														}
													]}
													localization={{
														header: {
															actions: 'Acciones'
														},
														body: { emptyDataSourceMessage: 'No hay nada para mostrar' }
													}}
												/>
											</Grid>
										</Grid>
									</Box>
								</>
								: null}
						</Grid>
					</Paper>
				</Fade>
			</main>
		</React.Fragment>
	);
}