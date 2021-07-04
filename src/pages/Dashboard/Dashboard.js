import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, fade } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems, secondaryListItems } from "./listItems";
import navLogo from "../../assets/NavLogo.png";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import MainCard from "../../components/MainCard";
import EventGrid from "./EventGrid";
import {
  BrowserRouter as Router,
  useParams,
  Link as RouterLink
} from "react-router-dom";
import EventDetail from "./EventDetail"
import UpgradeForm from "./UpgradeForm"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    color: theme.palette.text.primary,
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(6px)",
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.grey[800], 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.grey[900], 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  grow: {
    flexGrow: 1,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [upgradeFormOpen, setUpgradeFormOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleDrawerOpen = () => {
    setOpen(!open);
    console.log(open)
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpgradeFormOpen = () => {
      setUpgradeFormOpen(!upgradeFormOpen);
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Name"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textSecondary"
                >
                  YourEmail@gmail.com
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </MenuItem>
      <Divider variant="middle" />
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <AccountBoxIcon fontSize="medium" />
        </ListItemIcon>
        <Typography>Account</Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <Brightness2Icon fontSize="medium" />
        </ListItemIcon>
        <Typography>Dark Mode</Typography>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={RouterLink} to="/login">
        <ListItemIcon>
          <ExitToAppTwoToneIcon fontSize="medium" />
        </ListItemIcon>
        <Typography>Sign out</Typography>
      </MenuItem>
    </Menu>
  );

  let { id } = useParams();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <img src={navLogo} alt="logo" className={classes.title} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              className={classes.large}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider variant="middle" />
        {/* <List>{open && secondaryListItems}</List> */}
        <List>{open && <div>
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
            <Button variant="outlined" color="secondary" onClick={handleUpgradeFormOpen}>
              Upgrade
            </Button>
          </ListItem>
        </div>}</List>

      </Drawer>
      <UpgradeForm open={upgradeFormOpen} close={setUpgradeFormOpen} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {!id ? (
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography variant="h6">Browse Events</Typography>
                </Paper>
              </Grid>
              {/* Main Events Section */}
              <Grid item xs={12}>
                <MainCard
                  img="/bg.png"
                  title="Professional Networking"
                  date="Thursday, 5 August 2021"
                  location="303-G20, City Campus, University of Auckland"
                  id="0"
                  btn
                  darken
                />
              </Grid>
              {/* List of Events */}
              <EventGrid />
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>{id}</Paper>
              </Grid>
              {/* Recent Orders */}
            </Grid>
          ) : (
            // Event details
            <EventDetail />
          )}
          <Box pt={4}>
            <Copyright />
          </Box>{" "}
        </Container>
      </main>
    </div>
  );
}
