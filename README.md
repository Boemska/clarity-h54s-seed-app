![Clarity](logo.png)

H54S Clarity Seed App
============
This is a seed project for H54S Angular 2 applications using Clarity UI(https://github.com/vmware/clarity). For more information on the Clarity Design System, visit the [Clarity website](https://vmware.github.io/clarity/).

Getting started
----------------------------------

#### Angular-CLI version

This seed version provides the following out of the box:

- Angular 2 application with [clarity-icons](https://www.npmjs.com/package/@clr/icons), [clarity-ui](https://www.npmjs.com/package/@clr/ui) and [clarity-angular](https://www.npmjs.com/package/@clr/angular) included
- Development and production builds
- Unit test setup with Jasmine and Karma
- End-to-end test setup with Protractor
- SASS processor
- TSLint
- And other goodies that come with [Angular-CLI](https://github.com/angular/angular-cli#generating-and-serving-an-angular2-project-via-a-development-server) (v6.2.3)

## Installation
*Prerequisite*: Please install Angular-CLI by following [these instructions](https://github.com/angular/angular-cli#installation).

```bash
git clone git@builds.boemskats.com:nik/clarity-h54s-seed-app.git
# git clone https://github.com/vmware/clarity-seed.git

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


#### Project structure
* `package.json` is used by NPM to describe package, run scripts and manage dependencies .
* `angular.json` is used to de package, run scripts and manage dependencies .
* `.gitignore` used by Git to ignore files and directories
* `karma.conf.js` configuration of the test runner
* `tslint.json` sample configuration file for tslint
* `tsconfig.json` configuration of the typescript project
* `protractor.config.js` e2e tests configuration

Angular project is structured in modules.
* `app/boemska/alerts` - module with alert toolbar where you can see SAS or h54s errors logs.
* `app/boemska/logs` - module with debug window where you can see SAS errors and server requests.
* `app/boemska/login` - module which manages login.  
* `app/home` and `app/about` example modules for home and about routes
* `app/boemska/user-nav-dropdown` - module for top navigation bar with debug controls.


