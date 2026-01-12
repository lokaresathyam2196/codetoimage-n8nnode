import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class CodeToImageApi implements ICredentialType {
	name = 'codeToImageApi';

	displayName = 'Code To Image API';

	documentationUrl = 'https://codetoimage.microapplab.com';

	icon: Icon = {
		light: 'file:../nodes/CodeToImage/codetoimage.svg',
		dark: 'file:../nodes/CodeToImage/codetoimage_dark.svg',
	};

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
			description:
				'Your Code to Image API key. Get your API key from the CodeToImage dashboard at https://codetoimage.microapplab.com',
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
