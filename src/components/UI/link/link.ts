import Block from "core/Block";
import "./link.css"

interface LinkProps {
    [key: string]: string;
}

export default class Link extends Block<object> {
    static componentName = "Link";
    constructor({text, href}: LinkProps) {
        super({text, href});
    }

    protected render(): string {
        return `
            <a href={{ href }}>{{ text }}</a>
        `;
    }
}
