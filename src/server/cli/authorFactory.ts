import {provider} from '@ziqquratu/ziqquratu';
import * as inquirer from 'inquirer';
import { DocumentFactory } from './common';

@provider()
export class AuthorFactory extends DocumentFactory {
  public constructor() { super() }

  public async create(): Promise<any> {
    const data = await this.inquire();
    return this.compile(data.givenName + ' ' + data.familyName, data);
  }

  private inquire() {
    const questions = [
      {
        name: 'givenName',
        type: 'input',
        message: 'Enter given name',
        validate: function( value: any ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter author given name';
          }
        }
      },
      {
        name: 'familyName',
        type: 'input',
        message: 'Enter family name (optional)',
      },
      {
        name: 'email',
        type: 'input',
        message: 'Enter email (optional)',
      },
    ];
    return inquirer.prompt(questions);
  }
}