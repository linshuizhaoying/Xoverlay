# Xoverlay


  Xoverlay 弹出层插件
  2017-3-3 练手作品
  By Linshuizhongying
 

# 使用方法

```

	var Xoverlay = new Xoverlay({
	    target:'#test',
		title:"6666",
		ok:function(){console.log('233')},
		cancel:function(){console.log("cancel");return false},
		content:"This is Content2"
	}).setWidth(460).setHeight(400)

```

# 支持功能

Beta1.0：

支持链式调用

支持设置以下参数:

1.width

2.height

3.弹出层标题title,有title自定义添加x符号

4.弹出层内容content

5.添加Ok事件自动添加Ok按钮

6.添加cancel事件自动添加cancel按钮

# 后续功能待开发

## 1.重复绑定

## 2.弹窗后点击按钮再弹窗

## 3.遮罩层细化配置

# 第一版演示效果:

![imgn](http://haoqiao.qiniudn.com/Xoverlay.gif)
