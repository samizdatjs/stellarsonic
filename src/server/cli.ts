import * as chalk from 'chalk';
import * as figlet from 'figlet';
import * as inquirer from 'inquirer';
import { Command } from 'commander';
import { databaseConfig } from './databaseConfig';
import {bootstrap, component, Database, LogLevel, Provider} from '@ziqquratu/ziqquratu';
import {terminal} from '@ziqquratu/terminal';
import slugify from 'slugify';

const articleTemplate = {
  '@context': "https://schema.org",
  '@type': "MusicPlaylist",
  audio: {
    '@type': 'AudioObject',
    contentUrl: 'http://path/to/my/audio.mp3',
    duration: '0',
  },
  image: 'https://picsum.photos/800/600',
  categories: [],
  headline: '',
  tracks: [],
  author: '',
  dateCreated: new Date().toISOString(),
  datePublished: new Date().toISOString(),
  text: 'Article content goes here',
  palette: {
    dark: 'rgb(20, 20, 20)',
    primary: 'rgb(30, 30, 30)',
  }
}

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

  public async createAuthor(author: any) {
    console.log('app.createAuthor');
  }

  public async createPost() {
    try {
      const posts = await this.database.collection('articles');
      const data = await this.postInquiry()
      data._id = slugify(data.headline, {
        lower: true,
      });
      const post = Object.assign({}, articleTemplate, data);
      await posts.insertOne(post);
      console.log('Successfully created post: ' + post._id);
    } catch (err) {
      console.log(err.message)
    }
  }

  private postInquiry() {
    const questions = [
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
      await app.createAuthor({});
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

