export const tpl = `<div class="chat__content__body">
        <div class="chat__content__head">
            <div class="chat__content__head__info">
                <div class="chat__thread__info">
                    <div class="chat__thread__avatar chat__thread__avatar-small"></div>
                    <div class="chat__thread__title">
                        <p class="chat__thread__name">{{{chatTitle}}}</p>
       
                    </div>
                </div>
            </div>
            
        {{#if chatTitle}}
            <form class="chat__search" style="width: 50%;">
                <input class="chat__search__input chat__search__input-bordered"
                       type="text"
                       name="userId"
                       placeholder="Добавить пользователя в чат">
                {{{addUserBtn}}}
                </form>
            {{/if}}
            
            <div class="chat__content__head__action">
                {{{logoutBtn}}}
            </div>
        </div>
        <p id="chatUsers"> Участники чата: 
         {{{chatUsersBtns}}}
        </p>
       {{#if chatMessages.length}}


        {{#each chatMessages}}
        
        <div class="chat__content__body__day">
        
        {{#if isMy}}
            <div class="massage massage-my">
                    {{content}}
                <p><span class="massage-my__check"><i class="fa-solid fa-check-double"></i> {{time}} </span></p>
            </div>
       {{else}}
            <div class="massage massage-companion">
                    {{content}} 
                <p style="padding-top: 3px;"><span class="massage-companion__time">{{time}} </span></p>
            </div>
        {{/if}}
        
       </div>
       {{/each}}


    {{else}}
        <div class="chat__content__no-message-img" style="text-align: center;">
            <img src="/icons/no-message-icon.svg" alt="no-message-icon">
            {{#if chatTitle}}
            <p class="chat__content__no-message">Отправьте первое сообщение</p>
                {{else}}
            <p class="chat__content__no-message">Выберите чат чтобы отправить сообщение</p>
                {{/if}}
        </div>
    {{/if}}
            <form action="">
            <div class="chat__content__footer">
                <div class="chat__content__footer__addFile">
                    <label for="addFile"><span><i class="fa-solid fa-paperclip"></i></span></label>
                    <input id="addFile" type="file" hidden="hidden">
                </div>
                <div class="chat__content__footer__inputWrap">
                    {{{messagesInput}}}
                </div>
                {{{messagesButton}}}
            </div>
        </form>
</div>`;
