import React from 'react'
import { Box, CircularProgress, Fade, Dialog, DialogContent, Grid } from '@material-ui/core';
import AppInteractionContext from 'app/context/appInteraction';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} timeout={500} />;
});


export default function Loader() {
    const { interactions, dispatch } = React.useContext(AppInteractionContext)

    return (
        <>
            <Dialog PaperProps={{ style: { backgroundColor: 'transparent', boxShadow: 'none' } }}
                open={interactions.openLoader} TransitionComponent={Transition} keepMounted onClose={() => dispatch(['openLoader', false])}>
                <DialogContent>
                    <Grid container spacing={2} style={{ width: 550, height: 550 }}>
                        <Grid item xs={12}>
                            <Box position="absolute" top="50%" left="50%">
                                <CircularProgress color='primary' />
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}