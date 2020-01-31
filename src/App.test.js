import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe("test 1", () => {
   it("should be 1", () => {
     expect(1).toBe(1);
   })
})

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
