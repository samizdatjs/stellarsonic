import {Database, provider} from '@ziqquratu/ziqquratu';
import * as inquirer from 'inquirer';
import { CreateDocumentCommand, DocumentFactory } from './common';

@provider({
  inject: ['ziqquratu.Database']
})
export class AuthorFactory extends DocumentFactory {
  public constructor(database: Database) { super(database) }

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

@provider({
  inject: [AuthorFactory]
})
export class CreateAuthorCommand extends CreateDocumentCommand {
  public constructor(fact: AuthorFactory) {
    super('create-author', 'Create a new author', 'authors', fact);
  }
}