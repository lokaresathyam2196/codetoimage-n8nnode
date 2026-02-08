import {
	NodeConnectionTypes,
	NodeApiError,
	type INodeType,
	type INodeTypeDescription,
	type IExecuteFunctions,
	type INodeExecutionData,
	type IHttpRequestOptions,
	type JsonObject,
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
		usableAsTool: true,
		credentials: [
			{
				name: 'codeToImageApi',
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
				description:
					'The code snippet to convert to an image. Supports multi-line code with proper formatting.',
				placeholder: 'function hello() {\n  console.log("Hello World!");\n}',
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'options',
				options: [
					{ name: 'Bash/Shell', value: 'bash' },
					{ name: 'C', value: 'c' },
					{ name: 'C#', value: 'csharp' },
					{ name: 'C++', value: 'cpp' },
					{ name: 'CSS', value: 'css' },
					{ name: 'Go', value: 'go' },
					{ name: 'HTML', value: 'html' },
					{ name: 'Java', value: 'java' },
					{ name: 'JavaScript', value: 'javascript' },
					{ name: 'JSON', value: 'json' },
					{ name: 'Markdown', value: 'markdown' },
					{ name: 'PHP', value: 'php' },
					{ name: 'Python', value: 'python' },
					{ name: 'Ruby', value: 'ruby' },
					{ name: 'Rust', value: 'rust' },
					{ name: 'SQL', value: 'sql' },
					{ name: 'TypeScript', value: 'typescript' },
					{ name: 'YAML', value: 'yaml' },
				],
				default: 'javascript',
				description:
					'Select the programming language for accurate syntax highlighting. Supports 18+ popular languages.',
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
					{ name: 'Catppuccin Mocha', value: 'catppuccin-mocha' },
					{ name: 'Dracula', value: 'dracula' },
					{ name: 'GitHub Dark', value: 'github-dark' },
					{ name: 'GitHub Light', value: 'github-light' },
					{ name: 'Monokai', value: 'monokai' },
					{ name: 'Nord', value: 'nord' },
					{ name: 'One Dark Pro', value: 'one-dark-pro' },
					{ name: 'Tokyo Night', value: 'tokyo-night' },
				],
				default: 'github-dark',
				description:
					'Choose from 8 popular syntax highlighting themes. Each theme provides professional, VSCode-quality syntax coloring.',
			},
			{
				displayName: 'Background',
				name: 'background',
				type: 'string',
				default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				description:
					'CSS background color or gradient. Examples: solid color "#1a1a2e", gradient "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", or "transparent".',
				placeholder: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
				description:
					'Padding around the code block in pixels. Recommended: 64px for balanced spacing (range: 16-128).',
			},
			{
				displayName: 'Show Line Numbers',
				name: 'showLineNumbers',
				type: 'boolean',
				default: true,
				description:
					'Whether to display line numbers on the left side of the code block for better reference',
			},
			{
				displayName: 'Show Window Controls',
				name: 'showWindowControls',
				type: 'boolean',
				default: true,
				description:
					'Whether to display macOS-style window controls (red, yellow, green dots) at the top of the code window',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('codeToImageApi');
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
				const options: IHttpRequestOptions = {
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
					returnFullResponse: true,
				};

				if (format === 'base64') {
					options.json = true;
				}

				const response = await this.helpers.httpRequest(options);

				// Handle response based on format
				let binaryData;
				const fileName = `code-${Date.now()}.${format === 'base64' ? 'png' : format}`;

				if (format === 'base64') {
					// Base64 format returns JSON with { data, mimeType, fileName }
					const jsonResponse = response.body as {
						data: string;
						mimeType?: string;
						fileName?: string;
					};
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
						: Buffer.from(response.body as ArrayBuffer);

					binaryData = await this.helpers.prepareBinaryData(buffer, fileName, 'image/png');
				} else {
					// SVG returns text
					const buffer = Buffer.isBuffer(response.body)
						? response.body
						: Buffer.from(response.body as string, 'utf8');

					binaryData = await this.helpers.prepareBinaryData(buffer, fileName, 'image/svg+xml');
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
					pairedItem: { item: i },
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
