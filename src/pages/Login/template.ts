export const tpl = `<div class="login">
    <h1 class="login__header login__header-lineAfter">Авторизация</h1>
    {{#if showAlert}}
    <div class="alert">
        {{alertText}}
    </div>
    {{/if}}
    <form action="" class="login__form">
        <div class="">
            {{{ inputGroup }}}
        </div>
        <div class="">
            {{{ button }}}
            {{{ link }}}
        </div>
    </form>
</div>`;
