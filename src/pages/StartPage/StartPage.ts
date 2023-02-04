import Block from "../../core/Block";

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
