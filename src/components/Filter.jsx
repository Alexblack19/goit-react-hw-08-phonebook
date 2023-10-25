import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { selectFilter } from 'redux/selectors';
import { Typography, TextField } from '@mui/material';
import { Box } from '@mui/system';

export function Filter() {
  const dispatch = useDispatch();
  const valueFilter = useSelector(selectFilter);

  const onChangeFilter = e => {
    dispatch(setFilter(e.currentTarget.value.trim()));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        maxWidth: '462px',
        mr: 'auto',
        ml: 'auto',
        mt: 2,
      }}
    >
      <Typography sx={{ mb: 1 }} component="p" variant="h5">
        Find contacts by name
      </Typography>
      <TextField
        fullWidth
        type="text"
        value={valueFilter}
        onChange={onChangeFilter}
        id="filled-error"
        label="Filter"
        color="success"
      />
    </Box>
  );
}
