import * as React from 'react';
import { Global } from '@emotion/react';
import { grey } from '@mui/material/colors';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ChatIcon from '@mui/icons-material/Chat';
import CssBaseline from '@mui/material/CssBaseline';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ChatRoom from './ChatRoom.jsx';

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light'
      ? grey[100]
      : theme.palette.background.default,
}));

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
            height: `calc(75% - ${drawerBleeding}px)`,
            width: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
            borderRadius: '8px',
            // display: 'inline-block',
            // verticalAlign:'center',
          },
        }}
      />
      <Box className='boxWButton' sx={{ textAlign: 'center', pt: 1 }}>
        <IconButton aria-label='Chat' onClick={toggleDrawer(true)}>
          <ChatIcon sx={{ fontSize: 30, color: 'orange' }} /> Trip Chat
        </IconButton>
        {/* <Button onClick={toggleDrawer(true)}>Chat Room</Button> */}
      </Box>
      <SwipeableDrawer
        className='SwipeDrawer'
        container={container}
        anchor='right'
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
