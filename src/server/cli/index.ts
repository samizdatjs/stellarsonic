import * as chalk from 'chalk';
import * as figlet from 'figlet';
import * as inquirer from 'inquirer';
import { Command } from 'commander';
import { databaseConfig } from './databaseConfig';
import {bootstrap, component, Database, LogLevel, provider, Provider} from '@ziqquratu/ziqquratu';
import {terminal} from '@ziqquratu/terminal';
import slugify from 'slugify';

abstract class DocumentFactory {
  public abstract create(): Promise<any>;

  protected compile(name: string, ...data: any[]): any {
    return Object.assign({}, ...data, {_id: slugify(name, { lower: true })});
  }
}

@provider({
  inject: ['ziqquratu.Database']
})
class PostFactory extends DocumentFactory {
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

@provider({
  inject: ['ziqquratu.Database']
})
class AuthorFactory extends DocumentFactory {
  public constructor(private database: Database) { super() }

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

@component({
  dependencies: [
    import('@ziqquratu/nabu'),
    import('@ziqquratu/tashmetu'),
    import('@ziqquratu/schema'),
  ],
  providers: [
    Provider.ofInstance('ziqquratu.DatabaseConfig', databaseConfig),
    PostFactory,
    AuthorFactory,
  ],
  inject: ['ziqquratu.Database', PostFactory, AuthorFactory]
})
class CliApplication {
  private factories: Record<string, DocumentFactory> = {}

  public constructor(private database: Database, postFact: PostFactory, authorFact: AuthorFactory) {
    this.factories = {
      'articles': postFact,
      'authors': authorFact,
    }
  }

  public async createDocument(collectionName: string) {
    try {
      const collection = await this.database.collection(collectionName);
      const doc = await this.factories[collectionName].create()
      console.log(doc);
      await collection.insertOne(doc);
      console.log(`Successfully added document ${doc._id} to ${collectionName}`);
    } catch (err) {
      console.log(err.message);
    }
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
      await app.createDocument('articles');
    })

  const createAuthor = new Command();
  createAuthor
    .name('create-author')
    .description('create a new author')
    .action(async () => {
      await app.createDocument('authors');
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

