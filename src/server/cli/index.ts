import * as chalk from 'chalk';
import * as figlet from 'figlet';
import { Command } from 'commander';
import { databaseConfig } from './databaseConfig';
import {bootstrap, component, LogLevel, Provider} from '@ziqquratu/ziqquratu';
import {terminal} from '@ziqquratu/terminal';
import {CreatePostCommand, PostFactory} from './postFactory';
import {AuthorFactory, CreateAuthorCommand} from './authorFactory';
import {CliCommand} from './common';

@component({
  dependencies: [
    import('@ziqquratu/nabu'),
    import('@ziqquratu/schema'),
  ],
  providers: [
    Provider.ofInstance('ziqquratu.DatabaseConfig', databaseConfig),
    PostFactory,
    AuthorFactory,
    CreatePostCommand,
    CreateAuthorCommand,
  ],
  inject: [CreatePostCommand, CreateAuthorCommand]
})
class CliApplication {
  private commands: CliCommand[];

  public constructor(createPost: CliCommand, createAuthor: CliCommand) {
    this.commands = [createPost, createAuthor];
  }

  public run(args: any) {
    const program = new Command();
    program
      .name('stellarsonic-cli')
      .usage('Usage information')
      .version('0.7.1')

    for (const c of this.commands) {
      console.log(c);
      const command = new Command();
      command
        .name(c.name)
        .description(c.description)
        .action(async () => await c.action())
      program.addCommand(command);
    }
    
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

