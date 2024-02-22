export const tpl= `<div class="chat__content__body">
    {{#if chatMessages.length}}
        <div class="chat__content__head">
            <div class="chat__content__head__info">
                <div class="chat__thread__info">
                    <div class="chat__thread__avatar chat__thread__avatar-small"></div>
                    <div class="chat__thread__title">
                        <p class="chat__thread__name">Концерты</p>
                    </div>
                </div>
            </div>
            <div class="chat__content__head__action">
                <span><i class="fa-solid fa-ellipsis-vertical"></i></span>
            </div>
        </div>

        {{{chatMessages}}}

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
    {{else}}
        <div class="">
            <img src="../../static/icons/no-message-icon.svg" alt="no-message-icon">
            <p class="chat__content__no-message">Выберите чат чтобы отправить сообщение</p>
        </div>
    {{/if}}
</div>`
