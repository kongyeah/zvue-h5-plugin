import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
import * as fse from 'fs-extra';

export async function getTplName() {
	const result = await vscode.window.showInputBox({
		value: '',
		placeHolder: '文件夹名称',
		validateInput: text => {
			return text ? null : '不能为空';
		}
	});
	return result;
}

export async function getTplParams() {
	const result = await vscode.window.showInputBox({
		value: '',
		placeHolder: '多参数请用空格分隔'
	});
	return result;
}

export async function getParam() {
	const result = await vscode.window.showInputBox({
		value: '',
		placeHolder: '路由title 是否隐藏tab(默认为true) 显示第几个tab(默认为0) ',
		validateInput: text => {
			return text ? null : '不能为空';
		}
	});
	return result;
}

export function getChoosePath(): Promise<string>{
	return new Promise((resolve, reject)=> {
		vscode.commands.executeCommand('copyFilePath').then(() => {
			vscode.env.clipboard.readText().then((copyPath) => {
				resolve(copyPath);
			});
		});
	});
}

export function getRouteName(path: string) {
	const items = fs.readdirSync(path);
	return items;
}

export function copyFiles(targetPath: string, choosePath: string){
	// 获取模版下面所有的文件
	const files = glob.sync(`${choosePath}/**/*.*`);
	// 遍历所有文件
	files.forEach(file => fse.copySync(file, file.replace(choosePath, targetPath)));
 }
