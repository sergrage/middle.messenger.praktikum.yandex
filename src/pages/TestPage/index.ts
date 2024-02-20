import TestPage from "./TestPage";
import {render} from "../../utils/renderDOM";

const testPage = new TestPage({
    pageText: "!!!Some text!!!",
    className: "testClassName",
    settings: {withInternalID: true},
});

// testPage — это class дива в корне DOM
render(".testPage", testPage);


// setTimeout(() => {
//     testPage.children.button.setProps({
//         buttonText: '5675765675'
//     });
// }, 3000)
