import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { ArrowDownward, ArrowUpward, Functions, SignalCellular0Bar } from '@mui/icons-material';

export default function FolderList({min, max, mean, mode, median, variance, standardDeviation}) {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Functions />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`Min : ${min}`}/>  
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <Functions />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`Max : ${max}`}/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <Functions />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`Mean : ${mean}`}/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <Functions />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`Mode : ${mode instanceof Set ? [...mode].join(', ') : mode}`}/>

      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <Functions />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`Median : ${median}`}/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <Functions />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`Variance : ${variance}`}/>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
          <Functions />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`Standard Deviation : ${standardDeviation}`}/>
      </ListItem>
    </List>
  );
}
