import React from 'react'
import {
    Popover,
    FormControl,
    Input,
    InputLabel,
    TextField,
    MenuItem,
    Box,
    Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { DATA_TYPES } from 'constants/app'
import { makeCommonFilterObject } from 'helpers/Utils'
import { FILTERS } from 'constants/app'
import { useFormik } from 'formik'

const useStyles = makeStyles(theme => ({
    form: {
        padding: theme.spacing(2),
    },
    formInput: {
        marginLeft: theme.spacing(1)
    },
    formInputFull: {
        width: "100%"
    }
}))


const MaterialTableCustomPopoverFilter = props => {

    const classes = useStyles()
    const { anchorEl, handleClose, filterConfig, refresh } = props
    const { filters, setFilter } = filterConfig

    const filterOptions = [
        { id: FILTERS.CONTAINS, label: "Contiene" },
        { id: FILTERS.STARTS_WITH, label: "Comienza con" }
    ]

    const onSubmitFiltrar = values => {
        setFilter(values)
        handleClose()
        refresh()
    }

    const onResetFiltrar = values => {
        setFilter(values)
        refresh()
    }

    const formik = useFormik({
        initialValues: makeCommonFilterObject(filters),
        onSubmit: onSubmitFiltrar,
        onReset: onResetFiltrar
    })

    const open = Boolean(anchorEl)

    return (
        <div>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <form
                    noValidate
                    autoComplete="off"
                    className={classes.form}
                    onSubmit={formik.handleSubmit}
                    onReset={formik.handleReset}
                >
                    {filters.map((filter, idx) => (
                        <Box key={idx} mb={4} display="flex" alignItems="flex-end">
                            <FormControl className={classes.formInputFull}>
                                {filter.type === DATA_TYPES.STRING ?
                                    <React.Fragment>
                                        <InputLabel htmlFor={`txtFilt${idx}`}>{filter.label}</InputLabel>
                                        <Input
                                            id={`txtFilt${idx}`}
                                            name={`${filter.field}`}
                                            onChange={formik.handleChange}
                                            value={formik.values[`${filter.field}`]}
                                            startAdornment={
                                                <TextField
                                                    select
                                                    style={{ width: 200 }}
                                                    name={`${filter.tbfield}`}
                                                    onChange={formik.handleChange}
                                                    value={formik.values[`${filter.tbfield}`]}
                                                >
                                                    {filterOptions.map(option => (
                                                        <MenuItem key={option.id} value={option.id}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            }
                                        />
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <InputLabel htmlFor={`txtFilt${idx}`}>{filter.label}</InputLabel>
                                        <Input
                                            id={`txtFilt${idx}`}
                                            name={`${filter.field}`}
                                            onChange={formik.handleChange}
                                            value={formik.values[`${filter.field}`]}
                                        />
                                    </React.Fragment>
                                }
                            </FormControl>
                        </Box>
                    ))}
                    <Box display="flex" justifyContent="flex-end">
                        <Button type="reset" color="secondary" style={{ marginRight: 15 }}>Limpiar filtro</Button>
                        <Button type="submit" color="primary" variant="contained">Filtrar</Button>
                    </Box>
                </form>
            </Popover>
        </div>
    )
}

export default MaterialTableCustomPopoverFilter