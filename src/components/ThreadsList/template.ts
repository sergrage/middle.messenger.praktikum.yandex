export const tpl = `<div class="chat__thread">
    <div class="chat__thread__info">
        <div class="chat__thread__avatar"></div>
        <div class="chat__thread__title">
            <p class="chat__thread__name">{{title}}</p>
            <p class="chat__thread__lastText">
            {{#if last_message}}
            <span class="chat__thread__lastText-my">{{last_message.user.first_name}}</span>
                {{last_message.content}}
            {{else}}
            <span><i class="fa-solid fa-comments"></i></span> Нет сообщений(
           {{/if}}
            </p>
        </div>
    </div>
    <div class="chat__thread__status">
    {{#if time}}
        <p class="chat__thread__time">{{time}}</p>
    {{/if}}
    </div>
</div>`;
