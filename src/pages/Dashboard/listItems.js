import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import Button from "@material-ui/core/Button";
import { EventNote } from "@material-ui/icons";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <EventNote />
      </ListItemIcon>
      <ListItemText primary="Your Events" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Sponsors" />
    </ListItem>
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
