import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Home = () => {
  return (
    <Container
      sx={{
        mt: 25,
        height: '50vh',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '150px',
      }}
      component="main"
      maxWidth="md"
    >
      <Typography
        color="#46957A"
        textAlign="center"
        component="h1"
        variant="h1"
        marginBottom="15px"
      >
        PHONEBOOK
      </Typography>
      <Typography
        textAlign="center"
        component="h2"
        variant="h3"
        color="#444654"
        marginBottom="15px"
      >
        A phone book with registration designed for recording and storing
        personal contacts
      </Typography>
      <Typography textAlign="center" component="h2" variant="h5">
        Individual project completed during the study of the React module at {' '}
        <Box
          mr="35px"
          ml="35px"
          display="inline-block"
          width="40px"
          height="40px"
          position="relative"
        >
          <Typography
            position="absolute"
            top="9px"
            right="25px"
            p="8px"
            fontWeight="700"
            bgcolor="#000000"
            color="#FFF"
            component="span"
            variant="h5"
          >
            GO
          </Typography>
          <Box
            display="inline-block"
            position="absolute"
            top="8.9px"
            left="14.5px"
            width="40px"
            height="48.3px"
            bgcolor="#000000"
            sx={{
              clipPath: 'polygon(0 0, 45% 51%, 0 100%)',
            }}
          ></Box>
          <Typography
            position="absolute"
            top="9px"
            left="35px"
            fontWeight="700"
            p="8px"
            bgcolor="#ff8800"
            color="#FFF"
            component="span"
            variant="h5"
          >
            IT
          </Typography>{' '}
        </Box>
      </Typography>
    </Container>
  );
};
export default Home;
