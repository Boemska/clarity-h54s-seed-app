import {ClaritySeedAppHome} from './app.po';

fdescribe('clarity-seed app', function () {

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/15215
  let expectedMsg: any = 'This is a Clarity seed application. This is the default page that loads for the application.';

  let page: ClaritySeedAppHome;

  beforeEach(() => {
    page = new ClaritySeedAppHome();
  });

  it('should display: ' + expectedMsg, () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual(expectedMsg)
  });
});
