export const tpl= `<label for="{{for}}" class="{{labelClassName}}">{{title}}</label>
{{{input}}}
{{#if showValidateError}}
<span class="inputGroup__error">{{validateMessage}}</span>
{{/if}}`
