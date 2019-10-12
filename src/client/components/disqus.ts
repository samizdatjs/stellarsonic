import {inject, bindable} from 'aurelia-framework';
import {DOM} from 'aurelia-pal';

declare var DISQUS: any;

@inject('disqus.Shortname')
export class DisqusCustomElement {
  @bindable url!: string;
  @bindable identifier!: string;
  @bindable title!: string;

  public constructor(
    private shortname: string
  ) {}

  attached() {
    let script = <HTMLScriptElement>DOM.createElement('script');
    script.src = `//${this.shortname}.disqus.com/embed.js`;
    script.async = true;
    script.type = 'text/javascript';
    script.setAttribute('data-timestamp', new Date().getTime().toString())
    DOM.appendNode(script);

    console.log(this.identifier);
    console.log(this.url);
    console.log(this.title);
    DISQUS.reset({
      reload: true,
      config: function () {
        this.page.identifier = this.identifier;
        this.page.url = this.url;
        this.page.title = this.title;
      }
    });
  }
}
