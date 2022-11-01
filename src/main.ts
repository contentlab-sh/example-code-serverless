import { APIGatewayProxyEventV2, Callback, Context, Handler } from 'aws-lambda'
import { getApiService } from '@contentlab/contentlab'
import { createAdapter } from '@contentlab/git-adapter-gitlab'

export const graphql: Handler = async (
  event: APIGatewayProxyEventV2,
  context: Context,
  callback: Callback,
) => {
  const adapter = createAdapter()
  await adapter.setRepositoryOptions({
    projectPath: process.env.GITLAB_PROJECT_PATH,
    token: process.env.GITLAB_PERSONAL_ACCESS_TOKEN,
  })
  const api = await getApiService()
  const response = await api.postGraphQL(
    adapter,
    event.pathParameters['ref'],
    JSON.parse(event.body),
  )

  const body = {
    data: response.data,
    errors: response.errors,
  }
  return {
    body: JSON.stringify(body),
    statusCode: 200,
    headers: {
      'content-type': 'application/graphql+json',
      'X-Ref': response.ref,
    },
  }
}

export const schema: Handler = async (
  event: APIGatewayProxyEventV2,
  context: Context,
  callback: Callback,
) => {
  const adapter = createAdapter()
  await adapter.setRepositoryOptions({
    projectPath: process.env.GITLAB_PROJECT_PATH,
    token: process.env.GITLAB_PERSONAL_ACCESS_TOKEN,
  })
  const api = await getApiService()
  const response = await api.getSchema(adapter, event.pathParameters['ref'])

  return {
    body: response.data,
    statusCode: 200,
    headers: {
      'content-type': 'application/graphql+json',
      'X-Ref': response.ref,
    },
  }
}
