import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import AnexoContext from './anexoContext';
import { AuthTokenRequest } from 'helpers/AxiosInstance';
import Table from 'components/common/Table';
import { makeCommonFilterObject } from 'helpers/Utils';
import AppInteractionContext from 'app/context/appInteraction';
import AnexoForm from './AnexoForm';
import Alert from 'components/common/Alert';
import Speed from 'components/common/SpeedDial';
import Loader from 'components/common/Loader';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(8),
        paddingLeft: theme.spacing(4)
    },
    usuarios: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));


export default function Anexo() {
    const { interactions, dispatch } = React.useContext(AppInteractionContext)
    const { anexo, dispatchAnexo } = React.useContext(AnexoContext)
    const [filtro, setFiltro] = React.useState({
        "page": 1,
        "rows": "20",

        "id_empresa": "1",
        "id_anexo": "0",

        "nm_anexo_tb": "0",
        "nm_anexo": "",

        "nm_alias_tb": "0",
        "nm_alias": "",

        "tdocumento_tb": "0",
        "tdocumento": "",

        "ruc_tb": "0",
        "ruc": "",

        "nomestado_tb": "0",
        "nomestado": "",

        "sortcolumn": "",
        "sortorder": ""
    })
    const [filtroTableColumns, setFiltroTableColumns] = React.useState(makeCommonFilterObject(anexo.filterConfig))
    const [openAlert, setOpenAlert] = React.useState(false)
    const [mensajeAlert, setMensajeAlert] = React.useState({ mensaje: 'j', severity: 'info' })
    const [action, setAction] = React.useState([])
    const classes = useStyles()

    const closeAlert = () => {
        setOpenAlert(false)
    }

    const listarAnexos = query => new Promise((resolve, reject) => {
        setFiltro({
            ...filtro,
            page: query.page + 1,
            rows: query.pageSize,
            sortcolumn: query.orderBy && query.orderBy.field,
            sortorder: query.orderDirection
        })
        AuthTokenRequest.post('/api/anexo/examinar', filtro)
            .then(result => {
                resolve({
                    data: result.data.items,
                    page: query.page,
                    pageSize: query.pageSize,
                    totalCount: result.data.registros,
                })
            })
    })

    const editCLick = data => {
        AuthTokenRequest.get(`/api/anexo/obtener?id_anexo=${data.id_anexo}`)
            .then(result => {
                dispatchAnexo(['anexoInfo', result.data])
                dispatch(['anexoForm', `${window.location.pathname}/form`])
            })
    }

    const eliminarClick = (id, refresh) => {
        dispatch(['openLoader', true])
        AuthTokenRequest.post(`/api/anexo/eliminar?id_anexo=${id}`)
            .then(result => {
                refresh()
                dispatch(['openLoader', false])
                setOpenAlert(true)
                setMensajeAlert({
                    ...mensajeAlert,
                    mensaje: result.data.error === '' ? 'Operación exitosa' : result.data.error,
                    severity: result.data.error === '' ? 'success' : 'error'
                })
            }).catch(err => {
                console.log(err)
                dispatch(['openLoader', false])
            })
    }

    const changeFiltro = () => {
        AuthTokenRequest.get(`/api/general/accesolistar?codigoformulario=mant_anexo_lista`)
            .then(result => {
                dispatch(['acciones', result.data])
            })
        setFiltro({
            ...filtro,
            ...filtroTableColumns
        })
    }

    const guardarPdf = () => {
        var FileSaver = require('file-saver');
        dispatch(['openLoader', true])
        AuthTokenRequest.post('/api/anexo/pdf', anexo.reportQuery, {
            responseType: 'blob'
        })
            .then(result => {
                dispatch(['openLoader', false])
                FileSaver.saveAs(result.data, 'Lista de Anexos.pdf');
            })
    }

    const guardarExcel = () => {
        var FileSaver = require('file-saver');
        dispatch(['openLoader', true])
        AuthTokenRequest.post('/api/anexo/excel', anexo.reportQuery, {
            responseType: 'blob'
        })
            .then(result => {
                dispatch(['openLoader', false])
                FileSaver.saveAs(result.data, 'Lista de Anexos.xlsx');
            })
    }

    const limpiar = () => {
        dispatchAnexo(['limpiar', {}])
    }

    const acciones = () => {
        dispatch(['limpiar', limpiar])


        AuthTokenRequest.get(`/api/general/accesolistar?codigoformulario=mant_anexo_lista`)
            .then(result => {
                setAction(result.data)
            })
    }

    React.useEffect(acciones, [interactions.path])

    React.useEffect(changeFiltro, [filtroTableColumns])

    return (
        <React.Fragment>
            <CssBaseline />
            <Loader />
            <Alert openAlert={openAlert} closeAlert={closeAlert} mensaje={mensajeAlert.mensaje} severity={mensajeAlert.severity} />
            <Grid container spacing={1} className={classes.root}>
                {interactions.path === '/smnuAnexo/form' ?
                    <AnexoForm />
                    :
                    interactions.path === '/smnuAnexo/nuevo' ?
                        <AnexoForm />
                        :
                        <Grid item xs={12}>
                            <Speed action={action} guardarPdf={guardarPdf} guardarExcel={guardarExcel} />
                            <Table data={listarAnexos}
                                title='Lista de Anexos'
                                cabeceras={anexo.cabeceras}
                                filterConfig={{
                                    filters: anexo.filterConfig,
                                    setFilter: setFiltroTableColumns
                                }}
                                editar={editCLick}
                                eliminar={eliminarClick} />
                        </Grid>}

            </Grid>
        </React.Fragment>
    );
}