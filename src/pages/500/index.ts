import './500.scss';
import ServerErrorPage from './500';
import render from '../../utils/renderDOM';

const page = new ServerErrorPage({
  settings: { withInternalID: true },
});

// testPage — это class дива в корне DOM
render('.app', page);
