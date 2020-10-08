import {Database, provider} from '@ziqquratu/ziqquratu';
import * as inquirer from 'inquirer';
import { DocumentFactory } from './common';

@provider({
  inject: ['ziqquratu.Database']
})
export class PostFactory extends DocumentFactory {
  public constructor(private database: Database) { super() }

  public async create(): Promise<any> {
    const templateCollection = await this.database.collection('templates');
    const authorsCollection = await this.database.collection('authors');
    const authors = await authorsCollection.find({}).toArray();
    const template = await templateCollection.findOne({_id: 'post'});

    if (authors.length === 0) {
      throw Error('Please add an author first');
    }
    const data = await this.inquire(authors);

    return this.compile(data.headline, template, data, {
      dateCreated: new Date().toISOString(),
      datePublished: new Date().toISOString(),
    });
  }

  private inquire(authors: any[]) {
    const questions = [
      {
        name: 'author',
        type: 'list',
        message: 'Choose an author',
        choices: authors.map(a => a._id),
      },
      {
        name: 'headline',
        type: 'input',
        message: 'Enter article headline',
        validate: function( value: any ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your username or e-mail address.';
          }
        }
      },
    ];
    return inquirer.prompt(questions);
  }
}