import React, { useEffect, useState, useContext } from "react";
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
// import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems, bottomListItems } from "./listItems";
// import navLogo from "./images/logo_black.png";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {
  Avatar,
  Badge,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import EventGrid from "./EventGrid";
import { useParams, Link as RouterLink } from "react-router-dom";
import EventDetail from "./EventDetail";
import YourEventDetail from "./YourEventDetail";
import Upgrade from "./Upgrade";
import axios from "axios";
import { useAuth } from "../../context/auth.context";
import SponsorsLogoLayout from "../Sponsors/SponsorsLogoLayout";
import Copyright from "../../components/Copyright";
import UserInforDialog from "./UserInforDialog";
import AboutLayout from "../About/AboutLayout";
import CircularProgress from "@material-ui/core/CircularProgress";
import { isMobile } from "react-device-detect";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import img from "../../assets/yong.gif";
import { SmallAvatar, VipBadge } from "../../components/VipBadget";
import DarkModeSwitch from "../../components/DarkModeSwitch";
import { DarkModeContext } from "../../context/darkMode";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeCard from "../../components/SwiperCard";
import Alert from "@material-ui/lab/Alert";
import { isIos, isInStandaloneMode } from "../../utils/pwaUtils";
import SponsorGrid from "./SponsorGrid"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  tab: {
    flexGrow: 1,
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
    background:
      theme.palette.type === "light"
        ? "rgba(255, 255, 255, 0.9)"
        : "rgba(60, 60, 60, 0.9)",
    backdropFilter: "blur(6px)",
  },
  menuButton: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
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
    width: "180px",
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
    backgroundColor:
      theme.palette.type === "light"
        ? fade(theme.palette.grey[800], 0.15)
        : fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor:
        theme.palette.type === "light"
          ? fade(theme.palette.grey[900], 0.25)
          : fade(theme.palette.common.white, 0.15),
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
  about: {
    marginTop: "auto",
  },
  loading: {
    left: "55%",
    position: "absolute",
    top: "44vh",
  },
  badge: {
    // filter: invert(0.5)
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const { darkMode } = useContext(DarkModeContext);
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [upgradeOpen, setUpgradeOpen] = useState(props.checkout ? true : false);
  const [eventData, setEventData] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchInfo, setSearchInfo] = useState("");
  const [searchEventData, setSearchEventData] = useState([]);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showIOSInstall, setShowIOSInstall] = useState(false);

  // const [yourEventsData, setYoursEventData] = useState({});
  const [userInforDialog, seUserInforDialog] = useState(false);
  // const [yourEventsData, setYoursEventData] = useState({});
  const { setCurrentUser } = useAuth();

  const isMenuOpen = Boolean(anchorEl);

  const [value, setValue] = React.useState(1);

  const handleChange = (event, value) => {
    setValue(value);
  };

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    setAnchorEl(null);
    localStorage.removeItem("authToken");
  };

  const handleUpgradeOpen = () => {
    setUpgradeOpen(!upgradeOpen);
  };

  const handleUserInformationDialog = () => {
    seUserInforDialog(!userInforDialog);
    handleMenuClose();
    console.log("hi");
  };

  const handleInstall = async () => {
    deferredPrompt.prompt();
    setDeferredPrompt(null);
  };

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTJiNDQwMzM0MjBjZWExYmQ0ZGRiYyIsImlhdCI6MTYyNTU1MzMyNn0.O7wqQZ2JfGihrqt4QkTW1Kh2ZK-j5FWg1zBewYMasyU'
      },
    };
    //console.log(config)
    const fetchData = async () => {
      axios
        .get(
          "https://nzcsa-backend.herokuapp.com/api/private/get-user-info",
          config
        )
        .then((res) => {
          setUserData(res.data.data);
          setCurrentUser(res.data.data);
          //console.log(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchData();
  }, [setCurrentUser]);

  useEffect(() => {
    if (isMobile) {
      setOpen(!open);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      axios
        .get("https://nzcsa-backend.herokuapp.com/api/private/get-events-info")
        .then((res) => {
          setLoading(false);
          // setEventData(res.data);
          //console.log(res.data)
          const products = [];
          Object.entries(res.data).map(([key, product]) => {
            products.push(product);
            return 0;
          });
          setEventData(products.reverse());
        })
        .catch((e) => {
          setLoading(false);
          //console.log(e)
        });
    };
    fetchData();
  }, []);

  // console.log(userData)
  // console.log(localStorage.getItem("authToken"));
  useEffect(() => {
    if (searchInfo === "") {
      setSearchEventData(eventData);
    }
  }, [searchInfo, eventData]);

  const handleSearch = () => {
    setSearchEventData(
      eventData.filter((element) =>
        element.eventName.toLowerCase().includes(searchInfo)
      )
    );
  };
  const handleOnKeyDown = (event) => {
    if (event.code === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  useEffect(() => {
    if (isIos() && !isInStandaloneMode()) {
      setShowIOSInstall(true);
    }
  }, []);

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
            <Avatar alt="Cindy Baker" />
          </ListItemAvatar>
          <ListItemText
            primary={userData.firstname}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textSecondary"
                >
                  {userData.email}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </MenuItem>
      <Divider variant="middle" />
      <MenuItem onClick={handleUserInformationDialog}>
        <ListItemIcon>
          <AccountBoxIcon fontSize="medium" />
        </ListItemIcon>
        <ListItemText>
          <Typography>Account</Typography>
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <Brightness2Icon fontSize="medium" />
        </ListItemIcon>
        <ListItemText>
          <Typography>Dark Mode</Typography>
        </ListItemText>
        <DarkModeSwitch />
      </MenuItem>
      <MenuItem onClick={handleSignOut} component={RouterLink} to="/login">
        <ListItemIcon>
          <ExitToAppTwoToneIcon fontSize="medium" />
        </ListItemIcon>
        <Typography>Sign out</Typography>
      </MenuItem>
    </Menu>
  );

  let { id } = useParams();
  //console.log(id)

  let pathname = window.location.pathname;
  let index = pathname.lastIndexOf("/");
  let yourEventsId = pathname.slice(index + 1);

  const home = (
    <Grid container spacing={3}>
      {/* Chart */}
      {/* <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h6">Browse Events</Typography>
        </Paper>
      </Grid> */}

      {/* Main Events Section */}

      <Grid item xs={12}>
        <SwipeCard
          img={img}
          title="永劫无间线上友谊赛"
          date="24 August 2021"
          location="ONLINE"
          id={id}
          btn
          darken
        />
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.tab}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab wrapped label="Previous" />
            <Tab wrapped label="Current" />
            <Tab wrapped label="Comming soon" />
          </Tabs>
        </Paper>
      </Grid>
      {/* List of Events */}
      {value === 1 && (
        <EventGrid
          data={searchEventData}
          isMember={userData.isMembership}
          attendedEvents={userData.attendedEvents}
          tab="current"
        />
      )}
      {value === 0 && (
        <EventGrid
          data={searchEventData}
          isMember={userData.isMembership}
          attendedEvents={userData.attendedEvents}
          tab="previous"
        />
      )}
    </Grid>
  );

  //console.log(yourEventsData)
  const yourEvents = (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h6">Browse Your Events</Typography>
        </Paper>
      </Grid>
      <EventGrid data={searchEventData} userData={userData} yourEvents={true} />
    </Grid>
  );

  const Sponsor = (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h6">Sponsors</Typography>
        </Paper>
      </Grid>
      <SponsorsLogoLayout />
    </Grid>
  );

  const Discounts = (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h6">discounts</Typography>
        </Paper>
      </Grid>
      <SponsorGrid data={searchEventData} userData={userData} yourEvents={true} />
    </Grid>
  );

  const About = <AboutLayout />;

  const avatar = userData.isMembership ? (
    <VipBadge
      overlap="circle"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      className={classes.badge}
      badgeContent={<SmallAvatar alt="V">V</SmallAvatar>}
    >
      <Avatar alt="Remy Sharp" className={classes.large} />
    </VipBadge>
  ) : (
    <Avatar alt="Remy Sharp" className={classes.large} />
  );
  // console.log(userData.wechatid);
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
          <img
            src={!darkMode ? "/logo_black.png" : "/logo_white.png"}
            alt="logo"
            className={classes.title}
          />
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
              onChange={(e) => setSearchInfo(e.target.value.toLowerCase())}
              onKeyDown={handleOnKeyDown}
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
            {avatar}
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
        <List>
          {!userData.isMembership && (
            <div>
              {open ? (
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
              ) : null}
              {open ? (
                <ListItem alignItems="flex-start">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleUpgradeOpen}
                  >
                    Upgrade
                  </Button>
                </ListItem>
              ) : (
                <List>
                  <ListItem button onClick={handleUpgradeOpen}>
                    <ListItemIcon>
                      <SupervisedUserCircleIcon color="secondary" />
                    </ListItemIcon>
                  </ListItem>
                </List>
              )}
            </div>
          )}
        </List>
        <Box className={classes.about}>
          <Divider variant="middle" />
          <List disablePadding>{bottomListItems}</List>
        </Box>
      </Drawer>
      <Upgrade
        checkout={props.checkout}
        open={upgradeOpen}
        close={setUpgradeOpen}
      />
      <UserInforDialog
        open={userInforDialog}
        close={seUserInforDialog}
        userInfo={userData}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {deferredPrompt && isMobile && (
          <Alert onClose={() => setDeferredPrompt(null)} severity="info">
            Install our app on your homescreen to have quick access to your
            favorites
            <br></br>
            <Button onClick={handleInstall} color="inherit" size="small" variant="outlined">
              INSTALL
            </Button>
          </Alert>
        )}
        {showIOSInstall && (
          <Alert onClose={() => setShowIOSInstall(false)} severity="info">
            Install the NZCSA webapp! tap{" "}
            <img height="16px" src="/images/icons/share-icon.jpg" /> and then
            select <strong>Add To Home Screen</strong>. (Use the Safari browser)
          </Alert>
        )}
        {loading ? (
          <CircularProgress
            color="inherit"
            size="4rem"
            className={classes.loading}
          />
        ) : (
          <Container maxWidth="lg" className={classes.container}>
            {props.yourEvents ? (
              yourEventsId == "yourEvents" ? (
                yourEvents
              ) : (
                <YourEventDetail id={yourEventsId} data={eventData} />
              )
            ) : props.sponsors ? (
              Sponsor
            ) : props.memberDiscount ? (
              // TODO: Change to memeber discount
              Discounts
            ) : props.about ? (
              About
            ) : !id ? (
              home
            ) : (
              // Event details
              <EventDetail
                id={id}
                isMember={userData.isMembership}
                attendedEvents={userData.attendedEvents}
                data={eventData}
                weChat={userData.wechatid}
              />
            )}
            <Box pt={4}>
              <Copyright />
            </Box>{" "}
          </Container>
        )}
      </main>
    </div>
  );
}
