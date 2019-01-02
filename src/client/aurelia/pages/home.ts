export class Home {
  private pick: string = '';

  async activate(params: any) {
    this.pick = params.pick;
  }
}
