import Block from "core/Block";

export default function renderDOM(block: Block<object>) {
    const root = document.querySelector("#app") as HTMLElement;
    if (!root) {
        new Error("Нет корневого элемента!");
    }

    root.innerHTML = "";
    root.appendChild(block.getContent());
}
