import './404.scss';
import NotFoundPage from "./404";
import {render} from "../../utils/renderDOM";

const page = new NotFoundPage({
    settings: {withInternalID: true},
});

// testPage — это class дива в корне DOM
render(".app", page);
