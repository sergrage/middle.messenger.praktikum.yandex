export const tpl = `<div class="chat__content__body__day">
<p>!!!!!</p>
    <div class="chat__content__body__day__date">
        {{day}}
    </div>
    {{#each messages}}
    {{content}}
        {{#if img}}
            {{#if companion}}
                <div class="massage massage__imageWrap">
                    <img class="massage__image" src="{{img}}" alt="{{alt}}">
                    <span class="massage__image__time">{{time}}</span>
                </div>
            {{else}}
                <div class="massage massage-my massage__imageWrap">
                    <img class="massage__image" src="{{img}}" alt="{{alt}}">
                    <span class="massage__image__time">{{time}}</span>
                </div>
            {{/if}}
        {{else}}
            {{#if companion}}
                <div class="massage massage-companion">
                    {{#each text}}
                        {{#if @first}}
                            <p class="m-0">{{this}}</p>
                        {{else}}
                            <p>{{this}}</p>
                        {{/if}}
                    {{/each}}
                    <span class="massage-companion__time">{{time}}</span>
                </div>
            {{/if}}
            {{#if my}}
                <div class="massage massage-my">
                    {{#each text}}
                        {{#if @first}}
                            <p class="m-0">{{this}}</p>
                        {{else}}
                            <p>{{this}}</p>
                        {{/if}}
                    {{/each}}
                    <span class="massage-my__check"><i class="fa-solid fa-check-double"></i> {{time}} </span>
                </div>
            {{/if}}
        {{/if}}
    {{/each}}
</div>`;
