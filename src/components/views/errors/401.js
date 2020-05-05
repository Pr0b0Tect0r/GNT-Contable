import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import ThemeContext from 'app/context/themeContext';


const style = makeStyles(theme => ({
    root: {
        backgroundImage: 'url(https://i.imgur.com/JeLRBxj.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh'
    },
    submit: {
        marginTop: theme.spacing(30)
    }
}));

const Page401 = () => {
    const history = useHistory()
    const classes = style()
    const { dispatchTheme } = React.useContext(ThemeContext)

    const salir = () => {
        var palette = { temaColorPrimario: 'indigo', temaColorSecundario: 'red', temaTipo: 'light' }
        dispatchTheme(['cambiarTema', palette])
        localStorage.clear()
        history.push('/login')
    }
    return (
        <React.Fragment>
            <CssBaseline />
            <Grid container component="main" className={classes.root} alignItems='center' justify='center'>
                <Button variant="contained" color="secondary" className={classes.submit} onClick={() => salir()}>
                    Entendido
      			</Button>
            </Grid>
        </React.Fragment>
    );
}

export default Page401;