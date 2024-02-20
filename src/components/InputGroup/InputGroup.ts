import Block from "./../../core/Block"
import './InputGroup.scss';

import ValidateService from "./../../core/ValidateService";

// @ts-ignore
import tpl from "./template.hbs?raw";
import Input from "../Input/Input";
export default class InputGroup extends Block {
    constructor(props: Record<string, unknown>) {
        // Создаём враппер дом-элемент button
        super("div", props);


        if(typeof props.className  === 'string')
            this._element?.classList.add(...props.className.split(' '));

        const className = props.subClass  ? props.inputClassName + ' ' + props.subClass: props.inputClassName;
        this.children['input'] = new Input({
            for: props.for,
            className: className,
            name: props.name,
            value: props.value,
            type: props.type,
            settings: {withInternalID: true},
            'events': {
                'blur': (event: any) => {
                    const val = event.target.value;
                    const validateService = new ValidateService(<string>props.name, <string>val);
                    this.setProps({validateMessage: validateService.errorMessage()});

                    // @ts-ignore
                    this.setProps({showValidateError: validateService[props.name]});
                },
            },
        });
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
    }

    render(): DocumentFragment {
        return this.compile(tpl, {
            'title': this.props.title,
            'labelClassName': this.props.labelClassName,
            'for': this.props.for,
            'validateMessage': this.props.validateMessage,
            'showValidateError': this.props.showValidateError,
            'input': this.props.input
        });
    }
}