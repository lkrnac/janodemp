import {JanodempPage} from "./app.po";

describe('janodemp-client App', function() {
  let page: JanodempPage;

  beforeEach(() => {
    page = new JanodempPage();
  });

  it('should display application title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('JAnodeMP');
  });
});
