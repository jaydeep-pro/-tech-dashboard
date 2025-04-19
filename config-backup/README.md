# Configuration Setup Instructions

## VS Code Setup
1. Install VS Code
2. Install these extensions:
   - Prettier (esbenp.prettier-vscode)
   - ESLint (dbaeumer.vscode-eslint)
3. Copy vscode-settings.json to your VS Code settings:
   - Windows: %APPDATA%\Code\User\settings.json
   - Mac: ~/Library/Application Support/Code/User/settings.json

## Prettier Setup
1. Copy prettier-config.json to .prettierrc in your project root
2. Copy prettier-ignore.txt to .prettierignore in your project root
3. Install Prettier:
   ```bash
   npm install --save-dev prettier
   ```

## Project Setup
1. Copy package.json to your project root
2. Install dependencies:
   ```bash
   npm install
   ```

## Additional Steps
1. Create .vscode directory in your project root
2. Copy vscode-settings.json to .vscode/settings.json
3. Run formatting:
   ```bash
   npm run format
   ```
