import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CodeToImageApi implements ICredentialType {
	name = 'CodeToImageApi';

	displayName = 'Code To Image API';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your Code to Image API key. Get your API key from the JAAS dashboard at https://ctoi-apis.microapplab.com',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://1hsik4xyb5.execute-api.us-east-1.amazonaws.com/dev',
			description: 'The base URL of the Code to Image API (usually the default value)',
			placeholder: 'https://1hsik4xyb5.execute-api.us-east-1.amazonaws.com/dev',
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