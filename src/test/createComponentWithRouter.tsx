import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

const createComponentWithRouter = (children: React.ReactNode) => renderer.create(
  <MemoryRouter>
    { children }
  </MemoryRouter>
  );

export default createComponentWithRouter;
