![Clarity](logo.png)

H54S Clarity Seed App
============
This is a seed project for H54S Angular 2 applications using Clarity UI(https://github.com/vmware/clarity). For more information on the Clarity Design System, visit the [Clarity website](https://vmware.github.io/clarity/).

Getting started
----------------------------------

#### Angular-CLI version

This seed version provides the following out of the box:

- Angular 2 application with [clarity-icons](https://www.npmjs.com/package/clarity-icons), [clarity-ui](https://www.npmjs.com/package/clarity-ui) and [clarity-angular](https://www.npmjs.com/package/clarity-angular) included
- Development and production builds
- Unit test setup with Jasmine and Karma
- End-to-end test setup with Protractor
- SASS processor
- TSLint
- Semantic versioning (enabling automated release notes to be generated) - see [here](https://github.com/conventional-changelog/standard-version) for guidance on how to write commit messages that conform to the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) standard.
- And other goodies that come with [Angular-CLI](https://github.com/angular/angular-cli#generating-and-serving-an-angular2-project-via-a-development-server) (v1.0.0-beta.20-4)



#### Installation
*Prerequisite*: Please install Angular-CLI by following [these instructions](https://github.com/angular/angular-cli#installation).

```bash
git clone https://github.com/vmware/clarity-seed.git
cd clarity-seed

# install the project's dependencies
npm install

# starts the application in dev mode and watches your files for livereload
ng serve
```

#### Using Angular-CLI
```bash
# generating a new component
ng g component my-new-component

# generating a new directive
ng g directive my-new-directive

# to learn more about Angular-CLI commands and their usages
ng help
```

For comprehensive documentation on Angular-CLI, please see their [github repository](https://github.com/angular/angular-cli).

#### Test and build scripts

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

## Documentation

For documentation on the H54S library go to the [H54S Github page](https://github.com/Boemska/h54s)

For documentation on the Clarity Design System, including a list of components and example usage, see [our website](https://vmware.github.io/clarity).


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
├── angular-cli.json           <- configuration of the angular-cli
├── tsconfig.json              <- configuration of the typescript project
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

feat: A new feature
fix: A bug fix
docs: Documentation only changes
style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
refactor: A code change that neither fixes a bug nor adds a feature
perf: A code change that improves performance
test: Adding missing or correcting existing tests
chore: Changes to the build process or auxiliary tools and libraries such as documentation generation

The footer should contain any information about Breaking Changes and is also the place to reference issues that the commit closes.

Breaking Changes should start with the word BREAKING CHANGE: with a space or two newlines. The rest of the commit message is then used for this.

Example:

```
git commit -m "docs(readme): example commit

This format enables automatic release note generation!

closes #3"
```