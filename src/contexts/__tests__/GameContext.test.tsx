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
});
