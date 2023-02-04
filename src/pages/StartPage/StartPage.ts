import Block from "../../core/Block";
import './StartPage.less'

export default class StartPage extends Block<object> {
    static componentName = "StartPage";

    render() {
        return `
            <div class="StartPage">
                    <div class="preloader"></div>
            </div>
        `;
    }
}
