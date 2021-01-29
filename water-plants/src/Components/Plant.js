import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import nature from '../Assets/nature.jpg';

const useStyles = makeStyles({
    root: {
      maxWidth: 150,
    },
    media: {
      height: 100,
      width: '150%',
    },
  });

const clickFunction = (evt) => {
    console.log(`you clicked ${evt.target}`)
}

const Plant = (props) => {
    const {nickname, species} = props;
    const classes = useStyles();
    return (
        <div className="plantContainer">
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={nature}
                    title="plants"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        Species: {species}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Nickname: {nickname}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button onClick={clickFunction}size="small" color="primary">
                        Update
                    </Button>
                    <Button size="small" color="primary">
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default Plant;