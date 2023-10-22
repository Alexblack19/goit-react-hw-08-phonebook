import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';
import toast from 'react-hot-toast';
import { validateName, validateNumber } from 'components/validations';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Fab } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [nameError, setNameError] = useState(false);
  const [numberError, setNumberError] = useState(false);

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const checkContact = value => {
    const isInContacts = contacts.some(
      ({ name }) => name.toLowerCase() === value.toLowerCase()
    );
    return isInContacts;
  };

  useEffect(() => {
    if (name === '') {
      return;
    }
    if (!validateName(name.trim())) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }, [name, nameError]);

  useEffect(() => {
    if (number === '') {
      return;
    }
    if (!validateNumber(number.trim())) {
      setNumberError(true);
    } else {
      setNumberError(false);
    }
  }, [number, numberError]);

  function handleChange(e) {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (checkContact(name)) {
      return toast.error(`${name} is already in contacts.`);
    }

    if (
      nameError ||
      numberError ||
      name.trim() === '' ||
      number.trim() === ''
    ) {
      setNameError(true);
      setNumberError(true);
      return;
    }

    dispatch(addContact({ name, number }));
    clearForm();
  };

  function clearForm() {
    setName('');
    setNumber('');
  }

  return (
    <Box
      sx={{
        marginTop: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h4">
        New contact
      </Typography>
      <Box noValidate component="form" onSubmit={handleSubmit} mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              sx={{ maxWidth: '462px' }}
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="off"
              value={name}
              type="text"
              onChange={handleChange}
              error={nameError}
              {...(nameError && {
                helperText:
                  'Name may contain only letters, apostrophe, dash and spaces.',
              })}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              sx={{ maxWidth: '462px' }}
              fullWidth
              id="number"
              label="Number"
              name="number"
              autoComplete="off"
              value={number}
              type="tel"
              onChange={handleChange}
              error={numberError}
              {...(numberError && {
                helperText:
                  'Number must be digits and can contain spaces, dashes, parentheses and can start with +.',
              })}
            />
          </Grid>
        </Grid>
        <Grid
          item
          sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
          xs={12}
        >
          <Fab
            sx={{ width: 60, height: 60 }}
            type="submit"
            color="primary"
            aria-label="add"
          >
            <PersonAddIcon fontSize="large" />
          </Fab>
        </Grid>
      </Box>
    </Box>
  );
}
