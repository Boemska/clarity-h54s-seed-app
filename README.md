<img src="src/images/clarity_logo.png" height="80"/><img src="src/images/boemska_logo.png" height="80"/><img src="src/images/angular_logo.png" height="80"/>


Boemska Seed App
============
Enterprise Apps have never looked so good, or been built so fast!  The Boemska Seed App accelerates app development by standardising on UX design ([Clarity](https://github.com/vmware/clarity)), JavaScript framework ([Angular](https://angular.io/)) and SAS connectivity tools ([h54s](https://github.com/Boemska/h54s)).


This seed version provides the following out of the box:

- Angular 7 application with [clarity-icons](https://www.npmjs.com/package/@clr/icons), [clarity-ui](https://www.npmjs.com/package/@clr/ui) and [clarity-angular](https://www.npmjs.com/package/@clr/angular) included
- Development and production builds
- Unit test setup with Jasmine and Karma
- End-to-end test setup with Protractor
- SASS processor
- TSLint
- Semantic versioning (enabling automated release notes to be generated) - see [here](https://github.com/conventional-changelog/standard-version) for guidance on how to write commit messages that conform to the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) standard.
- And other goodies that come with [Angular-CLI](https://github.com/angular/angular-cli#generating-and-serving-an-angular2-project-via-a-development-server).

Getting started
----------------------------------
#### Installation
*Prerequisite*: Please install [Angular-CLI]by following [these instructions](https://github.com/angular/angular-cli#installation).

```bash
git clone https://github.com/Boemska/clarity-h54s-seed-app
cd clarity-h54s-seed-app

# install the project's dependencies
npm install

# starts the application in dev mode and watches your files for livereload
ng serve
```

### h54s settings

First thing to do after cloning repository and `npm install` (installing dependecies) is h54s setup.
Go to `app/boemska/h54s.config.ts`.

```
export const AdapterSettings = {
  metadataRoot: '/metadata/root/path',
  hostUrl: 'http://example.com/'
}
```
 For more information go to https://github.com/Boemska/h54s

## Using h54s inside angular-clarity seed app
For documentation on the H54S library go to the [H54S Github page](https://github.com/Boemska/h54s)

This is an example of how to create a service call with the following  (sample) program path:
```
try {
  const res = await this._adapterService.call('users/getUser', data);
  console.log(res);
} catch(err) {
  // TODO: handle error
  console.log(err);
}

```
`this._adapterService` is an instance of `src/app/boemska/adapter.service.ts` which is where the h54s.js files are included. It is instanced in the component constructor:
```
constructor(private _adapterService: AdapterService) { }
```
previously `AdapterService` is imported:
```
import { AdapterService } from '../boemska/adapter.service';
```
`this._adapterService` has two primary methods for connecting to SAS - one for creating data (in the right format), and another for calling the service. The data method is optional, and was not used in the previous example (above).

To create data use `this._adapterService.createTable()` method and send it using `this._adapterService.call()` method. Example:

```
const data = this._adapterService.createTable([
  {
    "uri": "A5RIITO4.B500000D"
  },
  {
    "uri": "A5RIITO4.AG0001MX"
  }
], 'SendURI');


try {
  const res = await this._adapterService.call('User/getDetails', data);
  console.log(res);
} catch(err) {
  // TODO: handle error
  console.log(err);
}
```
In this case code is created (service call) using Boemska's AppFactory, which have JS code generation feature for vanila JS and angular both.

### Using Angular-CLI
```bash
# generating a new component
ng g component my-new-component

# generating a new directive
ng g directive my-new-directive

# to learn more about Angular-CLI commands and their usages
ng help
```

For comprehensive documentation on Angular-CLI, please see their [github repository](https://github.com/angular/angular-cli).

### Test and build scripts

```bash
# running unit tests
ng test

# running e2e tests
ng e2e

# dev build
ng build

# prod build
ng build --prod
```

### Documentation

For documentation on the H54S library go to the [H54S Github page](https://github.com/Boemska/h54s)

For documentation on the Clarity Design System, including a list of components and example usage, see [their web site](https://vmware.github.io/clarity).


#### Directory structure
```
.
├── README.md

├── karma.conf.js              <- configuration of the test runner
├── package.json               <- dependencies of the project
├── protractor.config.js       <- e2e tests configuration
├── src/                       <- source code of the application
│   ├── app/
│   │   └── component/
│   │       └── <component>.component.html
│   │       └── <component>.component.scss
│   │       └── <component>.component.spec.ts
│   │       └── <component>.component.ts
│   │   └── app.component.html
│   │   └── app.component.scss
│   │   └── app.component.ts
│   │   └── app.e2e-spec.js    <- sample e2e spec file
│   │   └── app.module.ts
│   │   └── app.routing.ts
│   │   └── main.ts            <- boostrap file for the angular app
│   └── index.html
└── tslint.json                <- sample configuration file for tslint
```

#### GIT Commit Guidelines

Per angular spec: https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits

Each commit message should consist of a header, a body and an optional footer. The header has a special format that includes a type, a scope and a subject:
```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The type should be one of the following:

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing or correcting existing tests
- chore: Changes to the build process or auxiliary tools and libraries such as documentation generation

The footer should contain any information about Breaking Changes and is also the place to reference issues that the commit closes.

Breaking Changes should start with the word BREAKING CHANGE: with a space or two newlines. The rest of the commit message is then used for this.

Example:

```
git commit -m "docs(readme): example commit

This format enables automatic release note generation!

closes #3"
```
