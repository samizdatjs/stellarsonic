import UIkit from 'uikit';

export class NotificationService {
  public success(message: string) {
    this.notify(message, 'check');
  }

  public error(message: string) {
    this.notify(message, 'close');
  }

  private notify(message: string, icon?: string) {
    UIkit.notification({
      message: icon ? `<span uk-icon="icon: ${icon}" class="uk-margin-right"></span> ${message}` : message,
      pos: 'bottom-left',
      timeout: 3000,
    });
  }
}
