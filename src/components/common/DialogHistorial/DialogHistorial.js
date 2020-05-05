import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, Slide, DialogContentText, Grid } from '@material-ui/core';
import MaterialTable from 'material-table';
import AppInteractionContext from 'app/context/appInteraction';
import formatDate from 'helpers/formatDate'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} timeout={500} />;
});

export default function DialogHistorial() {
    const { interactions, dispatch } = React.useContext(AppInteractionContext)
    const defaultOptions = {
        draggable: false,
        search: false,
        pageSize: 5,
        paging: false,
        pageSizeOptions: []
    }


    return (
        <Dialog
            open={interactions.openDialog} TransitionComponent={Transition} keepMounted onClose={() => dispatch(['openDialog', false])} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                </DialogContentText>
                <Grid container spacing={2} style={{ width: 550, height: 550 }}>
                    <Grid item xs={12}>
                        <MaterialTable
                            title='Historial'
                            columns={[
                                { title: 'Fecha', field: 'fecha' },
                                { title: 'Nombre', field: 'nickname', width: 10 },
                                { title: 'Descripción', field: 'notas' }
                            ]}
                            options={defaultOptions}
                            data={interactions.historial.map((data) => (
                                { fecha: formatDate(data.fecha), nickname: data.nickname, notas: data.notas }
                            ))}
                            localization={{ body: { emptyDataSourceMessage: 'No hay nada para mostrar' } }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => dispatch(['openDialog', false])} color="secondary">
                    Listo
          			</Button>
            </DialogActions>
        </Dialog>
    );
}