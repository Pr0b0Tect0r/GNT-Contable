import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Slide,
    Backdrop,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@material-ui/core';
import MaterialTable from 'material-table';
import MaterialTableCustomPopoverFilter from './MaterialTableCustomPopoverFilter'

const useStyles = makeStyles((theme) => ({
    back: {
        transform: 'translateZ(0px)',
        position: 'fixed',
        zIndex: 100
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        width: 130,
        height: 130,
        margin: 'auto'
    },
    texto: {
        textAlign: 'center',
        marginTop: theme.spacing(1)
    },
    card: {
        width: '95%',
        transition: 'all .2s ease-in-out',
        '&:hover': {
            transform: 'scale(1.02)'
        }
    },
    typography: {
        padding: theme.spacing(2),
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} timeout={500} />;
});

export default function Table(props) {
    const classes = useStyles();
    const tableRef = React.useRef()
    const { data, title, cabeceras, filterConfig, editar, eliminar } = props
    const [openDialog, setOpenDialog] = React.useState(false)
    const [infoEliminar, setInfoEliminar] = React.useState({})
    const [anchorEl, setAnchorEl] = React.useState(null);
    const defaultOptions = {
        draggable: false,
        search: false,
        pageSize: 20,
        pageSizeOptions: []
    }

    const onRefreshData = () => {
        tableRef.current && tableRef.current.onQueryChange()
    }

    const eliminarAnexo = () => {
        setOpenDialog(false)
        eliminar(infoEliminar.id, onRefreshData)
    }

    return (
        <>
            <Backdrop open={openDialog} className={classes.back} />
            <Dialog
                open={openDialog} TransitionComponent={Transition} keepMounted onClose={() => setOpenDialog(false)} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
                <DialogTitle id="alert-dialog-slide-title">{`¿Seguro que deseas eliminar a ${infoEliminar.nombre}?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Una vez eliminado se perderá toda la información de esta anexo.
          			</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="secondary">
                        Cancelar
          			</Button>
                    <Button variant='contained' onClick={() => eliminarAnexo(infoEliminar.id)} color="primary">
                        Confirmar
          			</Button>
                </DialogActions>
            </Dialog>
            <MaterialTable
                title={title}
                columns={cabeceras}
                data={data}
                options={defaultOptions}
                tableRef={tableRef}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Editar',
                        onClick: (event, rowData) => editar(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar',
                        onClick: (event, rowData) => {
                            setOpenDialog(true)
                            setInfoEliminar({
                                id: rowData.id_anexo,
                                nombre: rowData.nm_anexo
                            })
                        }
                    },
                    {
                        icon: 'refresh',
                        tooltip: 'Actualizar',
                        isFreeAction: true,
                        onClick: () => onRefreshData()
                    },
                    {
                        icon: 'filter_list',
                        tooltip: 'Filtrar',
                        isFreeAction: true,
                        onClick: (event) => {
                            setAnchorEl(event.currentTarget);
                        }
                    }
                ]}
                localization={{
                    header: {
                        actions: 'Acciones'
                    },
                    body: { emptyDataSourceMessage: 'No hay nada para mostrar' }
                }}
            />
            <MaterialTableCustomPopoverFilter
                anchorEl={anchorEl}
                handleClose={() => setAnchorEl(null)}
                filterConfig={filterConfig}
                refresh={onRefreshData}
            />
        </>
    );
}