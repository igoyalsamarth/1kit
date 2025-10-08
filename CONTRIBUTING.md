# Contributing

Thanks for your interest in contributing to 1kit. We're happy to have you here.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to reach out to [@igoyalsamarth](https://x.com/igoyalsamarth).

## About this repository

This repository is a monorepo.

- We use [pnpm](https://pnpm.io) and [`workspaces`](https://pnpm.io/workspaces) for development.
- We use [Turborepo](https://turbo.build/repo) as our build system.
- We use [changesets](https://github.com/changesets/changesets) for managing releases.

## Structure

This repository is structured as follows:

```
apps
└── www
packages
├── 1kit
└── create-1kit-app
example
```

| Path                              | Description                              |
| --------------------------------- | ---------------------------------------- |
| `apps/www`                        | The Next.js application for the website. |
| `packages/1kit`                   | The `1kit` package. (currently empty)    |
| `packages/create-1kit-app`        | The `create-1kit-app` package.           |
| `example`                         | Used for development purposes.           |

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/your-username/1kit.git
```

### Navigate to project directory

```bash
cd 1kit
```

### Create a new Branch

```bash
git checkout -b my-new-branch
```

### Install dependencies

```bash
pnpm install
```

### Run a workspace

You can use the `pnpm --filter=[WORKSPACE]` command to start the development process for a workspace.

#### Examples

1. To run the `www` website:

```bash
pnpm --filter=www dev
```

2. To run the `create-1kit-app` package (inside `example` folder):

```bash
pnpm run create-1kit-app
```

## Running the CLI Locally

To run the CLI locally, you can follow the workflow:

Build and execute the `create-1kit-app` script locally inside the `example` folder:

   ```bash
   pnpm run create-1kit-app
   ```

This workflow ensures that you are running the most recent version of the registry and testing the CLI properly in your local environment.

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

  e.g. `feat(create-1kit-app): add next.js page router support`

If you are interested in the detailed specification you can visit [conventionalcommits.org](https://www.conventionalcommits.org) or check out the [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

*Also make sure that your `example` folder does not has any residues*

## Requests for new technologies

If you have a request for new technologies, please open a discussion on GitHub. We'll be happy to help you out.

## CLI

The `create-1kit-app` package is a CLI for select-and-setup of your project.

Any changes to the CLI should be made in the `packages/create-1kit-app` directory. If you can, it would be great if you could add tests for your changes.

## Testing

Tests are written using [Vitest](https://vitest.dev). You can run all the tests from the root of the repository.

```bash
pnpm test
```

Please ensure that the tests are passing when submitting a pull request. If you're adding new features, please include tests.
