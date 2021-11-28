/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Loader from 'react-loader-spinner';
import Button from '../Button';

export default function FormButton ({ isLoading = false, children, ...props }) {
  return (
    <Button {...props} disabled={isLoading}>
      {
        (isLoading === true)
         ? <Loader type="ThreeDots" color="#000" height={15} width={50} />
         : children
      }
    </Button>
  )
}