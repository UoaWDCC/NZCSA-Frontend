import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogTitle, Typography, List, ListItem, Radio, Grid, Button, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { DialogContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    consent: {
        backgroundColor: "#D8D8D8"
    },
    payBtn: {
        minWidth: "120px",
    },
    listWrapper: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        // border: "1px solid grey"
    },

}));



export default function UpgradeForm(props) {
    const classes = useStyles();
    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <Dialog open={props.open} fullWidth={true}>
            <DialogTitle>Pay By Card</DialogTitle>
            <Divider />
            <DialogContent>
                <form >
                    <Grid container spacing={4} justify={"center"}>
                        <Grid item md={12}>
                            <Typography>Amount</Typography>
                            <List className={classes.listWrapper}>
                                <ListItem className={classes.listItem} button>
                                    <ListItemIcon>
                                        <Radio
                                            checked={true}
                                            value="a"
                                            name="radio-button-demo"
                                            inputProps={{ 'aria-label': 'A' }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText>$5.00</ListItemText>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item md={12}>
                            <Typography>Payment Method</Typography>
                            <List className={classes.listWrapper}>
                                <ListItem className={classes.listItem} button>
                                    <ListItemIcon>
                                        <Radio
                                            checked={selectedValue === 'a'}
                                            onChange={handleChange}
                                            value="a"
                                            name="radio-button-demo"
                                            inputProps={{ 'aria-label': 'A' }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText>Wechat</ListItemText>
                                    <ListItemIcon>
                                        <img width="64px" height="auto" src="./wechat-pay.svg" alt="wechat" />
                                    </ListItemIcon>
                                </ListItem>
                                <ListItem className={classes.listItem} button>
                                    <ListItemIcon>
                                        <Radio
                                            checked={selectedValue === 'b'}
                                            onChange={handleChange}
                                            value="b"
                                            name="radio-button-demo"
                                            inputProps={{ 'aria-label': 'B' }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText>Alipay</ListItemText>
                                    <ListItemIcon>
                                        <img width="64px" height="auto" src="./alipay-logo.svg" alt="alipay" />
                                    </ListItemIcon>
                                </ListItem>
                                <ListItem className={classes.listItem} button>
                                    <ListItemIcon>
                                        <Radio
                                            checked={selectedValue === 'd'}
                                            onChange={handleChange}
                                            value="d"
                                            name="radio-button-demo"
                                            inputProps={{ 'aria-label': 'D' }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText>Bank Account</ListItemText>
                                    <ListItemIcon>
                                        {/* <img width="64px" height="auto" src="./wechat_pay.png" alt="wechat" /> */}
                                    </ListItemIcon>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify="flex-end" direction="row" spacing={2}>
                            <Grid item><Button className={classes.payBtn} size="large" variant="outlined">Cancel</Button></Grid>
                            <Grid item><Button className={classes.payBtn} size="large" color="secondary" variant="contained">Pay</Button></Grid>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>

    );
}