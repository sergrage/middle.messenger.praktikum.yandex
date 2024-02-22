export const tpl = `<div class="chat__threads">
    <div class="chat__profile">
        {{{profileLink}}}
    </div>
    <div class="chat__search">
        <input class="chat__search__input" type="text" name="search" placeholder="&#xf002; Поиск">
    </div>
    {{{threadsList}}}
</div>
    {{{chatMessagesWrapper}}}`