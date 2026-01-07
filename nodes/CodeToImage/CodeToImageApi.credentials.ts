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
			baseURL: 'https://1hsik4xyb5.execute-api.us-east-1.amazonaws.com/dev',
			url: '/generate',
			method: 'POST',
			body: {
				code: 'console.log("test")',
				format: 'svg',
			},
		},
	};
}