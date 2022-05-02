import * as React from 'react';
import Card from '@mui/material/Card';
import { makeStyles } from "@material-ui/core/styles";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {IconButton} from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    cursor: 'pointer'

    },
    media: {
      height: 140,
    },
    dialog: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    dialogAction: {
      paddingRight: theme.spacing(2),
    },
  }));
export default function ForumCard({
    postTitle,
    postImg,
    postLikes,
    postPreview,
    postHost,
}) {
  const classes = useStyles({
    root: {
      Width: "100%",
    },
  });
  return (
      <Card  className={classes.root} sx={{
        ':hover': {
          boxShadow: 5, 
        },
      }} >
          <CardMedia
            component="img"
            height="140"
            image="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
            alt="Post Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {postTitle}abcdefG
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {postPreview}abcdefG
            </Typography>
          </CardContent>
        <CardActions>
          <IconButton xs="inline-height:15px"><ThumbUpIcon /></IconButton>
          <Typography variant='span'>{postLikes}11</Typography>
          <Typography variant='body2' align='right' style={{flex:1}}>
          Auckland University of Technology
          <IconButton sx={{
            padding:'0 8px',
          }}><AccountBoxIcon/></IconButton>
          <br/>Read More <IconButton sx={{
            padding:'0 16px 0 0',
          }}><ArrowRightIcon sx={{
            fontSize:'1rem',
          }} /></IconButton>
          </Typography>
        </CardActions>
      </Card>
  );
}
