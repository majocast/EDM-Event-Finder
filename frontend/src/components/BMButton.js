import React, {useState} from 'react';
import { IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const BMButton = () => {
  const [saved, setSaved] = useState(false);
  <IconButton onClick={setSaved(!saved)} style={{ position: 'absolute', bottom: '1rem', right: '1rem' }} >
    {saved ? <BookmarkIcon variant='primary'/> : <BookmarkBorderIcon variant='primary'/>}
  </IconButton>
}

export default BMButton;