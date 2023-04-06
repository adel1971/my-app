import {ImageList} from '@mui/material';
/* import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/variables'; */
import MediaRow from './MediaRow';
import {useMedia} from '../hooks/ApiHooks';
import {useWindowSize} from '../hooks/WindowHooks';

const MediaTable = () => {
  const {mediaArray} = useMedia();
  const windowSize = useWindowSize();

  return (
    <ImageList cols={windowSize.width > 768 ? 3 : 2} gap={8}>
      {mediaArray.map((item, index) => {
        return <MediaRow key={index} file={item} />;
      })}
    </ImageList>
  );
};

MediaTable.propTypes = {};

export default MediaTable;
