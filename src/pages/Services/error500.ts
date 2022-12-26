import Block from "core/Block";
import "./Services.css";

export default class Error500 extends Block<object> {
    static componentName = "Error500";

    render() {
        return `
            <div class="services">
                <div class="inner">
                    <h2>500</h2>
                    <p>Мы уже чиним</p>
                </div>
            </div>
        `;
    }
}
