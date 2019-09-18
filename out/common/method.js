"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
const glob = require("glob");
const fse = require("fs-extra");
function getTplName() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield vscode.window.showInputBox({
            value: '',
            placeHolder: '文件夹名称',
            validateInput: text => {
                return text ? null : '不能为空';
            }
        });
        return result;
    });
}
exports.getTplName = getTplName;
function getTplParams() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield vscode.window.showInputBox({
            value: '',
            placeHolder: '多参数请用空格分隔'
        });
        return result;
    });
}
exports.getTplParams = getTplParams;
function getParam() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield vscode.window.showInputBox({
            value: '',
            placeHolder: '路由title 是否隐藏tab(默认为true) 显示第几个tab(默认为0) ',
            validateInput: text => {
                return text ? null : '不能为空';
            }
        });
        return result;
    });
}
exports.getParam = getParam;
function getChoosePath() {
    return new Promise((resolve, reject) => {
        vscode.commands.executeCommand('copyFilePath').then(() => {
            vscode.env.clipboard.readText().then((copyPath) => {
                resolve(copyPath);
            });
        });
    });
}
exports.getChoosePath = getChoosePath;
function getRouteName(path) {
    const items = fs.readdirSync(path);
    return items;
}
exports.getRouteName = getRouteName;
function copyFiles(targetPath, choosePath) {
    // 获取模版下面所有的文件
    const files = glob.sync(`${choosePath}/**/*.*`);
    // 遍历所有文件
    files.forEach(file => fse.copySync(file, file.replace(choosePath, targetPath)));
}
exports.copyFiles = copyFiles;
//# sourceMappingURL=method.js.map