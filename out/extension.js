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
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs-extra");
const path = require("path");
const nunjucks = require("nunjucks");
const method_1 = require("./common/method");
nunjucks.configure('/');
// config 文件的路径
const pathConstantRoute = path.resolve(__dirname, '../nunjucks/constant-route.njk');
const pathStoreIndex = path.resolve(__dirname, '../nunjucks/store-index.njk');
function activate(context) {
    // 创建新的项目
    let project = vscode.commands.registerCommand('menu.newPeoject', () => __awaiter(this, void 0, void 0, function* () {
        if (!vscode.workspace.workspaceFolders) {
            vscode.window.showInformationMessage('请打开一个工作区');
            return;
        }
        try {
            // 用户右键选择的目录路径
            let targetPath = yield method_1.getChoosePath();
            // 取名
            const name = yield method_1.getTplName();
            if (!name) {
                return;
            }
            // 获取目标目录
            targetPath = path.join(targetPath, name);
            // 模版文件夹的路径
            const currentPath = path.resolve(__dirname, '../resource');
            // 复制文件
            method_1.copyFiles(targetPath, currentPath);
            // 修改文件内容
            const constantRoutePath = path.join(targetPath, 'constant/route.js');
            const constantRouteConent = fs.readFileSync(constantRoutePath).toString();
            // 更新文件内容
            fs.writeFileSync(constantRoutePath, constantRouteConent.replace('resource', name), 'utf-8');
            vscode.window.showInformationMessage('init success');
        }
        catch (error) {
            vscode.window.showInformationMessage(`创建失败：${error}`);
        }
    }));
    // 新增一个view
    let menu = vscode.commands.registerCommand('menu.newView', () => __awaiter(this, void 0, void 0, function* () {
        if (!vscode.workspace.workspaceFolders) {
            vscode.window.showInformationMessage('请打开一个工作区');
            return;
        }
        try {
            // 用户右键选择的目录路径
            let targetPath = yield method_1.getChoosePath();
            // 将路径以 / 进行分割
            let paths = targetPath.split(path.sep);
            // 判断当前点击的是否是 view 文件夹（目前仅支持右键 view 文件夹或 项目文件夹）
            let isView = paths.slice(-1)[0] === 'view';
            // 判断是否右键的 view 文件夹
            if (!isView) {
                // 如果右键的项目目录，则在路径上加上view
                targetPath = path.resolve(targetPath, 'view');
                // 更新 paths
                paths = targetPath.split(path.sep);
            }
            // 取名
            const name = yield method_1.getTplName();
            if (!name) {
                return;
            }
            // 获取参数
            const params = yield method_1.getTplParams();
            // 获取所有文件夹名字
            const routeName = method_1.getRouteName(targetPath);
            routeName.push(name);
            // 用于存储本地读取的配置
            let configs = [];
            // 检测当前是否有config文件。如果没有则进行初始化
            // if (fs.existsSync(config_path)){
            // 	// 读取配置
            // 	configs = fs.readJSONSync(config_path);
            // }
            // 当前右键项目中是否已经存在页面了
            // 将当前文件与配置进行比对更新
            if (routeName.length) {
                // 读取已经存的路由文件
                const routeContent = fs.readFileSync(path.resolve(targetPath, '../constant/route.js')).toString();
                const matches = routeContent.match(/\[(\s+.+\s)+\](?=;)/);
                // 用于解析已存在的路由对象
                let routes = [];
                // 太蠢了 后面用@babel/parser改掉
                if (matches) {
                    const _names = matches[0].match(/name:[^,]+/g) || [];
                    const _paths = matches[0].match(/path:[^,]+/g) || [];
                    _names.forEach((item, i) => {
                        const _name = item.match(/'([^']+)'/) || '';
                        const _path = _paths[i].match(/'([^']+)'/) || '';
                        routes.push({
                            name: _name[1],
                            path: _path[1]
                        });
                    });
                }
                routes.forEach((item) => {
                    // 用于标识当前文件在配置文件中是否已经存在
                    let isExists = false;
                    // 遍历数据配置
                    configs.forEach((m) => {
                        if (m.name === item.name) {
                            isExists = true;
                        }
                    });
                    // 如果当前不存在，则同步配置
                    if (!isExists) {
                        configs.push({
                            name: item.name,
                            path: item.path
                        });
                    }
                });
            }
            // 添加当前输入的文件名
            configs.push({
                name: name,
                path: '/' + name + (params ? '/:' + params.split(/\s+/).join('/:') : '')
            });
            // 更新配置文件
            // fs.writeFileSync(config_path, JSON.stringify(configs, null, 4));
            // 模版文件夹的路径
            const currentPath = path.resolve(__dirname, '../tpl/new');
            targetPath = path.join(targetPath, name);
            // 复制模板
            // copyFiles(targetPath, currentPath, currentPath, name);
            method_1.copyFiles(targetPath, currentPath);
            // 更新必要的文件
            // 获取当前项目名
            const projectName = paths.slice(-2)[0];
            const HTMLConstantRoute = nunjucks.render(pathConstantRoute, {
                configs,
                projectName
            });
            const HTMLStoreIndex = nunjucks.render(pathStoreIndex, { configs });
            // 更新对应的文件
            // 获取文件路径
            const targetPathConstantRoute = path.resolve(targetPath, '../../constant/route.js');
            const targetPathStoreIndex = path.resolve(targetPath, '../../store/index.js');
            const targetPathApi = path.resolve(targetPath, `../../api/${name}.js`);
            // 更新文件内容
            fs.writeFileSync(targetPathConstantRoute, HTMLConstantRoute, 'utf-8');
            fs.writeFileSync(targetPathStoreIndex, HTMLStoreIndex, 'utf-8');
            // 创建一个文件
            fs.ensureFileSync(targetPathApi);
            vscode.window.showInformationMessage('init success');
        }
        catch (error) {
            vscode.window.showInformationMessage(`添加失败：${error}`);
        }
    }));
    context.subscriptions.push(menu, project);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map