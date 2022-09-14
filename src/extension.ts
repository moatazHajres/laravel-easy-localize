// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
// The module 'fs' contains the Node JS File System API
import * as fs from 'node:fs';

// this method is called when the extension is activated
// the extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "laravel-easy-localize" is now active!');

	// The command has been defined in the package.json file
	// implementation of the command with registerCommand
	// The commandId parameter matches the command field in package.json
	let disposable = vscode.commands.registerCommand('laravel-easy-localize.localize', async () => {
		// The code you place here will be executed every time the registered command is executed

		// gets the localize of the first workspace folder
		const wsPath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			// Get the word within the selection
			const word = document.getText(selection);

			if (word) {

				const arrayKey = await getArrayKeyInputFromUser();
				const localizeFilePath = prepareFileDir(wsPath);
				const fileContent = readFileContent(localizeFilePath);

				if (!keyExists(fileContent, arrayKey)) {

					if (addNewTranslation(fileContent, localizeFilePath, arrayKey, word)) {

						const directive = getTranslationDirective(arrayKey);
	
						editor.edit(editBuilder => {
							editBuilder.replace(selection, directive);
						});
						
						vscode.window.showInformationMessage('Translation Added !');

						const saved = await document.save();
	
						if (!saved) {
							vscode.window.showInformationMessage("couldn't save localize.php file.");
						}
					}
				}

			} else {
				vscode.window.showInformationMessage('No Text Selected !');
			}
		}
	});

	context.subscriptions.push(disposable);
}

// Get translation array key from user
async function getArrayKeyInputFromUser(): Promise<string | undefined> {
	const result = await vscode.window.showInputBox({
		value: '',
		placeHolder: 'Localization Key, For example: welcome_heading',
		ignoreFocusOut: true,
		validateInput: text => {
			return text ? null : 'array key is required !';
		},

	});

	return result;
}

// make '/resources/ar/localize.php' directory if doesn't exists & open file for appending
function prepareFileDir(wsPath: string | undefined): string {

	const arabicDir = wsPath + "\\resources\\lang\\ar";
	const localizeFilePath = arabicDir + "\\localize.php";

	try {
		fs.mkdirSync(arabicDir, { recursive: true });
		fs.openSync(localizeFilePath, 'a');


		return localizeFilePath;

	} catch (e: any) {
		vscode.window.showErrorMessage("couldn't create new directory !");
		vscode.window.showErrorMessage(e.message);

		throw (e);
	}
}

// read from '/resources/ar/localize.php' file if exists & check if valid 
function readFileContent(localizeFilePath: string): Array<string> {
	try {
		let resourceContent = fs.readFileSync(localizeFilePath, 'utf8');

		if (!resourceContent || !validLangFile(resourceContent)) {
			resourceContent = "<?php\n\n return [ \n];";
		}

		const arrayContent = resourceContent.substring(resourceContent.indexOf('[') + 1, resourceContent.indexOf(']')).split(',');

		return arrayContent;

	} catch (e: any) {
		vscode.window.showErrorMessage("couldn't read file content");
		vscode.window.showErrorMessage(e.message);

		throw (e);
	}
}

// add new translation key to '/resources/ar/localize.php' 
function addNewTranslation(content: Array<string>, localizeFilePath: string, arrayKey: string | undefined, arrayValue: string): boolean {

	const result = content + `\t'${arrayKey}' => '${arrayValue}',`;
	
	try {
		fs.writeFileSync(localizeFilePath, "<?php\n\n return ["+result+"\n];");

		return true;

	} catch (e: any) {
		vscode.window.showErrorMessage("couldn't write file content !");
		vscode.window.showErrorMessage(e.message);
				
		return false;
	}
}

// get the blade directive/php method to output after translation
function getTranslationDirective(arrayKey: string | undefined): string {

	const currentFileType = vscode.window.activeTextEditor?.document.languageId;
	
	if (currentFileType === 'blade') {
		return `@lang('localize.${arrayKey}')`;
	}

	return `__('localize.${arrayKey}')`;
}

// check if translation array key already exists
function keyExists(array: Array<string>, key: string = ''): boolean {

	if (key && array.find(k => k.includes(`${key}`))) {
		vscode.window.showInformationMessage(`'${key}' already exists !`);

		return true;
	}

	return false;
}

// check if '/resources/ar/localize.php' is a valid lang file
function validLangFile(content: string): boolean {
	if(content) {
		let valid = content.includes('<?php') && content.includes('return [') && content.includes('];');

		if(valid) {
			return true;
		}
	}

	return false;
}

// this method is called when your extension is deactivated
export function deactivate() { }
