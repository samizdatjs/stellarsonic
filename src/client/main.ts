import {Aurelia, PLATFORM} from 'aurelia-framework';
import {container} from '@ziqquratu/ioc-aurelia';
import {caching} from '@ziqquratu/caching';
import {io} from '@ziqquratu/pipe';
import {
  bootstrap, component, http, DatabaseConfig, Provider
} from '@ziqquratu/ziqquratu';
import siteConfig from '../config';
import 'aurelia-animator-css';
import {AuthorListView, PostFeed, PostGenres, PostListView, PostView, SettingsView} from './views';
import {PostTransformer} from './lib';
import {editorConfig} from './editorConfig';

@component({
  providers: [
    PostView,
    PostFeed,
    PostGenres,
    AuthorListView,
    PostListView,
    SettingsView,
    Provider.ofInstance<DatabaseConfig>('ziqquratu.DatabaseConfig', {
      collections: {
        'articles': {
          source: http({path: '/api/posts'}),
          useBefore: [
            io(new PostTransformer())
          ],
        },
        'authors': http({path: '/api/authors'}),
        'settings': http({path: '/api/settings'}),
        'genres': http({path: '/api/genres'}),
        'tags': http({path: '/api/tags'}),
      },
      use: [caching()]
    }),
    Provider.ofInstance('disqus.Shortname', siteConfig.disqus),
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
    container.register(Provider.ofInstance('stellarsonic.EditorConfiguration', editorConfig));
  });

  PLATFORM.moduleName('themes/home-standard/home-standard.html');
  PLATFORM.moduleName('themes/musicplaylist-standard/musicplaylist-standard.html');

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('components/app'));
}
