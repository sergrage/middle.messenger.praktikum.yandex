export const tpl = `<div class="register">
    <h1 class="register__header register__header-lineAfter">Регистрация</h1>
    {{#if showAlert}}
    <div class="alert">
        {{alertText}}
    </div>
    {{/if}}
    <form action="" class="register__form">
        <div class="">
            {{{ inputGroup }}}
        </div>
        <div class="">
            {{{ button }}}
            {{{ link }}}
        </div>
    </form>
</div>`;
