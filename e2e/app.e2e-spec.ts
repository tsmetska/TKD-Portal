import { TKDPortalPage } from './app.po';

describe('tkdportal App', () => {
  let page: TKDPortalPage;

  beforeEach(() => {
    page = new TKDPortalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
