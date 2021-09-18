import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core/";
import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

export default function AltCard(props) {
  const classes = useStyles();
  //console.log(props.data);
  const [userEventsDetail, setUserEventsDetail] = useState({});
  const [activeEventsDetail, setActiveEventsDetail] = useState({});

  useEffect(() => {
    if (props.userData == undefined) {
      let eventBufferList = {};
      if (props.tab == "current") {
        Object.keys(props.data).forEach((key) => {
          if (props.data[key].isActive) {
            eventBufferList[key] = props.data[key];
          }
        });
      } else {
        Object.keys(props.data).forEach((key) => {
          if (!props.data[key].isActive) {
            eventBufferList[key] = props.data[key];
          }
        });
      }
      setActiveEventsDetail(eventBufferList);
      setUserEventsDetail(props.data);
    } else {
      if (
        !!props.data &&
        Object.keys(props.data).length != 0 &&
        !!props.userData &&
        Object.keys(props.userData).length != 0
      ) {
        let userEvents = [];
        if (Object.keys(props.userData).length !== 0) {
          for (let i = 0; i < props.userData.attendedEvents.length; i++) {
            const eventId = props.userData.attendedEvents[i];
            const data = props.data.filter((event) => event._id == eventId)[0];
            if (!!data) {
              userEvents.push(data);
            }
            // console.log(props.userData.attendedEvents[i])
          }
        }
        // console.log(userEvents);
        setUserEventsDetail(userEvents);
      } else {
        setUserEventsDetail([]);
      }
    }
  }, [props.data, props.userData]);

  //console.log(userEventsDetail)

  return props.userData == undefined ? (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {Object.keys(activeEventsDetail).map((elem, i) => (
          <Grid item xs={12} sm={6} md={4} key={activeEventsDetail[elem].id}>
            <EventCard
              id={activeEventsDetail[elem]._id}
              title={activeEventsDetail[elem].eventName}
              date={activeEventsDetail[elem].eventTime}
              location={activeEventsDetail[elem].eventLocation}
              image={activeEventsDetail[elem].eventImgUrl}
              isMember={props.isMember}
              price={activeEventsDetail[elem].eventPrice}
              attendedEvents={props.attendedEvents}
              tab={props.tab}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  ) : (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {Object.keys(userEventsDetail).map((elem, i) => (
          <Grid item xs={12} sm={6} md={3} key={userEventsDetail[elem].id}>
            <EventCard
              id={userEventsDetail[elem]._id}
              title={userEventsDetail[elem].eventName}
              date={userEventsDetail[elem].eventTime}
              location={userEventsDetail[elem].eventLocation}
              image={userEventsDetail[elem].eventImgUrl}
              isMember={props.isMember}
              price={userEventsDetail[elem].eventPrice}
              attendedEvents={props.attendedEvents}
              isYourPage={props.userData}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
