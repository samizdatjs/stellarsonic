import {Aurelia, PLATFORM} from 'aurelia-framework';
import {container} from '@ziqquratu/ioc-aurelia';
import {caching} from '@ziqquratu/caching';
import {io} from '@ziqquratu/pipe';
import {
  bootstrap, component, http, DatabaseConfig, Provider
} from '@ziqquratu/ziqquratu';
import 'aurelia-animator-css';
import {AuthorListView, PostFeed, PostGenres, PostListView, PostView, SettingsView, PagesView} from './views';
import {PostTransformer} from './lib';

@component({
  providers: [
    PostView,
    PostFeed,
    PostGenres,
    AuthorListView,
    PostListView,
    SettingsView,
    PagesView,
    Provider.ofInstance<DatabaseConfig>('ziqquratu.DatabaseConfig', {
      collections: {
        'articles': {
          source: http({path: '/api/posts'}),
          useBefore: [
            io(new PostTransformer()),
          ],
        },
        'authors': http({path: '/api/authors'}),
        'pages': http({path: '/api/pages'}),
        'theme-settings': http({path: '/api/theme-settings'}),
        'genres': http({path: '/api/genres'}),
        'tags': http({path: '/api/tags'}),
      },
      use: [caching()]
    }),
    Provider.ofInstance('stellarsonic.Themes', ['standard', 'saiph'])
  ],
})
export class Application {}

export async function configure(aurelia: Aurelia): Promise<void> {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin(PLATFORM.moduleName("aurelia-animator-css"), (cfg: any) => cfg.useAnimationDoneClasses = true);

  await bootstrap(Application, {
    container: container(aurelia.container)
  }, async container => {
    if (process.env.NODE_ENV === 'development') {
      const editorConfModule = await import('./editorConfig');
      container.register(Provider.ofInstance('stellarsonic.EditorConfiguration', editorConfModule.editorConfig));
    }
    container.register(Provider.ofInstance('stellarsonic.Environment', process.env.NODE_ENV))
  });

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('components/app'));
}
