import Block from "../core/Block";
import renderDOM from "./../utils/renderDOM"

class Route {
    _pathname: string;
    _title: string;
    _blockClass: new (props: Record<string, any>) => Block;
    _block: Block | null;
    _props: Record<string , unknown>;
    constructor(pathname: string, _title: string, view: new (props: Record<string, any>) => Block, props: Record<string, unknown>) {
        this._pathname = pathname;
        this._title = _title;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass( {
                settings: {withInternalID: true},
                data: this._props.data
            });
            renderDOM(this._props.rootQuery as string, this._block as Block);
            return;
        }
        renderDOM(this._props.rootQuery as string, this._block as Block);
       // this._block.show();
    }
}

export default Route;
