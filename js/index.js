window.addEventListener("load", function () {
    var arrow_l = document.querySelector(".arrow-l");
    var arrow_r = document.querySelector(".arrow-r");
    var focus = document.querySelector(".focus");
    //鼠标经过focus显示/隐藏左右按钮
    focus.addEventListener("mouseenter", function () {
        arrow_l.style.display = "block";
        arrow_r.style.display = "block";
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener("mouseleave", function () {
        arrow_l.style.display = "none";
        arrow_r.style.display = "none";
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000)
    });
    //动态生成小圆圈，有几张图就生成几个小圆圈
    var ul = focus.querySelector("ul");
    var ol = focus.querySelector(".circle");
    var focusWidth = focus.offsetWidth;
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement("li");
        //通过自定义属性记录当前小圆圈的索引号
        li.setAttribute("index", i);
        ol.appendChild(li);
        //生成小圆圈的同时，绑定点击选中事件
        li.addEventListener("click", function () {
            //排他思想
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = "";
            }
            this.className = "current";
            //点击小li就拿到当前小li的index
            var index = this.getAttribute('index');
            //点击小圆圈移动图片
            num = index;
            circle = index;
            // console.log(focusWidth);
            slow(ul, -focusWidth * index);
        })
    }
    //默认选中第一个孩子
    ol.children[0].className = "current";
    //克隆第一张图片，放在最后,克隆位于生成小圆圈之后，故不会多生成小圆圈
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //点击右侧按钮，图片滚动
    var num = 0;
    var circle = 0;
    // flag 节流阀
    var flag = true;
    arrow_r.addEventListener("click", function () {
        if (flag) {
            flag = false;  //关闭节流阀

            // 走到最后一张图片，令ul的left=0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            slow(ul, -focusWidth * num, function () {
                flag = true;
            });
            circle++;
            // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    })
    //左侧按钮
    arrow_l.addEventListener("click", function () {
        if (flag) {
            flag = false;
            // 走到第一张图片
            // console.log(num);
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + "px";

            }
            num--;
            slow(ul, -focusWidth * num, function () {
                flag = true;
            });
            circle--;
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }

    })
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = "";
        }
        //留下当前小圆圈的类名
        ol.children[circle].className = "current";
    };
    var timer = setInterval(function () {
        arrow_r.click();
    }, 2000)

})