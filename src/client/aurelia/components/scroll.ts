import {autoinject, BindingEngine} from 'aurelia-framework';

@autoinject
export class ScrollStyleCustomAttribute {
  private value: any;

  constructor(element: Element, private bindingEngine: BindingEngine) {

    // window.addEventListener('scroll', () => console.log('scroll'));
    /*
    this.element = element;
    this.element.style.width = this.element.style.height = '100px';
    this.element.style.backgroundColor = 'red';
    */
  }

  bind() {
    setTimeout(() => {
      for (let k of Object.keys(this.value)) {
        let elem = document.getElementById(k);
        console.log(elem);
        if (elem) {
          let rect = elem.getBoundingClientRect()
          console.log(rect.top);
          let subscription = this.bindingEngine.propertyObserver(rect, 'top')
            .subscribe(offset => console.log(offset));
        }
      }
    }, 3000);
    // this.element.style.backgroundColor = this.value;
  }
}