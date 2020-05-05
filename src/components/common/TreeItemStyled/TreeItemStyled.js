import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles( theme => ({
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: "5px 7px",
        color: theme.palette.primary.contrastText
    },
    labelIcon: {
        marginRight: theme.spacing(1),
        fontSize: "1rem",
    },
    labelText: {
        color: theme.palette.primary.contrastText
    },
    endIcon: {
        fontSize: "1.5em",
    }
}));

const TreeItemStyled = props => {
    const classes = useStyles()

    const { labelText, labelIcon: LabelIcon, endIcon: EndIcon, labelInfo, color, bgColor, ...other } = props

    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    {LabelIcon ? <LabelIcon color="inherit" className={classes.labelIcon} /> : null}
                    <Typography variant='body1'>
                        {labelText}
                    </Typography>
                    <Typography variant='body1'>
                        {labelInfo}
                    </Typography>
                </div>
            }
            endIcon={<EndIcon className={classes.endIcon} />}
            {...other}
        />
    );
}

TreeItemStyled.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    // labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
};


export default TreeItemStyled