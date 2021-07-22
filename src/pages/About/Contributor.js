import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import { Typography, Grid } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { isMobile } from 'react-device-detect';


export default function Contributor() {


    const infoList = [
        {
            Name: "Melo Guan", Position: "Project Manager"
        },
        {
            Name: "Tony Cui", Position: "Developer"
        },
        {
            Name: "Kirsty Gong", Position: "Developer"
        },
        {
            Name: "ZhiQing Guo", Position: "Developer"
        },
        {
            Name: "Linkun Gao", Position: "Developer"
        },
        {
            Name: "Garfield Wang", Position: "Developer"
        },
        {
            Name: "Lucas Gao", Position: "Developer"
        },
        {
            Name: "Yameizhen Li", Position: "Designer"
        },
    ]

    return (
        <div>
            <CardContent>

                <Typography gutterBottom variant="h2" component="h2" align='center'>
                    Contributor
          </Typography>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >

                    <Grid item xs={3}>
                        {!isMobile ? (<List>
                            {infoList.map((key) => (
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AccountCircleIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={key.Name} secondary={key.Position} />
                                </ListItem>
                            ))}
                        </List>) : (
                                <List>
                                    {infoList.map((key) => (
                                        <ListItem>
                                            {/* <ListItemAvatar>
                                                <Avatar>
                                                    <AccountCircleIcon />
                                                </Avatar>
                                            </ListItemAvatar> */}
                                            <ListItemText primary={key.Name} secondary={key.Position} />
                                        </ListItem>
                                    ))}
                                </List>
                            )}

                    </Grid>

                </Grid>


            </CardContent>
        </div>
    )
}
