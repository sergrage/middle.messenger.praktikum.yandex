export const tpl= `<div class="chat__thread {{#if active}}chat__thread-active{{/if}}">
    <div class="chat__thread__info">
        <div class="chat__thread__avatar"></div>
        <div class="chat__thread__title">
            <p class="chat__thread__name">{{name}}</p>
            <p class="chat__thread__lastText">
                {{#if myLast}}
                    <span class="chat__thread__lastText-my">Вы:</span>
                {{/if}}
                {{lastText}}
            </p>
        </div>
    </div>
    <div class="chat__thread__status">
        <p class="chat__thread__time">{{time}}</p>
        {{#if new}}
            <div class="chat__thread__new">{{new}}</div>
        {{/if}}
    </div>
</div>`