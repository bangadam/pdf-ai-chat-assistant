# PDF AI Chat Assistant

[![License](https://img.shields.io/github/license/bangadam/pdf-ai-chat-assistant)](LICENSE)
[![Stars](https://img.shields.io/github/stars/bangadam/pdf-ai-chat-assistant)](https://github.com/bangadam/pdf-ai-chat-assistant/stargazers)
[![Forks](https://img.shields.io/github/forks/bangadam/pdf-ai-chat-assistant)](https://github.com/bangadam/pdf-ai-chat-assistant/network/members)
[![Issues](https://img.shields.io/github/issues/bangadam/pdf-ai-chat-assistant)](https://github.com/bangadam/pdf-ai-chat-assistant/issues)

## Overview

The **PDF AI Chat Assistant** is an advanced tool built with Next.js, enabling users to interact with their PDF documents through natural language. This application is perfect for professionals, students, and researchers who need to query and analyze large documents quickly and accurately. The project requires Ollama to be installed locally, utilizing the LLaMA 3.1 model for processing.

## Features

- **Interactive PDF Querying:** Engage in real-time conversations with your PDFs, asking questions and receiving precise answers.
- **Built with Next.js:** Leverages the power of Next.js for a fast, scalable, and user-friendly interface.
- **Local Ollama Integration:** Uses the LLaMA 3.1 model through a locally installed Ollama setup for enhanced document analysis.
- **Multi-language Support:** Capable of handling PDFs in various languages, making it versatile for global use.

## Getting Started

### Prerequisites

- Node.js 14.x or later
- NPM or Yarn
- Ollama installed locally
- LLaMA 3.1 model set up in Ollama

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/bangadam/pdf-ai-chat-assistant.git
   cd pdf-ai-chat-assistant
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Ollama:**

   - Install Ollama locally following the instructions on the [Ollama website](https://ollama.com).
   - Download and set up the LLaMA 3.1 model in your local Ollama installation.

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

After setting up the application, you can upload a PDF and start interacting with it via the chat interface. The AI, powered by the LLaMA 3.1 model, will respond to your queries based on the content of the document, providing insights and extracting relevant information.

## Deployment

To deploy the application, you can use platforms like Vercel, which seamlessly integrates with Next.js.

1. **Deploy with Vercel:**
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/bangadam/pdf-ai-chat-assistant)

2. **Ollama Setup:**
   Ensure that Ollama is installed and the LLaMA 3.1 model is available on the deployment environment.

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for more information on how to get involved.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

Special thanks to the Next.js and Ollama communities for providing the tools and frameworks that make this project possible.

## Contact

For any inquiries or support, please open an issue on GitHub or contact us via [email](mailto:bangadam.dev@gmail.com).
