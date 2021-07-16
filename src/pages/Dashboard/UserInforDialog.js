import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardMedia from '@material-ui/core/CardMedia';
import membershipCard from '../../assets/membership_card.jpg'
import Image from 'material-ui-image'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    root: {
        // maxWidth: '40vw'
    }
}))

export default function UserInforDialog(props) {
    const classes = useStyles();
    const handleDialogClose = () => {
        props.close(false)
    }
    // console.log(props.userInfo.isMembership)
    const content = props.userInfo.isMembership ? (<DialogContent id="alert-dialog-description">
        <Image
            aspectRatio={1.7}
            src={membershipCard}
        />
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
            maxWidth='xs'
        // className={classes.root}
        >
            <DialogTitle id="alert-dialog-title">{"User Information   -  "}{props.userInfo.firstname + props.userInfo.lastname} </DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    )
}