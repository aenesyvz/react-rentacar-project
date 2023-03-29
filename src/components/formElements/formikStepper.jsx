
import { Button, CircularProgress, hslToRgb } from '@mui/material';

import { Form, Formik, } from 'formik';

import React, { ReactNode, useState } from 'react';






export  function FormikStepper({ children, ...props }) {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          {/* <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step key={child.props.label} completed={step > index || completed}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper> */}

          {currentChild}

          <div className='stepper-button-group'>
            
              <div className='button-back'>
                <Button
                  disabled={isSubmitting}
                 
                  style={{backgroundColor:"transparent",color:"white"}}
                  onClick={() => step > 0 ? setStep((s) => s - 1) :props.changeCustomerNull()}
                >
                  Back
                </Button>
              </div>
            
            <div  className='button-next'>
              <Button 
                startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                disabled={isSubmitting}
                style={{backgroundColor:"transparent",color:"white"}}
                type="submit"
             
              >
                {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}