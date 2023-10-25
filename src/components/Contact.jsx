import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { useState } from 'react';
import { ContactModal } from 'components/ContactModal';
import { ListItem, ListItemAvatar, Avatar, Fab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

export const Contact = ({ contact: { id, name, number } }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = id => dispatch(deleteContact(id));

  return (
    <ListItem
      key={id}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: 'solid 1px #38B3A5',
        borderRadius: '7px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ListItemAvatar>
          <Avatar
            sx={{ bgcolor: '#38B3A5' }}
            alt={name}
            src="/static/images/avatar/1.jpg"
          />
        </ListItemAvatar>
        <Typography
          component="p"
          variant="h5"
          sx={{ display: 'inline', fontSize: { xs: '14px', sm: '23px' } }}
          color="text.primary"
        >
          {name}: {number}
        </Typography>
      </Box>

      <Box>
        <Fab
          onClick={() => handleDelete(id)}
          sx={{
            width: '46px',
            height: '46px',
            bgcolor: '#ff1d1d',
            mr: 1,
            ml: 1,
            '&:hover': {
              bgcolor: '#e00404',
            },
          }}
          aria-label="delete"
        >
          <DeleteIcon sx={{ fill: '#FFF' }} />
        </Fab>
        <Fab
          onClick={handleOpen}
          sx={{
            width: '46px',
            height: '46px',
            bgcolor: '#38B3A5',
            '&:hover': {
              bgcolor: '#46957A',
            },
          }}
          aria-label="edit"
        >
          <EditIcon sx={{ fill: '#FFF' }} />
        </Fab>
      </Box>

      <ContactModal
        id={id}
        name={name}
        number={number}
        open={open}
        onClose={handleClose}
      ></ContactModal>
    </ListItem>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
};
