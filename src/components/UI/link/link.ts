import Block from "core/Block";
import "./link.css"

interface LinkProps {
    text: string;
    href: string;
}

export default class Link extends Block<LinkProps> {
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
