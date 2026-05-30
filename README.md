# ai-git-commit

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)
![Gemini](https://img.shields.io/badge/Powered%20by-Gemini%202.5%20Flash-4285F4?style=flat-square&logo=google&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![npm](https://img.shields.io/npm/v/@konstantin-bs/ai-git-commit?style=flat-square&logo=npm&logoColor=white)

A CLI tool that generates commit messages from your staged changes using Google Gemini AI.

## Demo

```
$ git add .
$ ai-commit
feat: add user authentication with JWT and refresh token support
```

## Prerequisites

- Node.js 18+
- A [Google Gemini API key](https://aistudio.google.com/app/apikey) (free)

## Installation

```bash
npm install -g @konstantin-bs/ai-git-commit
```

## Setup

Run the init command and paste your Gemini API key when prompted:

```bash
ai-commit init
```

## Usage

Stage your changes, then run:

```bash
git add .
ai-commit
```

The generated message is printed to the terminal — copy and use it:

```bash
git commit -m "your generated message here"
```

To skip the manual step and commit automatically:

```bash
ai-commit --auto
```

To list all existing commands:

```bash
ai-commit --help
```

## Language

By default commit messages are generated in English. To change the language:

```bash
ai-commit lang
```

Supported languages: `en` `de` `es` `fr` `zh` `pt` `ja`

## How it works

1. Reads your staged diff via `git diff --cached`
2. Sends it to Gemini 2.5 Flash with a prompt to generate a concise commit message
3. Prints the result

## License

MIT
