import * as chalk from 'chalk';
import * as figlet from 'figlet';
import * as inquirer from 'inquirer';
import { Command } from 'commander';
import { databaseConfig } from './databaseConfig';
import {bootstrap, component, Database, LogLevel, Provider} from '@ziqquratu/ziqquratu';
import {terminal} from '@ziqquratu/terminal';
import slugify from 'slugify';

@component({
  dependencies: [
    import('@ziqquratu/nabu'),
    import('@ziqquratu/tashmetu'),
    import('@ziqquratu/schema'),
  ],
  providers: [
    Provider.ofInstance('ziqquratu.DatabaseConfig', databaseConfig)
  ],
  inject: ['ziqquratu.Database']
})
class CliApplication {
  public constructor(private database: Database) {}

  public async createAuthor() {
    try {
      const authors = await this.database.collection('authors');
      const data = await this.authorInquiry();
      data._id = slugify(data.givenName + ' ' + data.familyName, {
        lower: true,
      });
      await authors.insertOne(data);
      console.log('Successfully created author: ' + data._id);
    } catch (err) {
      console.log(err.message);
    }
  }

  public async createPost() {
    try {
      const templateCollection = await this.database.collection('templates');
      const authorsCollection = await this.database.collection('authors');
      const authors = await authorsCollection.find({}).toArray();
      const template = await templateCollection.findOne({_id: 'post'});

      if (authors.length === 0) {
        throw Error('Please add an author first');
      }
      const posts = await this.database.collection('articles');
      const data = await this.postInquiry(authors);
      const post = Object.assign({}, template, data, {
        _id: this.createId(data.headline),
        dateCreated: new Date().toISOString(),
        datePublished: new Date().toISOString(),
      });
      await posts.insertOne(post);
      console.log('Successfully created post: ' + post._id);
    } catch (err) {
      console.log(err.message)
    }
  }

  private createId(name: string) {
    return slugify(name, { lower: true });
  }

  private postInquiry(authors: any[]) {
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

  private authorInquiry() {
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

bootstrap(CliApplication, {
  logLevel: LogLevel.Error,
  logFormat: terminal(),
}).then(app => {
  const program = new Command();

  const createPost = new Command();
  createPost
    .name('create-post')
    .description('create a new post')
    .action(async () => {
      await app.createPost();
    })

  const createAuthor = new Command();
  createAuthor
    .name('create-author')
    .description('create a new author')
    .action(async () => {
      await app.createAuthor();
    })

  program
    .name('stellarsonic-cli')
    .usage('Usage information')
    .version('0.7.1')
    .addCommand(createPost)
    .addCommand(createAuthor);
  
  program.on('--help', () => {
    console.log('');
    console.log('Example call:');
    console.log('  $ custom-help --help');
  });

  console.log(
    chalk.magentaBright(
      figlet.textSync('Stellarsonic', { horizontalLayout: 'full' })
    )
  );
  program.parse(process.argv)
})

