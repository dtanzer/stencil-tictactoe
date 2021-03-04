import { newE2EPage } from '@stencil/core/testing';

describe('game-board', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<game-board></game-board>');

    const element = await page.find('game-board');
    expect(element).toHaveClass('hydrated');
  });
});
