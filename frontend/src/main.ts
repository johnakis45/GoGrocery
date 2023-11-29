import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { FridgeModule } from './fridge/fridge.module';
import { environment } from './environments/environment';
import { Logger } from './app/global/utils/logger';
const logger: Logger = new Logger();
if (environment.production) {
  enableProdMode();
}

const currentUrl = window.location.href;
const isFridgeModule = currentUrl.includes('/fridge/');
const moduleToBootstrap = isFridgeModule ? FridgeModule : AppModule;

platformBrowserDynamic()
  .bootstrapModule(moduleToBootstrap)
  .catch(err => logger.error(err));
