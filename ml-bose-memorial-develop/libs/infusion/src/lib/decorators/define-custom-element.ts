export function ksCustomElement(name: string) {
  return function (CustomElement: CustomElementConstructor) {
    customElements.get(name) || customElements.define(name, CustomElement);
  };
}
