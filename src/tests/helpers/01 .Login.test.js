import React from "react";
import { cleanup, waitFor } from "@testing-library/react";
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from '../../App';


describe('Testes na página de login', () => {
  beforeEach(cleanup);
  it('01.Se a página de login é renderizada corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    
    const NAME_INPUT = screen.getByTestId("input-player-name");
    const EMAIL_INPUT = screen.getByTestId("input-gravatar-email");
    const BUTTON_LOGIN = screen.getByTestId("btn-play");
    const BUTTON_SETTINGS = screen.getByTestId("btn-settings");
    
    expect(NAME_INPUT).toBeInTheDocument(); 
    expect(EMAIL_INPUT).toBeInTheDocument();
    expect(BUTTON_LOGIN).toBeInTheDocument();
    expect(BUTTON_SETTINGS).toBeInTheDocument();
    expect(BUTTON_LOGIN.disabled).toBeTruthy();
    expect(history.location.pathname).toBe('/');
  })

  it('02.Btn play deveria gerar token e redirecionar a página', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const NAME_INPUT = screen.getByTestId("input-player-name");
    const EMAIL_INPUT = screen.getByTestId("input-gravatar-email");
    const BUTTON_LOGIN = screen.getByTestId("btn-play");

    expect(NAME_INPUT).toBeInTheDocument(); 
    expect(EMAIL_INPUT).toBeInTheDocument();
    expect(BUTTON_LOGIN).toBeInTheDocument();
    expect(BUTTON_LOGIN.disabled).toBeTruthy();
    
    userEvent.type(NAME_INPUT, 'João Otávio');
    userEvent.type(EMAIL_INPUT, 'trybe@gmail.com');

    expect(BUTTON_LOGIN.disabled).toBeFalsy();

    userEvent.click(BUTTON_LOGIN);

    // const {location: { pathname }} = history;
    await waitFor(() => {
      expect(history.location.pathname).toBe('/game')
    });     
  })

  it('03.Testa se ao clicar em setting a página é redirecionada', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const BUTTON_SETTINGS = screen.getByTestId("btn-settings");
    expect(BUTTON_SETTINGS).toBeInTheDocument();

    userEvent.click(BUTTON_SETTINGS);
    
    expect(history.location.pathname).toBe('/settings');
  })
})
