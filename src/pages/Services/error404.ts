import Block from "core/Block";
import "./Services.css";

export class Error404 extends Block<object> {
    static componentName = "Error404";

    render() {
        return `
        <div class="services">
            <div class="inner">
                <h2>404</h2>
                <p>Не туда попали</p>
                <a href="/">на главную страницу</a>
            </div>
        </div>
        `;
    }
}
