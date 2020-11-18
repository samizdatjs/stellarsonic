export class Editor {
  public active: boolean = false;
  public toolbar: boolean = false;

  public toggleActive() {
    this.active = !this.active;
  }
}
