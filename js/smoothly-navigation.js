!function(){
//导航栏点击缓动跳转对应位置

var view= document.querySelector('nav.menu')

var controller= {
    view: null,
    aTags: null,
    init: function(view){
        this.view = view
        this.initanimation()
        this.bindEvents()
    },
    initanimation: function(){
        function animate(time) {
            requestAnimationFrame(animate);
            TWEEN.update(time);
        }
        requestAnimationFrame(animate);
    },
    scrollToElement: function(element){
        let top = element.offsetTop
        var targetTop = top - 80
        var currentTop = window.scrollY
        var s = targetTop - currentTop  //s路程
        var coords = { y: currentTop }  //起始位置
        var t = Math.abs((s / 100) * 300) //时间
        if (t >= 500) {
            t = 500
        }
        var tween = new TWEEN.Tween(coords) //起始位置
            .to({ y: targetTop }, t)  //结束位置 和时间
            .easing(TWEEN.Easing.Quadratic.InOut)  //缓动类型
            .onUpdate(function () {
                console.log(coords.y) //coords.y已经变了
                window.scrollTo(0, coords.y) //如何更新界面，coords.y是 Tween计算的
            })
            .start(); //开始缓动
    },
    bindEvents: function(){
        let aTags= this.view.querySelectorAll('nav.menu > ul > li > a')
        for (let i = 0; i < aTags.length; i++) {
            aTags[i].onclick = (x)=> {
                x.preventDefault()
                let a = x.currentTarget
                let href = a.getAttribute('href')
                let element = document.querySelector(href)
                this.scrollToElement(element)//传参到scrollElement
                
            }
        }
    }
}

controller.init(view)




}.call()