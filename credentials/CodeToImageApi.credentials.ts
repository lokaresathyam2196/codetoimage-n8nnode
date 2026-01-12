import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CodeToImageApi implements ICredentialType {
	name = 'CodeToImageApi';

	displayName = 'Code To Image API. Visit https://codetoimage.microapplab.com to get oen';

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
			description: 'Your Code to Image API key. Get your API key from the CodeToImage dashboard at https://codetoimage.microapplab.com',
		}
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