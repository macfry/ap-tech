import { act, render, waitFor } from '@testing-library/react'
import Widget from "../components/Widget";

describe('Widget', () => {
  it('renders the Widget component', async () => {
    await act( async () => {
      render(<Widget/>);
    });

    await waitFor(async () => {
    })
    
    // screen.debug(); // prints out the jsx in the App component unto the command line
  })
})