import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';

export class CodeToImage implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Code To Image',
		name: 'codeToImage',
		icon: 'file:codetoimage.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Convert code snippets into beautiful syntax-highlighted images',
		defaults: {
			name: 'Code To Image',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'CodeToImageApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Generate',
						value: 'generate',
						action: 'Generate code image',
						description: 'Convert code to a syntax-highlighted image (SVG or PNG)',
						routing: {
							request: {
								method: 'POST',
								url: '/generate',
							},
						},
					},
				],
				default: 'generate',
			},
			{
				displayName: 'Code',
				name: 'code',
				type: 'string',
				typeOptions: {
					rows: 10,
				},
				required: true,
				default: '',
				description: 'The code snippet to convert to an image',
				routing: {
					request: {
						body: {
							code: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'options',
				options: [
					{ name: 'JavaScript', value: 'javascript' },
					{ name: 'TypeScript', value: 'typescript' },
					{ name: 'Python', value: 'python' },
					{ name: 'Java', value: 'java' },
					{ name: 'C', value: 'c' },
					{ name: 'C++', value: 'cpp' },
					{ name: 'C#', value: 'csharp' },
					{ name: 'Go', value: 'go' },
					{ name: 'Rust', value: 'rust' },
					{ name: 'Ruby', value: 'ruby' },
					{ name: 'PHP', value: 'php' },
					{ name: 'HTML', value: 'html' },
					{ name: 'CSS', value: 'css' },
					{ name: 'JSON', value: 'json' },
					{ name: 'YAML', value: 'yaml' },
					{ name: 'Markdown', value: 'markdown' },
					{ name: 'SQL', value: 'sql' },
					{ name: 'Bash/Shell', value: 'bash' },
				],
				default: 'javascript',
				description: 'Programming language for syntax highlighting',
				routing: {
					request: {
						body: {
							language: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Format',
				name: 'format',
				type: 'options',
				options: [
					{
						name: 'SVG',
						value: 'svg',
						description: 'Fast, scalable vector format',
					},
					{
						name: 'PNG',
						value: 'png',
						description: 'High quality raster format (2x retina)',
					},
				],
				default: 'svg',
				description: 'Output image format',
				routing: {
					request: {
						body: {
							format: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Theme',
				name: 'theme',
				type: 'options',
				options: [
					{ name: 'GitHub Dark', value: 'github-dark' },
					{ name: 'GitHub Light', value: 'github-light' },
					{ name: 'Dracula', value: 'dracula' },
					{ name: 'Monokai', value: 'monokai' },
					{ name: 'Nord', value: 'nord' },
					{ name: 'One Dark Pro', value: 'one-dark-pro' },
					{ name: 'Tokyo Night', value: 'tokyo-night' },
					{ name: 'Catppuccin Mocha', value: 'catppuccin-mocha' },
				],
				default: 'github-dark',
				description: 'Syntax highlighting theme',
				routing: {
					request: {
						body: {
							theme: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Background',
				name: 'background',
				type: 'string',
				default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				description: 'CSS background (gradient or color). Example: "#1a1a2e" or "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"',
				routing: {
					request: {
						body: {
							background: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Padding',
				name: 'padding',
				type: 'number',
				typeOptions: {
					minValue: 16,
					maxValue: 128,
				},
				default: 64,
				description: 'Padding in pixels (16-128 recommended)',
				routing: {
					request: {
						body: {
							padding: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Show Line Numbers',
				name: 'showLineNumbers',
				type: 'boolean',
				default: true,
				description: 'Whether to show line numbers',
				routing: {
					request: {
						body: {
							showLineNumbers: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Show Window Controls',
				name: 'showWindowControls',
				type: 'boolean',
				default: true,
				description: 'Whether to show macOS-style window controls',
				routing: {
					request: {
						body: {
							showWindowControls: '={{$value}}',
						},
					},
				},
			},
		],
	};
}
