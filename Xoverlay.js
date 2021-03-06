/*
  Xoverlay 弹出层插件
  2017-3-3 练手作品
  By Linshuizhongying
 */
;
(function(window) {
    'use strict'

    // 跨浏览器事件兼容处理
    var EventUtil = {

        addHandler: function(element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false)
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler)
            } else {
                element["on" + type] = handler
            }

        },
        removeHandler: function(element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false)
            } else if (element.detachEvent) {
                element.detachEvent("on" + type, handler)
            } else {
                element["on" + type] = null
            }

        }

    }


    Xoverlay.prototype.extend = function(dest, source) {
        for (var prop in source) {
            // hasOwnProperty 是为了防止source的proto被遍历处理。
            // hasOwnProperty用于检查给定的属性在当前对象实例中(而不是在实例的原型中)是否存在
            if (source.hasOwnProperty(prop)) {
                dest[prop] = source[prop]
            }
        }
        return dest
    }


    function Xoverlay(options) {
        //载入配置

        this.options = this.extend(this.defaults, options)

        //初始化
        this.init()
    }
    // 默认配置
    Xoverlay.prototype.defaults = {
            'target': null,
            'width': 460,
            'height': 270,
            'title': null,
            'content': null,
            'ok': null,
            'cancel': null
        }
        //初始函数

    Xoverlay.prototype.init = function() {
        // 根据需求拼接字符串
        var layout = this.template()

        //如果有指定元素挂在指定元素上，不然则直接挂在body上

        if (this.options.target) {
            var target = document.querySelector(this.options.target)
            document.body.appendChild(layout)
            EventUtil.addHandler(target, "click", function() {
                document.getElementById("Xoverlay").style.display = "block"
            })

        } else {
            document.body.appendChild(layout)
            EventUtil.addHandler(document.body, "click", function(e) {

                document.getElementById("Xoverlay").style.display = "block"

            })
        }
        this.bindEvents();
    }
    Xoverlay.prototype.template = function() {
        var _title =
            '            <div class="overlay-header">' + this.options.title + '                <div id="overlay-close">X</div>' + '            </div>'
            // 如果指定了title那么页面加进去
        var title = this.options.title == null ? " " : _title

        var _content =
            '            <div class="overlay-content">' + this.options.content + '            </div>'
            // 如果指定了content那么加进去
        var content = this.options.content == null ? " " : _content

        var _ok = this.options.ok == null ? " " : '<button id="overlay-ok">确定</button>'
        var _cancel = this.options.cancel == null ? " " : '<button id="overlay-cancel">取消</button>'


        var footer = this.options.cancel && this.options.ok == null ? " " :
            '            <div class="overlay-footer">' + _ok + _cancel + '            </div>'

        var xoverlay = document.createElement('div')
        xoverlay.setAttribute("id", "Xoverlay")

        xoverlay.innerHTML =
            '        <div class="overlay-mask"></div>' + '        <div class="overlay-inner">' + title + content + footer + '        </div>'

        return xoverlay
    }


    Xoverlay.prototype.setWidth = function(number) {
        var width = document.getElementsByClassName('overlay-inner')[0]
        width.style.width = number + 'px'
        width.style.marginLeft = -number / 2 + 'px'
        return this
    }

    Xoverlay.prototype.setHeight = function(number) {
        var height = document.getElementsByClassName('overlay-inner')[0]
        height.style.height = number + 'px'
        height.style.marginTop = -number / 2 + 'px'
        return this
    }


    Xoverlay.prototype.bindEvents = function() {
        var overlay = document.getElementById("Xoverlay");
        var close = document.getElementById("overlay-close")
        var ok = document.getElementById("overlay-ok")
        var cancel = document.getElementById("overlay-cancel")
        var that = this
        if (this.options.title) {
            EventUtil.addHandler(close, "click", function(e) {
                e.preventDefault()
                e.stopPropagation()
                overlay.style.display = "none"

            })
        }
        if (this.options.ok) {
            EventUtil.addHandler(ok, "click", function(e) {
                e.preventDefault()
                e.stopPropagation()
                if (that.options.ok() != false) {
                    overlay.style.display = "none"
                }


            })
        }
        if (this.options.cancel) {
            EventUtil.addHandler(cancel, "click", function(e) {
                e.preventDefault()
                e.stopPropagation()
                    // 如果代码里有return false 那么阻止消失
                if (that.options.cancel() != false) {
                    overlay.style.display = "none"
                }

            })
        }
    }

    window.Xoverlay = Xoverlay
}(window));
