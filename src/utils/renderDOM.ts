import Block from "../core/Block";

export function render(query: string, block: Block) {
    const root = document.querySelector(query)!;

    // Можно завязаться на реализации вашего класса Block
    if (root && block) {
        // @ts-ignore
        root.appendChild(block.getContent());
        block.dispatchComponentDidMount();
    }

    return root;
}