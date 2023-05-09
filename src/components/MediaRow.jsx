import {
  Button,
  ButtonGroup,
  Collapse,
  ImageListItem,
  Typography,
  Avatar,
} from '@mui/material';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import * as React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import MoreVertIcon from '@mui/icons-material/MoreVert';

const MediaRow = ({file, deleteMedia}) => {
  const {user, update, setUpdate} = useContext(MediaContext);

  const doDelete = async () => {
    const sure = confirm('Are you sure?');
    if (sure) {
      const token = localStorage.getItem('userToken');
      const deleteResult = await deleteMedia(file.file_id, token);
      console.log(deleteResult);
      setUpdate(!update);
    }
  };

  return (
    <ImageListItem sm={{border: '10px', solid: 'black'}}>
      <Card sx={{maxWidth: 450}} sm={{solid: 'black'}}>
        <CardHeader
          avatar={
            <Avatar
              sx={{bgcolor: red[300]}}
              aria-label="recipe"
              variant="cycle"
              src={avatar.filename}
              imgProps={{
                alt: `${user.username}'s profile image`,
              }}
            >
              <Avatar
                variant="cycle"
                src={avatar.filename}
                imgProps={{
                  alt: `${user.username}'s profile image`,
                }}
              />
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={user.username}
          subheader={file.time_added}
        />
        <img
          src={
            file.media_type !== 'audio'
              ? mediaUrl + file.thumbnails.w640
              : './vite.svg'
          }
          alt={file.title}
        />{' '}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <h2>{file.title}</h2>
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          sm={{
            left: '50px',
          }}
        >
          <ButtonGroup sm={{display: 'flax', left: '40px'}}>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <Button
              component={Link}
              variant="contained"
              to="/single"
              state={{file}}
              sm={{megrin: '20px'}}
            >
              View
            </Button>
            {file.user_id === user.user_id && (
              <>
                <Button
                  component={Link}
                  variant="contained"
                  to="/update"
                  state={{file}}
                >
                  Update
                </Button>
              </>
            )}
            <Button component={Link} variant="contained" onClick={doDelete}>
              Delete
            </Button>
          </ButtonGroup>
        </CardActions>
        <Collapse timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </ImageListItem>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object.isRequired,
  deleteMedia: PropTypes.func.isRequired,
};

export default MediaRow;
