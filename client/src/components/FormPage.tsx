import { Container, Typography } from '@mui/material';
import { string, object, number } from 'yup';
import InputField from './InputField';
import MultiStepForm from './MultiStepForm';
import { FormStep } from './MultiStepForm';
import SelectField from './SelectField';
import { ocupation } from '../options';

function FormPage() {
  return (
    <>
      <Container>
        <MultiStepForm
          initialValues={{
            firstName: '',
            lastName: '',
            contact: '',
            age: '',
            ocupation: '',
          }}
          onSubmit={(values) => {
            alert(JSON.stringify(values));
          }}
        >
          <FormStep
            stepName="Datos personales"
            onSubmit={() => console.log('step person')}
            validationSchema={object({
              firstName: string()
                .min(2, 'Muy corto')
                .required('Completar nombre'),
              lastName: string()
                .min(2, 'Muy corto')
                .required('Completar apellido'),
            })}
          >
            <InputField name="firstName" label="Nombre" />
            <InputField name="lastName" label="Apellido" />
          </FormStep>
          <FormStep
            stepName="Miembros del hogar, edad, situación laboral, educación y Covid"
            onSubmit={() => console.log('step contact')}
            validationSchema={object({
              age: number()
                .max(99, 'Ingresar un número menor a 99')
                .required('Completar'),
              ocupation: string().required('Completar'),
            })}
          >
            <Typography>Primero responderá sobre usted:</Typography>
            <InputField
              type="number"
              name="age"
              label="Indicar edad (0 para menores de 1 año)"
            />
            <SelectField
              name="ocupation"
              label="Trabaja actualmente?"
              options={ocupation}
            />
          </FormStep>
        </MultiStepForm>
      </Container>
    </>
  );
}

export default FormPage;
