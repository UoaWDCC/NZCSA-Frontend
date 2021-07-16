import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import CardMedia from '@material-ui/core/CardMedia';
import membershipCard from '../../assets/membership_card.jpg'
import Image from 'material-ui-image'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';



const useStyles = makeStyles((theme) => ({
    welcome_mesge: {
        // color: theme.palette.primary.main
    }
}))

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

export default function UserInforDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleDialogClose = () => {
        props.close(false)
    }
    // console.log(props.userInfo.isMembership)
    const content = props.userInfo.isMembership ? (<DialogContent id="alert-dialog-description" dividers>
        <Grid container direction={'row'} spacing={2}>
            <Grid item sm={12} md={12} xs={12}>
                <Image
                    aspectRatio={1.7}
                    src={membershipCard}
                />
            </Grid>

            <Grid container direction={'row'} alignContent={'space-between'}>
                <Grid item sm={6} md={6} xs={6}>
                    <Typography variant={"h6"} >Name:</Typography>
                    <Typography>{props.userInfo.firstname + props.userInfo.lastname}</Typography>
                </Grid>
                <Grid item sm={6} md={6} xs={6}>
                    <Typography variant={"h6"}>Email:</Typography>
                    <Typography>{props.userInfo.email}</Typography>
                </Grid>


            </Grid>
        </Grid>

    </DialogContent>) : (<DialogContentText id="alert-dialog-description">
        You are not a member yet. Please upgrade.
    </DialogContentText>)

    return (
        <Dialog
            open={props.open}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth='sm'
        // className={classes.root}
        >
            <DialogTitle id="alert-dialog-title" onClose={handleDialogClose}>{"User Information"}</DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    )
}