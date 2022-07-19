import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ChatRoom from './ChatRoom.jsx';
import ChatIcon from '@mui/icons-material/Chat';
import { IconButton } from '@mui/material';

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light'
      ? grey[100]
      : theme.palette.background.default,
}));

// const StyledBox = styled(Box)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
// }));

// const Puller = styled(Box)(({ theme }) => ({
//   width: 30,
//   height: 6,
//   backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
//   borderRadius: 3,
//   position: 'absolute',
//   top: 8,
//   left: 'calc(50% - 15px)',
// }));

function ChatroomContainer(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  // console.log(props);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root
      className='root'
      style={{
        backgroundColor: 'rgb(200,200,200,0)',
        // borderRadius: '10px',
        // border: '1px solid gray',
      }}
    >
      <CssBaseline />
      <Global
        className='messagesContainer-global'
        id='messagesContainer'
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <Box className='boxWButton' sx={{ textAlign: 'center', pt: 1 }}>
        <IconButton aria-label='Chat' onClick={toggleDrawer(true)}>
          <ChatIcon sx={{ fontSize: 30, color: 'orangered' }} /> Trip Chat
        </IconButton>
        {/* <Button onClick={toggleDrawer(true)}>Chat Room</Button> */}
      </Box>
      <SwipeableDrawer
        className='SwipeDrawer'
        container={container}
        anchor='bottom'
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={true}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          className='swipeBox'
          sx={{
            px: 3,
            pb: 2,
            height: '100%',
            overflow: 'auto',
            // width: '400px',
          }}
        >
          <ChatRoom
            tripId={props.tripId}
            firstName={`${props.userInfo.name_first} ${props.userInfo.name_last}`}
          />
        </Box>
      </SwipeableDrawer>
    </Root>
  );
}

// ChatroomContainer.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

export default ChatroomContainer;
