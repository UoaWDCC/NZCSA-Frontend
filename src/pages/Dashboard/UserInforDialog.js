import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import membershipCard from "../../assets/membership_card.jpg";
import Image from "material-ui-image";
import {
  Avatar,
  Grid,
  Typography,
  Chip,
  TextField,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { styled } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";
import DoneIcon from "@material-ui/icons/Done";
import { SmallAvatar, VipBadge } from "../../components/VipBadget";

const CardImage = styled(Image)({
  borderRadius: 12,
  filter: "brightness(90%)",
});

const ProfileBadge = styled(Avatar)(({ theme }) => ({
  color: theme.palette.getContrastText(deepPurple[500]),
  backgroundColor: theme.palette.secondary.main,
  fontSize: 48,
  width: 72,
  height: 72,
}));

const ProfileHeader = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "column wrap",
  alignItems: "center",
  margin: theme.spacing(2),
}));

const ProfileContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "column wrap",
  alignItems: "center",
}));

const DetailField = styled(TextField)({
  margin: "12px 0px 12px 0px",
});

const styles = (theme) => ({
  root: {
    margin: 0,
  },
  closeButton: {
    position: "absolute",
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
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
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
    props.close(false);
  };

  console.log(props.userInfo);

  const content = props.userInfo.isMembership ? (
    <DialogContent id="alert-dialog-description" dividers>
      <Grid container xs={12} spacing={2}>
        <Grid item sm={12} md={12} xs={12}>
          <CardImage aspectRatio={1.7} src={membershipCard} />
          <ProfileHeader>
            <VipBadge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={<SmallAvatar alt="V">V</SmallAvatar>}
            >
              <ProfileBadge>{props.userInfo.firstname.charAt(0)}</ProfileBadge>
            </VipBadge>
            <Typography
              gutterBottom
              variant="h3"
              style={{ fontWeight: "bold", paddingTop: 14 }}
            >
              {props.userInfo.firstname} {props.userInfo.lastname}
            </Typography>
            <Chip
              icon={<DoneIcon />}
              label="Member"
              color="secondary"
              size="small"
            />
          </ProfileHeader>
        </Grid>
        <Grid item xs={12}>
          <ProfileContent>
            <DetailField
              id="filled-read-only-input"
              label="Email"
              defaultValue={props.userInfo.email}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
            />
            <DetailField
              id="filled-read-only-input"
              label="Gender"
              defaultValue={props.userInfo.gender || "Not specified"}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
            />
            <DetailField
              id="filled-read-only-input"
              label="University"
              defaultValue={props.userInfo.university}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
            />
            <DetailField
              id="filled-read-only-input"
              label="Faculty/Major"
              defaultValue={props.userInfo.faculty}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
            />
            <DetailField
              id="filled-read-only-input"
              label="Phone"
              defaultValue={props.userInfo.phone || "Not specified"}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
            />
          </ProfileContent>
        </Grid>
      </Grid>
    </DialogContent>
  ) : (
    <DialogContentText id="alert-dialog-description">
      You are not a member yet. Please upgrade.
    </DialogContentText>
  );

  return (
    <Dialog
      open={props.open}
      onClose={handleDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
      // className={classes.root}
    >
      <DialogTitle id="alert-dialog-title" onClose={handleDialogClose}>
        {"User Information"}
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
