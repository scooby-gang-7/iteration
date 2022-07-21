import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button, Container, Paper, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Signup from './Signup';


const style = {
  position: 'absolute',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  top: '50%',
  left: '50%',
  width: 400,
  transform: 'translate(-50%, -50%)',
  border: '2px solid #000',
  bgcolor: '#E4DCE7',
  borderRadius: 3,
  boxShadow: 24,
  p: 1,
  m: '40'
};

export default function SignUpModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Ready to Travel? Sign Up</Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>

<FormControl
sx={{ m: 1, width: '30ch', bgcolor: '#ffffff' }}
variant='outlined'
>
</FormControl>

            <Signup setUserInfo={props.setUserInfo} userInfo={props.userInfo} />
         
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
