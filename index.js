var fs = require('fs');
var path = require('path');

module.exports = function(content, file, conf){
	var arr = [];

	// 判断配置项是数组
	if(Array.isArray(conf.config)){
		arr = conf.config;
	}

	// 判断配置项是单一对象
	if(typeof conf.config === 'object' && conf.config.id){
		arr = [conf.config];
	}

	// 处理配置文件
	arr.forEach(function(config){
		if(config.id === file.id){
			content = compile(content, config);
		}
	})

	return content;
}

// 编译自定义规则
function compile(content, config) {

	// 处理import
	if(config.import){
		// 处理数组
		if(Array.isArray(config.import)){
			config.import.forEach(function(filepath){
				content = imports(content, filepath)
			})
		}

		// 处理字符串
		else if(typeof config.import === 'string'){
			content = imports(content, config.import)
		}
	}
	
	// 处理自定义函数
	if(config.fn){
		content = config.fn(content)
	}

	return content;
}

// 处理import
function imports(content, filepath) {
	return '@import "' + filepath + '";\n' + content;
}