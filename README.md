# n8n-nodes-codetoimage

This is an n8n community node that converts code snippets into beautiful, syntax-highlighted images. Perfect for creating visual documentation, social media posts, presentations, and tutorials.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Features

- **Multiple Output Formats**: Generate SVG, PNG, or Base64-encoded images
- **18+ Programming Languages**: JavaScript, TypeScript, Python, Java, C, C++, C#, Go, Rust, Ruby, PHP, HTML, CSS, JSON, YAML, Markdown, SQL, Bash/Shell
- **8 Professional Themes**: GitHub Dark, GitHub Light, Dracula, Monokai, Nord, One Dark Pro, Tokyo Night, Catppuccin Mocha
- **Customizable Styling**:
  - Custom backgrounds (solid colors or CSS gradients)
  - Adjustable padding (16-128px)
  - Optional line numbers
  - Optional macOS-style window controls
- **VSCode-Quality Syntax Highlighting**: Powered by [Shiki](https://shiki.matsu.io/)
- **High Performance**: Fast generation with AWS Lambda backend
- **Quota Management**: Built-in API key authentication and usage tracking

## Installation

### Community Nodes (Recommended)

For users on n8n v0.187.0 or above:

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-codetoimage` in **Enter npm package name**
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes
5. Select **Install**

After installing the node, you can use it in your workflows.

### Manual Installation

To get started install the package in your n8n root directory:

```bash
npm install n8n-nodes-codetoimage
```

For Docker-based deployments, add the package to your `package.json` or install it in your Docker image.

## Getting Started

### 1. Get Your API Key

Before using the Code to Image node, you need an API key:

1. Visit the [Code to Image Dashboard](https://ctoi-apis.microapplab.com)
2. Sign up or log in to your account
3. Navigate to the API Keys section
4. Create a new API key for the "Code to Image" product
5. Copy your API key (keep it secure!)

### 2. Configure Credentials in n8n

1. In n8n, go to **Credentials > New**
2. Search for "Code To Image API"
3. Enter your credentials:
   - **API Key**: Paste your API key from the dashboard
   - **Base URL**: Use the default value (usually no need to change)
4. Click **Save**

### 3. Add the Node to Your Workflow

1. In your n8n workflow, click the **+** button
2. Search for "Code To Image"
3. Select the node and configure it
4. Select your credentials
5. Enter your code and customize the output

## Configuration Options

### Required Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| **Code** | The code snippet to convert | `function hello() { console.log("Hello!"); }` |
| **Credentials** | Your Code To Image API credentials | Select from saved credentials |

### Optional Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| **Language** | Dropdown | `javascript` | Programming language for syntax highlighting (18+ options) |
| **Format** | Dropdown | `svg` | Output format: SVG (scalable), PNG (raster), or Base64 (string) |
| **Theme** | Dropdown | `github-dark` | Syntax highlighting theme (8 options) |
| **Background** | String | `linear-gradient(135deg, #667eea 0%, #764ba2 100%)` | CSS background (color or gradient) |
| **Padding** | Number | `64` | Padding around code in pixels (16-128) |
| **Show Line Numbers** | Boolean | `true` | Display line numbers on the left |
| **Show Window Controls** | Boolean | `true` | Display macOS-style window controls (red, yellow, green dots) |

## Usage Examples

### Example 1: Basic JavaScript Code to SVG

```javascript
// Input
{
  "code": "const greeting = 'Hello, n8n!';\nconsole.log(greeting);",
  "language": "javascript",
  "format": "svg"
}

// Output: Binary data (SVG image)
```

### Example 2: Python Code with Custom Theme

```javascript
{
  "code": "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)",
  "language": "python",
  "format": "png",
  "theme": "dracula",
  "background": "#282a36",
  "showLineNumbers": true
}
```

### Example 3: Generate Base64 for API Integration

```javascript
{
  "code": "<div class=\"container\">\n  <h1>Hello World</h1>\n</div>",
  "language": "html",
  "format": "base64",
  "theme": "github-light",
  "background": "transparent"
}

// Returns JSON with base64-encoded PNG string
```

## Workflow Ideas

Here are some ways to use Code to Image in your n8n workflows:

### 1. Documentation Automation
- **Trigger**: On code change or schedule
- **Workflow**: Extract code snippets → Generate images → Upload to docs site
- **Use Case**: Automatically create visual code examples for documentation

### 2. Social Media Content
- **Trigger**: Schedule or webhook
- **Workflow**: Read code from file → Generate styled image → Post to Twitter/LinkedIn
- **Use Case**: Share code snippets as engaging visual content

### 3. Tutorial Generation
- **Trigger**: Manual or scheduled
- **Workflow**: Parse tutorial content → Extract code blocks → Generate images → Create PDF
- **Use Case**: Create beautiful programming tutorials with visual code examples

### 4. Code Review Notifications
- **Trigger**: PR webhook
- **Workflow**: Get code diff → Generate image of changes → Send to Slack/Discord
- **Use Case**: Visual code review notifications

### 5. Email Newsletter
- **Trigger**: Scheduled
- **Workflow**: Curate code examples → Generate images → Compose HTML email → Send
- **Use Case**: Weekly programming tips newsletter with syntax-highlighted examples

## Output Format Details

### SVG Format
- **Best for**: Web display, scalable graphics
- **File size**: Small (~10-50KB)
- **Quality**: Perfect at any scale
- **Browser support**: Excellent
- **Output**: Binary data (image/svg+xml)

### PNG Format
- **Best for**: Social media, presentations, print
- **Resolution**: 2x retina quality (high DPI)
- **File size**: Medium (~50-300KB depending on code length)
- **Quality**: Excellent, fixed resolution
- **Output**: Binary data (image/png)

### Base64 Format
- **Best for**: API integration, embedding in JSON/HTML
- **Encoding**: Base64-encoded PNG string
- **File size**: ~33% larger than PNG (due to encoding)
- **Quality**: Same as PNG
- **Output**: JSON object with `data`, `mimeType`, and `fileName`

## Supported Languages

| Language | Value | Language | Value |
|----------|-------|----------|-------|
| JavaScript | `javascript` | TypeScript | `typescript` |
| Python | `python` | Java | `java` |
| C | `c` | C++ | `cpp` |
| C# | `csharp` | Go | `go` |
| Rust | `rust` | Ruby | `ruby` |
| PHP | `php` | HTML | `html` |
| CSS | `css` | JSON | `json` |
| YAML | `yaml` | Markdown | `markdown` |
| SQL | `sql` | Bash/Shell | `bash` |

## Available Themes

| Theme | Value | Best For |
|-------|-------|----------|
| GitHub Dark | `github-dark` | General use, dark mode |
| GitHub Light | `github-light` | General use, light mode |
| Dracula | `dracula` | Purple/pink aesthetics |
| Monokai | `monokai` | Classic coding theme |
| Nord | `nord` | Cool, arctic colors |
| One Dark Pro | `one-dark-pro` | Popular VSCode theme |
| Tokyo Night | `tokyo-night` | Night-themed, blue tones |
| Catppuccin Mocha | `catppuccin-mocha` | Warm, mocha colors |

## Background Examples

```css
/* Solid Colors */
"#1a1a2e"
"#282a36"
"transparent"

/* Linear Gradients */
"linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
"linear-gradient(to right, #ff6b6b, #feca57)"
"linear-gradient(45deg, #12c2e9, #c471ed, #f64f59)"

/* Radial Gradients */
"radial-gradient(circle, #667eea 0%, #764ba2 100%)"
```

## Troubleshooting

### Node doesn't appear in n8n
- Restart n8n after installation
- Check that the package is installed in the correct n8n directory
- Verify the package version is compatible with your n8n version

### Authentication Error (401)
- Check that your API key is correct
- Verify the API key is active in the dashboard
- Ensure you're not exceeding your quota

### Quota Exceeded Error (429)
- Check your remaining quota in the dashboard
- Upgrade your plan if needed
- Monitor the `X-RateLimit-Remaining` header in responses

### Image Quality Issues
- For high-resolution needs, use PNG format
- Increase padding for better spacing
- Try different themes for better contrast
- Use SVG format for perfect scaling

### Empty or Invalid Images
- Verify your code syntax is valid for the selected language
- Check that the Base URL is correct in credentials
- Ensure the API service is running

## API Rate Limits

The Code to Image API uses quota-based rate limiting:

- **Free Tier**: 100 requests/month
- **Pro Tier**: 1,000 requests/month
- **Business Tier**: 10,000 requests/month
- **Enterprise**: Custom limits

Check your current quota in the [Dashboard](https://ctoi-apis.microapplab.com).

Response headers include:
- `X-RateLimit-Remaining`: Number of requests remaining in your quota

## FAQ

### Q: Can I use this node for free?
**A:** Yes! The service offers a free tier with 100 requests per month. Perfect for testing and small projects.

### Q: What happens if I exceed my quota?
**A:** You'll receive a 429 error. You can either wait for the quota to reset monthly or upgrade your plan.

### Q: Are there any file size limits?
**A:** The API can handle code snippets up to 100KB. For larger files, consider splitting into multiple images.

### Q: Is the service GDPR compliant?
**A:** Yes. The service doesn't store your code snippets. Images are generated on-demand and not persisted.

## Resources

- **[n8n Documentation](https://docs.n8n.io/)** - Learn more about n8n
- **[n8n Community Forum](https://community.n8n.io/)** - Get help and share your workflows
- **[Dashboard](https://ctoi-apis.microapplab.com)** - Manage your API keys and quotas
- **[npm Package](https://www.npmjs.com/package/n8n-nodes-codetoimage)** - View on npm

## Support

- **Community**: [n8n Community Forum](https://community.n8n.io/)
- **Email**: support@microapplab.com

## Version History

### 0.1.0 (Current)
- Initial release
- Support for 18+ programming languages
- 8 professional syntax highlighting themes
- Three output formats (SVG, PNG, Base64)
- Customizable styling options
- API integration
- Quota management

---

Powered by [n8n](https://n8n.io/) and [Shiki](https://shiki.matsu.io/)
