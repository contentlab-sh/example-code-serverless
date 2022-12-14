# Contentlab Example: Code to run Contentlab as a serverless function

This repository contains example code for [Contentlab](https://github.com/contentlab-sh/contentlab), the
Git- and GraphQL-based content engine.

---

# Running Contentlab

An application using Contentlab should be built with two Git repositories:
* A code repository to hold the application code
* A content repository to hold the content model (schema) and content entries

This example repository holds application code.

## Development

1. Run `npm install`
1. Obtain a GitHub "personal access token (classic)" according to the
   [GitHub documentation](https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#authenticating-with-graphql)
   from [here](https://github.com/settings/tokens). Make sure to select the top-level scope `repo`.
1. Get the repository owner and repository name for your **content** repository.

   For example, a repository at `https://github.com/contentlab-sh/example-code-serverless` has owner `contentlab-sh` and
   repository name `example-code-serverless`.
1. Copy `.env.yaml.dist` to `.env.yaml` and fill in your project path and access token.
1. Compile your code with `npm run build` (and do so again after every code change).
1. Run your [serverless](https://www.serverless.com/framework/docs/getting-started) functions locally with
   `npm run serverless`.

The GraphQL endpoint is then available under [http://localhost:3000/main/graphql](http://localhost:3000/main/graphql)
and the generated GraphQL schema as plaintext under
[http://localhost:3000/main/schema](http://localhost:3000/main/schema) (where `main` is the name of a valid branch
in your **content** repository).

## Production

To deploy, adjust `serverless.yml` to your needs or use the Contentlab hosted offering (coming soon).
