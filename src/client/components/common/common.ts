export class IntegerFromInputValueConverter {
  fromView(value: string) {
    return parseInt(value);
  }
}

export class DateFormatValueConverter {
  toView(value: string) {
    return new Date(value).toLocaleDateString('en-US');
  }
}
