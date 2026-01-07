import {
	NodeConnectionTypes,
	type INodeType,
	type INodeTypeDescription,
	type IExecuteFunctions,
	type INodeExecutionData,
} from 'n8n-workflow';

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
						description: 'Convert code to a syntax-highlighted image (SVG, PNG, or Base64)',
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
			},
			{
				displayName: 'Format',
				name: 'format',
				type: 'options',
				options: [
					{
						name: 'SVG',
						value: 'svg',
						description: 'Fast, scalable vector format (binary data)',
					},
					{
						name: 'PNG',
						value: 'png',
						description: 'High quality raster format (2x retina, binary data)',
					},
					{
						name: 'Base64',
						value: 'base64',
						description: 'PNG as base64 string (for API integration)',
					},
				],
				default: 'svg',
				description: 'Output image format',
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
			},
			{
				displayName: 'Background',
				name: 'background',
				type: 'string',
				default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				description: 'CSS background (gradient or color). Example: "#1a1a2e" or "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"',
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
			},
			{
				displayName: 'Show Line Numbers',
				name: 'showLineNumbers',
				type: 'boolean',
				default: true,
				description: 'Whether to show line numbers',
			},
			{
				displayName: 'Show Window Controls',
				name: 'showWindowControls',
				type: 'boolean',
				default: true,
				description: 'Whether to show macOS-style window controls',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('CodeToImageApi');
		const baseUrl = 'https://1hsik4xyb5.execute-api.us-east-1.amazonaws.com/dev';

		for (let i = 0; i < items.length; i++) {
			try {
				// Get parameters
				const code = this.getNodeParameter('code', i) as string;
				const language = this.getNodeParameter('language', i) as string;
				const format = this.getNodeParameter('format', i) as string;
				const theme = this.getNodeParameter('theme', i) as string;
				const background = this.getNodeParameter('background', i) as string;
				const padding = this.getNodeParameter('padding', i) as number;
				const showLineNumbers = this.getNodeParameter('showLineNumbers', i) as boolean;
				const showWindowControls = this.getNodeParameter('showWindowControls', i) as boolean;

				// Make HTTP request
				const response = await this.helpers.request({
					method: 'POST',
					url: `${baseUrl}/generate`,
					headers: {
						'Content-Type': 'application/json',
						'X-API-Key': credentials.apiKey as string,
					},
					body: {
						code,
						language,
						format,
						theme,
						background,
						padding,
						showLineNumbers,
						showWindowControls,
					},
					json: format === 'base64', // Parse JSON for base64 format
					encoding: format === 'base64' ? 'utf8' : null, // Binary for SVG/PNG
					resolveWithFullResponse: true,
				});

				// Handle response based on format
				let binaryData;
				const fileName = `code-${Date.now()}.${format === 'base64' ? 'png' : format}`;

				if (format === 'base64') {
					// Base64 format returns JSON with { data, mimeType, fileName }
					const jsonResponse = response.body;
					const base64Data = jsonResponse.data;
					const buffer = Buffer.from(base64Data, 'base64');

					binaryData = await this.helpers.prepareBinaryData(
						buffer,
						jsonResponse.fileName || fileName,
						jsonResponse.mimeType || 'image/png',
					);
				} else if (format === 'png') {
					// PNG returns binary data
					const buffer = Buffer.isBuffer(response.body)
						? response.body
						: Buffer.from(response.body, 'binary');

					binaryData = await this.helpers.prepareBinaryData(
						buffer,
						fileName,
						'image/png',
					);
				} else {
					// SVG returns text
					const buffer = Buffer.from(response.body as string, 'utf8');

					binaryData = await this.helpers.prepareBinaryData(
						buffer,
						fileName,
						'image/svg+xml',
					);
				}

				// Return as binary data
				returnData.push({
					json: {
						fileName: binaryData.fileName,
						mimeType: binaryData.mimeType,
						fileSize: binaryData.fileSize,
					},
					binary: {
						data: binaryData,
					},
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
