import React from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import AddIcon from '@material-ui/icons/Add';
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import AppInteractionContext from 'app/context/appInteraction';
import HistoryIcon from '@material-ui/icons/History';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';

const useStyles = makeStyles(theme => ({
    speedDial: {
        position: 'fixed',
        bottom: theme.spacing(7),
        right: theme.spacing(2),
    }
}));

export default function Speed(props) {
    const action = props.action;
    const guardar = props.guardar;
    const guardarPdf = props.guardarPdf;
    const guardarExcel = props.guardarExcel;
    const { interactions, dispatch } = React.useContext(AppInteractionContext)
    const [open, setOpen] = React.useState(window.screen.width < 769 ? false : true)
    const classes = useStyles()


    const preventActionClickClose = (evt, action) => {
        evt.preventDefault()
        evt.stopPropagation()

        if (action.nombre === 'Nuevo') {
            dispatch(['anexoFormNuevo', `${window.location.pathname}/nuevo`])
        }

        if (action.nombre === 'Volver') {
            dispatch(['volver', `/${window.location.pathname.split('/')[1]}`])
            interactions.limpiar()
        }

        if (action.nombre === 'Imprimir') {
            guardarPdf()
        }

        if (action.nombre === 'Excel') {
            guardarExcel()
        }

        if (action.nombre === 'Historial') {
            dispatch(['openDialog', true])
        }

        if (action.nombre === 'Guardar') {
            guardar()
        }
    }


    return (
        <SpeedDial
            ariaLabel="Speedial"
            className={classes.speedDial}
            icon={<SpeedDialIcon />}
            onClick={() => setOpen(!open)}
            open={open}>
            {action.map((action, index) => (
                action.nombre === 'Editar' || action.nombre === 'Eliminar' ? null :
                    action.nombre === 'Buscar' ? null :
                        <SpeedDialAction
                            key={index}
                            icon={action.nombre === 'Volver' ? <ArrowBackOutlinedIcon color='secondary' /> : action.nombre === 'Nuevo' ? <AddIcon color='secondary' /> : action.nombre === 'Imprimir' ? <PictureAsPdfOutlinedIcon color='secondary' /> : action.nombre === 'Excel' ? <ReceiptOutlinedIcon color='secondary' /> : action.nombre === 'Guardar' ? <SaveOutlinedIcon color='secondary' /> : action.nombre === 'Historial' ? <HistoryIcon color='secondary' /> : ''}
                            tooltipTitle={action.nombre}
                            onClick={evt => preventActionClickClose(evt, action)}
                        />
            ))}
        </SpeedDial>
    )
}
