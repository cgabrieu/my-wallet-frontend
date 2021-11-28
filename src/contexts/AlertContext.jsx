/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  transition: transitions.FADE,
};

export default function AlertsProvider({ children }) {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      { children }
    </AlertProvider>
  );
}