import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CodeToImageApi implements ICredentialType {
	name = 'CodeToImageApi';

	displayName = 'Code To Image API';

	documentationUrl = 'https://github.com/lokaresathyam2196/codetoimage-n8nnode';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Your Code to Image API key from JAAS',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://your-lambda-url.execute-api.us-east-1.amazonaws.com/dev',
			description: 'The base URL of your Code to Image Lambda API',
			placeholder: 'https://abc123.execute-api.us-east-1.amazonaws.com/dev',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials?.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.baseUrl}}',
			url: '/generate',
			method: 'POST',
			body: {
				code: 'console.log("test")',
				format: 'svg',
			},
		},
	};
}