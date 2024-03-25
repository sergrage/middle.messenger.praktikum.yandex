export const tpl = `<div class="chat__threads">
    <div class="chat__profile">
    <img src="{{avatar}}" alt="avatar" class="chat__avatar">
        {{{profileLink}}}
    </div>
    <form class="chat__search">
        <input class="chat__search__input chat__search__input-bordered" type="text" name="chatName" placeholder="Добавить чат">
        {{{addChat}}}
    </form>
    <div class="chat__search">
        <input class="chat__search__input" type="text" name="search" placeholder="&#xf002; Поиск">
    </div>
    {{{threadsList}}}
</div>
    {{{chatMessagesWrapper}}}`;
