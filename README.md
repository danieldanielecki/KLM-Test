# KLM Test

This is a test application for [KLM front-end case](https://bitbucket.org/afklmdevnet/frontend-case/src/master/). The core is based on [Angular](https://angular.io) in version 7.2.15, whilst UI elements are mostly based on [Angular Material](https://material.angular.io) version 7.3.7.

## Description

The application contains monorepo provided by [Nx](https://nx.dev/) workspace. Deployment has been done to Firebase with 2 different environments:

- [https://klm-test-prod.web.app/](https://klm-test-prod.web.app/) - production;
- [https://klm-test-dev.web.app/](https://klm-test-dev.web.app/) - development;

GitLab CI's [pipelines](https://gitlab.com/danieldanielecki/klm-test/pipelines) has been setted up, both for production and development. The production environment takes piplines from a master branch, whilst the second one from the development branch. The commits are semantic and try to keep master as clean as possible, with tags only on the master branch.

## Installation

Installation on local machine is typical as for Angular-based projects and goes as follow:

1. `git clone [https://gitlab.com/danieldanielecki/klm-test](https://gitlab.com/danieldanielecki/klm-test)`
2. `npm install`
3. `npm run serve`, or `ng serve`, (Angular CLI)[https://cli.angular.io/] is required.

Alternatively, you can run it if you have a Docker installed on your machine by typing running `docker-compose -f "docker-compose.yml" up -d --build` or simply opening the project in a Visual Studio and right click on the .docker-compose.yml with option "Compose Up".

## User Interface (UI)

Improvements for the UI are: sorting, filtering, accessibility functionalities, automatic translations, customization of font styles, pagination of results depending by user preference. Desktop version has sticky header (see in action when 25 or 100 items per page) in order for the user to simplify navigation.

Filtering initially has been achieved by creating a custom pipe, see commit: [dc221bc2](https://gitlab.com/danieldanielecki/klm-test/commit/dc221bc246b9c35be924b910ca93a1781c119ba0), but later on made in an easier way. Results of the filtering are displayed after 1 second, and avoids duplications if the previous search was the same. The accessibility plugin [Agastya](https://oswaldlabs.com/platform/agastya/) has some accessibility functionalities as well as automatically translates text due to its integration with Google Translate with Oswald Labs Platform APIs. In case if someone would like to use a screen reader, basic ARIA for flights is working and has been tested using [ChromeVox](https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en-GB).

Updates of the flights are updated every 1 minute using [RxJS](https://rxjs.dev/) without page reload, see [home.component.ts](https://gitlab.com/danieldanielecki/klm-test/blob/master/libs/home/src/lib/home/home.component.ts), lines: 44-51. The toolbar/sidenav (menu) is only to showcase lazy loading routing FeatureModule (in this case NotFoundModule) in the [Nx](https://nx.dev/). This is a little bit tricky, because we have to remember about tsconfig.app.json to define there absolute (!) path to the lazy loaded module, see [tsconfig.app.json](https://gitlab.com/danieldanielecki/klm-test/blob/master/apps/workspace-klm/tsconfig.app.json), line 8. The rest is relatively similar to the normal lazy loading technique.

## Source Code

The other typical for Angular modules are SharedModule and CoreModule. The first one is a place for shared functionalities or elements such as UI (e.g. Angular Material's components modules) and should be imported to every FeatureModule. Here, only HomeModule imports that, once again - it's only to showcase how to split modules correctly. CoreModule contains core logic used across the whole application, is imported only once - by AppModule, and someone would try to import it somewhere else then error will be thrown. Other useful commands are defined [package.json][https://gitlab.com/danieldanielecki/klm-test/blob/master/package.json].

The code tries to follow basic principles, such as DRY, SRP. These are for example meaningful (intention-revealing, pronounceable) names, small functions, avoiding of code smells However, of course it's not ideal. If there's no valid reason (e.g. something must be executed earlier) to put some definitions upper, then the code goes alphabetically.

Production version has 1.5MB (no Angular Ivy, unfortunately for some dependencies it didn't compile). Load time: 620 milliseconds - 820 millisecons.

## Pipelines

Pipelines for master and development are slightly different. Each of the pipelines has some tests, which are executes, and only if they pass the deployment stage comes. These are formatting (Code Quality), linting (SAST), unit tests, E2E tests and dependencies scanning in terms of known vulnerabilities (`npm audit`). Execution them on local machine is defined in [package.json](https://gitlab.com/danieldanielecki/klm-test/blob/master/package.json). Thus, the application have some basics tests written in [Jest](https://jestjs.io/) and [Cypress](https://www.cypress.io/). On the development branch the application is automatically deployed to [https://klm-test-dev.web.app/](https://klm-test-dev.web.app/) (staging), whilst on master the deployment to a production system must be done manually, and once it will be clicked it goes to [https://klm-test-prod.web.app/](https://klm-test-prod.web.app/). Such technique follows continuous delivery approach, not continuous deployment. For more details about GitLab CI please check [.gitlab-ci.yml](https://gitlab.com/danieldanielecki/klm-test/blob/master/.gitlab-ci.yml) file.

The API keys are stored in a folder, which is included in [.gitignore](https://gitlab.com/danieldanielecki/klm-test/blob/master/.gitignore), line 40, this is due to the [Twelve-Factor](https://12factor.net/config). For CI it's in the GitLab CI environmental variables. The logic for this is in [custom-webpack.config.js](https://gitlab.com/danieldanielecki/klm-test/blob/master/custom-webpack.config.js).

To do it, some changes were required, especially worth to notice is different configuration in the [angular.json](https://gitlab.com/danieldanielecki/klm-test/blob/master/angular.json) file, see commit: [87903b08](https://gitlab.com/danieldanielecki/klm-test/commit/87903b08eed4302ba1b3cda936e0a7f2bb4f46f0). However, still you can see them in the payload in the headers (Chrome Developer Tools -> Network -> Name -> Headers). Obviously you can argue that the client side keys don't have to be stored there, only the server side should be, but it's also a good point to have everything related to the API keys in 1 place. Of course, Firebase access token must be only in the environmental variables

## Bonus points

Responsiveness has been achieved using mostly [Angular-Flex Layout](https://github.com/angular/flex-layout) and a little bit of custom SCSS. Some of the directives are [Static API](https://github.com/angular/flex-layout/wiki/Declarative-API-Overview), whilst some [Responsive API](https://github.com/angular/flex-layout/wiki/Responsive-API). As a side note, there's an excellent project which shows how does it works: [demo](https://tburleson-layouts-demos.firebaseapp.com/#/docs). It's being used a little bit in different part of the application as well. The mobile version has card for each flight, thus it's also relatively easy to navigate.

## Debugging

If you would like to check how the application has been debugged, I left `console.log` in the development environment. Plus you can see how does it works:

- [https://klm-test-prod.web.app/](https://klm-test-prod.web.app/) - production, without logs;
- [https://klm-test-dev.web.app/](https://klm-test-dev.web.app/) - development, with logs;

## Remarks

1. "startRange" in the [technical documentation](https://developer.airfranceklm.com/docs/read/opendata/flight_status_api/method_reference/GET_flightstatus) is a bit confusing, the "Now" doesn't work, it could be better to write that it has to be in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. The same applies to "endRange".
2. "pageSize" can't take more than 100.
3. If you wouldn't see a "Help & Acessibility" it can be due to some antiviruses false positives, see [this issue](https://github.com/sockjs/sockjs-client/issues/300#issuecomment-208092544). My antivirus blocked the script loaded by ... [Cloudfront](https://aws.amazon.com/cloudfront/). If you wouldn't like to see any accessibility plugin please let me know.
4. Please use a modern browser, compatibiltiy table for used flexbox is [here](https://caniuse.com/#search=flexbox). In case of Internet Explorer would be used neither "justify-content: space-evenly" nor Grid Layout has not been used.
