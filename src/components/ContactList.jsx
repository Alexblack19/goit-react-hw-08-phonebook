import { Contact } from './Contact';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import {
  selectError,
  selectFilter,
  selectIsLoading,
  selectVisibleContacts,
} from 'redux/selectors';
import { fetchContacts } from 'redux/operations';
import { Box, List } from '@mui/material';
import Typography from '@mui/material/Typography';

export function ContactList() {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(selectVisibleContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      {isLoading && (
        <Circles
          height="80"
          width="80"
          color="#38B3A5"
          ariaLabel="circles-loading"
          wrapperClass=""
          visible={true}
        />
      )}
      {error && (
        <Typography mt="20px" component="p" variant="h4">
          {error}
        </Typography>
      )}
      {visibleContacts.length === 0 && !isLoading && filter && (
        <Typography mt="20px" component="p" variant="h4" sx={{fontSize:"26px", marginBottom:"20px"}}>
          Contacts with filter "{filter}" not found
        </Typography>
      )}
      {visibleContacts.length === 0 && !isLoading && !filter && (
        <Typography mt="20px" component="p" variant="h4" sx={{fontSize:"26px", marginBottom:"20px"}}>
          No contacts
        </Typography>
      )}

      <List
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 1,
          mt: 2,
          maxWidth: '900',
        }}
      >
        {visibleContacts.map(contact => {
          return <Contact key={contact.id} contact={contact} />;
        })}
      </List>
    </Box>
  );
}
