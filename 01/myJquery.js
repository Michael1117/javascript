(function (window, undefined) {
    // $ 最常用的对象 返回给外界 大型程序开发 '_' 作为私有的对象 (规范)

    function _$(arguments) {
        // 实现代码...
        // 正则表达式匹配 id 选择器
        var idSelector = /#\w+/;
        this.dom;   // 此属性 接受所得到的元素
        // 如果匹配成功 则接受dom 元素  arguments[0] = '#inp'
        if(idSelector.test(arguments[0])){
            //this.dom = arguments[0].substring(1)
            this.dom = document.getElementById(arguments[0].substring(1))
        }else {
            throw new Error('arguments is error')
        }

    }
    // 在Function类上扩展一下可以实现链式编程的方法
    Function.prototype.method = function(methodName, fn) {
        this.prototype[methodName] = fn;

        return this;  // 链式编程的关键
    }


    // 在_$ 的原型对象上 加一个公共的方法

    _$.prototype = {
        constructor: _$,
        addEvent: function (type, fn) {
            //console.log('addEvent');
            // FF 给你得到的元素 注册事件
            if(window.addEventListener) {
                this.dom.addEventListener(type, fn)
            }else if(window.attachEvent){
                // IE
                this.dom.attachEvent('on' + type, fn)
            }
            return this;
        },
        setStyle: function (prop, val) {
            //console.log('setStyle');
            this.dom.style[prop] = val
            return this;
        }
    }
    // window 上先 注册一个全局变量  与外界产生联系

    window.$ = _$;
    // 写一个准备的方法
    _$.onReady = function (fn) {
        // 1 实例化出来_$ 对象 真正注册到 window 上
        window.$ = function () {
            return new _$(arguments)
        }
        // 2 执行传入进来的代码
        fn()

        // 3 实现链式编程
        _$.method('addEvent', function () {

        }).method('setStyle',function () {

        })

    }

})(window)

/*$(function () {
    // jquery 代码
})*/
