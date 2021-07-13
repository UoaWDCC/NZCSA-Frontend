import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
    Grid,
    Paper,
    Box
} from '@material-ui/core/';
import images from './SponsorsLogoList';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    images: {
        width: '60%',
    }
}));

export default function SponsorsLogoLayout() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container
                spacing={2}
                direction="row"
                alignItems="center"
                style={{ minHeight: '100vh' }}>
                {images.map(({ id, src, title, description }) => (
                    <Grid item xs={12} sm={6}>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            minHeight="30vh"
                        >
                            <img key={id} src={src} alt="Logo" className={classes.images} />
                        </Box>
                    </Grid>


                ))}


            </Grid>

        </div >
    )
}
