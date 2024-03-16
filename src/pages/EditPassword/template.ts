export const tpl = `<div class="profile">
    <img src="/icons/photo-icon.svg" alt="avatar" class="profile__avatar">
        {{#if showAlert}}
    <div class="alert">
        {{alertText}}
    </div>
    {{/if}}
    <form action="">
    {{{inputGroup}}}
    {{{button}}}
    </form>
    {{{link}}}
</div>`;
