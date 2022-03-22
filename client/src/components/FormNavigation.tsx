import { FormikValues } from 'formik';
import { Container, Button } from '@mui/material';

interface Props {
  hasPrevious?: boolean;
  onBackClick: (values: FormikValues) => void;
  isLastStep: boolean;
}

const FormNavigation = (props: Props) => {
  return (
    <Container sx={{ textAlign: 'center' }}>
      {props.hasPrevious && (
        <Button
          variant="contained"
          sx={{ m: 5, backgroundColor: '#90a4ae' }}
          onClick={props.onBackClick}
        >
          Volver
        </Button>
      )}
      <Button type="submit" variant="contained" sx={{ m: 5 }}>
        {props.isLastStep ? 'Enviar' : 'Siguiente'}
      </Button>
    </Container>
  );
};

export default FormNavigation;
