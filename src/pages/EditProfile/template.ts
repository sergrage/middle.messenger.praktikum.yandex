export const tpl = `<div class="profile">
<div class="mt-3" style="width: 300px;margin: 0 auto;">
    <img src="{{avatar}}" alt="avatar" class="profile__avatar" style="width: 100%;">
</div>

    <form action="">
    {{{inputGroup}}}
    {{{button}}}
    </form>

    <div class="">
        <form action="" class="d-inline-block">
        <label for="avatarInput" class="btn btn-purple mt-3 m-auto">
        <span><i class="fa-regular fa-file-image"></i></span> Выберите файл
        </label>
        {{{avatarInput}}}
    </form>
    {{{passwordLink}}}
    {{{chatLink}}} 
    </div>
    
</div>`;
