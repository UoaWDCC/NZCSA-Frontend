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
            image= {postImg}
            alt="Post Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {postTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {postPreview}
            </Typography>
          </CardContent>
        <CardActions>
          <IconButton xs="inline-height:15px"><ThumbUpIcon /></IconButton>
          <Typography variant='span'>{postLikes}</Typography>
          <Typography variant='body2' align='right' style={{flex:1}}>
          {postHost}
          <IconButton><AccountBoxIcon /></IconButton>
          </Typography>
        </CardActions>
      </Card>
  );
}
