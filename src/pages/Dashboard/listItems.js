import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import ForumIcon from '@mui/icons-material/Forum';
import Button from "@material-ui/core/Button";
import { EventNote } from "@material-ui/icons";
import { BrowserRouter as Router, Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import InfoIcon from "@material-ui/icons/Info";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from "axios";

const StyledListItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(ListItem);

const fetchData = async () => {
  axios
    .get("https://nzcsa-backend.herokuapp.com/api/private/get-events-info")
    .then((res) => {})
    .catch((e) => {});
};

export const mainListItems = (
  <div>
    <StyledListItem button to="/" component={Link} onClick={fetchData}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </StyledListItem>
    <StyledListItem
      button
      to="/yourEvents"
      component={Link}
      onClick={fetchData}
    >
      <ListItemIcon>
        <EventNote />
      </ListItemIcon>
      <ListItemText primary="Your Events" />
    </StyledListItem>
    <StyledListItem button to="/sponsors" component={Link} onClick={fetchData}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Sponsors" />
    </StyledListItem>
    <StyledListItem
      button
      to="/member_discount"
      component={Link}
      onClick={fetchData}
    >
      <ListItemIcon>
        <LocalActivityIcon />
      </ListItemIcon>
      <ListItemText primary="Member Discount" />
    </StyledListItem>
    <StyledListItem button to="/forum" component={Link}>
      <ListItemIcon>
        <ForumIcon />
      </ListItemIcon>
      <ListItemText primary="Calendar Forum" />
    </StyledListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem alignItems="flex-start">
      <ListItemText
        secondary={
          <div>
            <div>Become a member to join events</div>
            <div>and enjoy discounts</div>
          </div>
        }
      />
    </ListItem>
    <ListItem>
      <Button variant="outlined" color="secondary">
        Upgrade
      </Button>
    </ListItem>
  </div>
);

export const bottomListItems = (
  <div>
    <StyledListItem button to="/about" component={Link} onClick={fetchData}>
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="About" />
    </StyledListItem>
  </div>
);
