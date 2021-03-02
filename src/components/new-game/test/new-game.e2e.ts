import { newE2EPage } from '@stencil/core/testing';

describe('new-game', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<new-game></new-game>');

    const element = await page.find('new-game');
    expect(element).toHaveClass('hydrated');
  });
});
