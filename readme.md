# fis-parser-less-preprocessor

less文件编译之前预处理  
问题：less编译合并过程中合并顺序无法干涉，可能某些样式我们希望放在顶部或者某些自定义位置  
解决：1.在指定file.id的less文件中，import指定路径，达到干涉合并顺序的目的，被import的路径则可以不再参与fis的编译发布  
解决：2.在配置文件更新文件内容，更灵活更自由的任务配置

#### Install
```
npm i fis-parser-less-preprocessor -g
```


#### Setting
```javascript
fis.config.set('modules.parser.less', ['less-preprocessor', 'less']);
```

#### Config
```javascript
// 配置文件可以是单个对象
var config = {
	id: '/css/aio.less',
	// import指定路径，值可以是数组，指定多个import项，可选
	import: '/css/reset.less',
	// 自定义处理文件内容，可选
	fn: function(content){
		return content;
	}
}

// 配置文件也可以是一个数组
var configs = [config];

// configs, config二选一
fis.config.set('settings.parser.less-preprocessor', configs || config);
```
