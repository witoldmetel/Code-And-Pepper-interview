/* eslint-disable react/button-has-type */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { QueryClientProvider } from 'react-query';

import { queryClient } from '../../App';
import { GameContext, GameProvider } from '../GameContext';
import { INIT_CARD_TITLE } from 'src/constants';

describe('GameProvider', () => {
  it('init resource is random by default', () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <GameProvider>
          <GameContext.Consumer>
            {(value) => {
              return <span>Init Resource: {value?.resource}</span>;
            }}
          </GameContext.Consumer>
        </GameProvider>
      </QueryClientProvider>
    );

    expect(getByText(`Init Resource: ${INIT_CARD_TITLE.RANDOM}`)).toBeTruthy();
  });

  describe('onResourceSelect', () => {
    it('sets different resources', () => {
      const { getByText } = render(
        <QueryClientProvider client={queryClient}>
          <GameProvider>
            <GameContext.Consumer>
              {(value) => {
                return (
                  <>
                    <span>Resource: {value?.resource}</span>
                    <span>Selected Resource: {value?.selectedResource}</span>
                    <button onClick={() => value?.onResourceSelect(INIT_CARD_TITLE.CHARACTER)}>Select Character</button>
                    <button onClick={() => value?.onResourceSelect(INIT_CARD_TITLE.RANDOM)}>Select Random</button>
                    <button onClick={() => value?.onResourceSelect(INIT_CARD_TITLE.STARSHIP)}>Select Starship</button>
                  </>
                );
              }}
            </GameContext.Consumer>
          </GameProvider>
        </QueryClientProvider>
      );

      fireEvent.click(getByText('Select Character'));

      expect(getByText(`Resource: ${INIT_CARD_TITLE.CHARACTER}`)).toBeTruthy();
      expect(getByText(`Selected Resource: ${INIT_CARD_TITLE.CHARACTER}`)).toBeTruthy();

      fireEvent.click(getByText('Select Starship'));

      expect(getByText(`Resource: ${INIT_CARD_TITLE.STARSHIP}`)).toBeTruthy();
      expect(getByText(`Selected Resource: ${INIT_CARD_TITLE.STARSHIP}`)).toBeTruthy();

      fireEvent.click(getByText('Select Random'));

      expect(getByText(`Resource: ${INIT_CARD_TITLE.RANDOM}`)).toBeTruthy();
    });
  });

  describe('getBattleResult', () => {
    // @todo: Fix test - promblem with counter
    it.skip('character battle', () => {
      const firstPlayer = {
        mass: '2',
        name: 'Joe',
        birth_year: 'unknown',
        gender: 'unknown',
        height: 'unknown'
      };

      const secondPlayer = {
        mass: '3',
        name: 'Doe',
        birth_year: 'unknown',
        gender: 'unknown',
        height: 'unknown'
      };

      const { getByText } = render(
        <QueryClientProvider client={queryClient}>
          <GameProvider>
            <GameContext.Consumer>
              {(value) => {
                const battleResult = value?.getBattleResult(firstPlayer, secondPlayer);

                return (
                  <>
                    <span>{battleResult}</span>
                    <button onClick={() => value?.onResourceSelect(INIT_CARD_TITLE.CHARACTER)}>Select Character</button>
                  </>
                );
              }}
            </GameContext.Consumer>
          </GameProvider>
        </QueryClientProvider>
      );

      fireEvent.click(getByText('Select Character'));

      expect(getByText('The winner is Doe')).toBeTruthy();
    });

    // @todo: Fix test - promblem with counter
    it.skip('starship battle', () => {
      const firstPlayer = {
        crew: '22',
        name: 'Solar Joe',
        model: 'unknown',
        manufacturer: 'unknown',
        length: 'unknown'
      };

      const secondPlayer = {
        crew: '13',
        name: 'Solar Doe',
        model: 'unknown',
        manufacturer: 'unknown',
        length: 'unknown'
      };

      const { getByText } = render(
        <QueryClientProvider client={queryClient}>
          <GameProvider>
            <GameContext.Consumer>
              {(value) => {
                const battleResult = value?.getBattleResult(firstPlayer, secondPlayer);

                return (
                  <>
                    <span>{battleResult}</span>
                    <button onClick={() => value?.onResourceSelect(INIT_CARD_TITLE.STARSHIP)}>Select Starship</button>
                  </>
                );
              }}
            </GameContext.Consumer>
          </GameProvider>
        </QueryClientProvider>
      );

      fireEvent.click(getByText('Select Starship'));

      expect(getByText('The winner is Solar Joe')).toBeTruthy();
    });

    it('draw', () => {
      const firstPlayer = {
        crew: '2',
        name: 'Solar Joe',
        model: 'unknown',
        manufacturer: 'unknown',
        length: 'unknown'
      };

      const secondPlayer = {
        crew: '2',
        name: 'Solar Doe',
        model: 'unknown',
        manufacturer: 'unknown',
        length: 'unknown'
      };

      const { getByText } = render(
        <QueryClientProvider client={queryClient}>
          <GameProvider>
            <GameContext.Consumer>
              {(value) => {
                const battleResult = value?.getBattleResult(firstPlayer, secondPlayer);

                return (
                  <>
                    <span>{battleResult}</span>
                    <button onClick={() => value?.onResourceSelect(INIT_CARD_TITLE.STARSHIP)}>Select Starship</button>
                  </>
                );
              }}
            </GameContext.Consumer>
          </GameProvider>
        </QueryClientProvider>
      );

      fireEvent.click(getByText('Select Starship'));

      expect(getByText('We have draw!')).toBeTruthy();
    });

    it('unknown result', () => {
      const firstPlayer = {
        crew: 'unknown',
        name: 'Solar Joe',
        model: 'unknown',
        manufacturer: 'unknown',
        length: 'unknown'
      };

      const secondPlayer = {
        crew: '2',
        name: 'Solar Doe',
        model: 'unknown',
        manufacturer: 'unknown',
        length: 'unknown'
      };

      const { getByText } = render(
        <QueryClientProvider client={queryClient}>
          <GameProvider>
            <GameContext.Consumer>
              {(value) => {
                const battleResult = value?.getBattleResult(firstPlayer, secondPlayer);

                return (
                  <>
                    <span>{battleResult}</span>
                    <button onClick={() => value?.onResourceSelect(INIT_CARD_TITLE.STARSHIP)}>Select Starship</button>
                  </>
                );
              }}
            </GameContext.Consumer>
          </GameProvider>
        </QueryClientProvider>
      );

      fireEvent.click(getByText('Select Starship'));

      expect(getByText('Unknown result of the battle')).toBeTruthy();
    });

    it('wrong data', () => {
      const firstPlayer = {
        crew: 'unknown',
        name: 'Solar Joe',
        model: 'unknown',
        manufacturer: 'unknown',
        length: 'unknown'
      };

      const secondPlayer = {
        crew: '2',
        name: 'Solar Doe',
        model: 'unknown',
        manufacturer: 'unknown',
        length: 'unknown'
      };

      const { getByText } = render(
        <QueryClientProvider client={queryClient}>
          <GameProvider>
            <GameContext.Consumer>
              {(value) => {
                const battleResult = value?.getBattleResult(firstPlayer, secondPlayer);

                return <span>{battleResult}</span>;
              }}
            </GameContext.Consumer>
          </GameProvider>
        </QueryClientProvider>
      );

      expect(getByText('Something went wrong')).toBeTruthy();
    });
  });
});
