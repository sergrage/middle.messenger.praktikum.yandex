export const tpl = `<div class="profile">
    <img src="/icons/photo-icon.svg" alt="avatar" class="profile__avatar">
    <h4 class="profile__name">Иван</h4>
    {{{profileFields}}}
    <div class="profile__field">
        {{{linkEditProfile}}}
    </div>
    <div class="profile__field">
        {{{linkEditPassword}}}
    </div>
    <div class="profile__field profile__field-noBorder">
        {{{linkExit}}}
    </div>
    {{{linkChats}}}
</div>`;
