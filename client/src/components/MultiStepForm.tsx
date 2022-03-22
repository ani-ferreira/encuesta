import { FormikConfig, FormikHelpers, FormikValues } from 'formik';
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import FormNavigation from './FormNavigation';
import { Step, StepLabel, Stepper } from '@mui/material';

/* children:React.ReactNode 
 https://egghead.io/lessons/react-use-react-reactnode-for-the-children-prop-in-react-typescript-components-and-render-props
  */

interface Props extends FormikConfig<FormikValues> {
  children: React.ReactNode;
}

const MultiStepForm = ({ children, initialValues, onSubmit }: Props) => {
  //current page
  const [stepNumber, setStepNumber] = useState(0);

  //step = page of the form
  const steps = React.Children.toArray(children) as React.ReactElement[];

  //sets what the initianvalues should be as the user naviagtes steps
  //updates as user hits back or next btn
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  //go back
  const previous = (values: FormikValues) => {
    setSnapshot(values);
    setStepNumber(stepNumber - 1);
  };

  //go forward
  const next = (values: FormikValues) => {
    setSnapshot(values);
    setStepNumber(stepNumber + 1);
  };

  const handleSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    //if step has onSubmit, pass with values
    if (step.props.onSubmit) {
      await step.props.onSubmit(values);
    }
    //if its last step submit all values from all steps, if not go next page
    if (isLastStep) {
      return onSubmit(values, actions);
    } else {
      actions.setTouched({});
      next(values);
    }
  };

  return (
    <div>
      <Formik
        validationSchema={step.props.validationSchema}
        initialValues={snapshot}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <Stepper activeStep={stepNumber} sx={{ my: 5, mx: 10 }}>
              {steps.map((step) => {
                const label = step.props.stepName;
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {step}

            <FormNavigation
              isLastStep={isLastStep}
              hasPrevious={stepNumber > 0}
              onBackClick={() => previous(formik.values)}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MultiStepForm;

export const FormStep = ({ stepName = '', children }: any) => children;
