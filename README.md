<h1 align="center">
  <br>
  <a href="https://marketplace.visualstudio.com/items?itemName=moatazHajres.laravel-easy-localize">
    <img src="./resources/logo_icon.png" width="100" height="100">
  </a>
  <br>
    Laravel Easy Localize
  <br>
</h1>


a VS Code Extension for Easily Localize any blade/php text in any Laravel project.

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=moatazHajres.laravel-easy-localize">
    <img src="https://badgen.net/vs-marketplace/v/moatazHajres.laravel-easy-localize" alt="Version">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=moatazHajres.laravel-easy-localize">
    <img src="https://badgen.net/vs-marketplace/i/moatazHajres.laravel-easy-localize" alt="Installs">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=moatazHajres.laravel-easy-localize">
    <img src="https://badgen.net/vs-marketplace/rating/moatazHajres.laravel-easy-localize" alt="Ratings">
  </a>
</p>

## Features

- Custom array key for each translation.
- Auto detect duplicated array keys.
- Auto detect current file type to replace selection with the proper directive/method.
- Auto creation of lang/ar/localize.php directory if doesn't exists (arabic localization by default, but localize.php can be re-used).
- Auto detect invalid localize.php & auto re-create the file.

## Usage

![demo](./resources/demo.gif)

## Settings

You may configure the following settings (`Settigs` -> `Extensions` -> `Laravel Eazy Localize`): 

* `Language Folder`: Lang Directory Folder to save translations to (`ar` by default).
* `Target File Name`: Target Translation file name (`localize` by default).

## Current Limitations & Future Work

- ~~It only reads & writes to /resources/lang/ar/localize.php file, cannot select custom location~~ ✅.
- No support for nested array keys (ex: key1.key2).
- maybe replace .php lang files with JSON lang files which will help make lang file validation more accurate + easier to parse & write to.
- prompt to user to select which lang file to write to with default option available if none is selected.  
- you tell me.

## Release Notes

### 1.0.0

- Initial release.

### 1.0.1

- Fixed 'undefined' array key bug.

### 1.0.2

- Edited README md.

### 1.1.2

- Added extension settings to specify Lang folder name & target translation file name.
