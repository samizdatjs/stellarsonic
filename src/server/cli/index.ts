import * as chalk from 'chalk';
import * as figlet from 'figlet';
import { Command } from 'commander';
import { databaseConfig } from './databaseConfig';
import {bootstrap, component, Database, LogLevel, Provider} from '@ziqquratu/ziqquratu';
import {terminal} from '@ziqquratu/terminal';
import {PostFactory} from './postFactory';
import {AuthorFactory} from './authorFactory';
import {DocumentFactory} from './common';

@component({
  dependencies: [
    import('@ziqquratu/nabu'),
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
      await collection.insertOne(doc);
      console.log(`Successfully added document ${doc._id} to ${collectionName}`);
    } catch (err) {
      console.log(err.message);
    }
  }

  public run(args: any) {
    const program = new Command();

    const createPost = new Command();
    createPost
      .name('create-post')
      .description('create a new post')
      .action(async () => await this.createDocument('articles'))

    const createAuthor = new Command();
    createAuthor
      .name('create-author')
      .description('create a new author')
      .action(async () => await this.createDocument('authors'))

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
    program.parse(args)
  }
}

bootstrap(CliApplication, {
  logLevel: LogLevel.Error,
  logFormat: terminal(),
}).then(app => app.run(process.argv))

