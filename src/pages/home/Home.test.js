import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './Home';

it("shows empty text inside the search box on load", () => {
    render(<Home />);
    expect(screen.getByRole("textbox", {name: /search book/i})).toHaveValue("");
});

it("should display the typed text", () => {
    render(<Home />);

    userEvent.type(screen.getByRole("textbox", {name: /search book/i}), "harry");

    expect(screen.getByRole("textbox", {name: /search book/i})).toHaveValue("harry");;
});
