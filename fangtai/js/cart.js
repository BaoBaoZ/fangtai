$(function(){
    //加载页面头部
    $(".header_box").load('header.html',function(){
        main();
    });

    // 判断用户是否未登录，如果未登录，提示
    // 判断用户购物车是否有数据，如果没有，提示
    // 显示购物车列表
    // 进行运算

    // 删除商品
    $(".cartcon_list").on('click', '.remove', function () {
        var thisLi = $(this).parent();
        var did = thisLi.attr("data-did");//获取did
        $.ajax({
            type: "post",
            url: "data/cart_detail_delete.php",
            data: {did:did},
            success: function (d) {
                if (d.code == 1) {//删除成功
                   cartList();
                   h_cartList();
                }
            }
        });
    });

    // 更新数量
    $(".cartcon_list").on('click', '.operation span', function () {
        var did = $(this).parents("li").attr('data-did');
        var pid = $(this).parents("li").attr('data-pid');
        var n;//表示数量
        if ($(this).is(".minus")) {//减号
            if ($(this).siblings("input").val() == 1) return;
            n = $(this).siblings("input").val() - 1;
        } else {//加号
            n = parseInt($(this).siblings("input").val()) + 1;
        };
        $.ajax({
            type: "post",
            url: "data/cart_detail_update.php",
            data: {did:did, pid:pid, count:n},
            success: function (d) {
                if (d.code == 1) {
                    cartList();
                    h_cartList();
                }
            }
        });
    });


    if (sessionStorage.uid)  {
        cartList();
    };

    function cartList() {
        //获取购物车信息
        $.ajax({
            type: "post",
            url: "data/cart_detail_select.php",
            data: {uid:sessionStorage.uid},
            success: function (d) {
                // console.log(d);
                if (d.products.length == 0) {
                    $(".cartcon_list").html('<h2>购物车中没有任何商品！马上去<a href="product.html">产品中心</a>挑选心爱的东西吧！</h2>');
                    $(".cart_header em").html( 0 );
                    $(".cart_header strong").html((0.00).toFixed(2));
                } else {
                    var htmlText = '<ul>';
                    var data = d.products;
                    var count = 0;//商品总件数
                    var priceSum = 0;//商品总金额
                    for (var i=0; i<data.length; i++) {
                        var priceS = data[i].price * data[i].count;
                        htmlText += '<li data-did="'
                                    +data[i].did
                                    +'" data-pid="'
                                    +data[i].pid
                                    +'"><input type="checkbox" class="cart_checkbox"/><a href="" class="cart_img"><img src="'
                                    +data[i].pic
                                    +'" alt=""/></a><a href="" class="cart_title">'
                                    +data[i].title1
                                    +'</a><i>¥'
                                    +data[i].price
                                    +'</i><div class="operation"><span class="minus">-</span><input type="text" value="'
                                    +data[i].count
                                    +'"/><span class="add">+</span></div><strong>¥'
                                    + priceS.toFixed(2)
                                    +'</strong><em class="remove"></em></li>';
                        count += parseInt(data[i].count);
                        priceSum += priceS;
                    }
                    htmlText += '</ul>';
                    $(".cartcon_list").html(htmlText);
                    $(".cart_header em").html(count);
                    $(".cart_header strong").html(priceSum.toFixed(2));
                }
            }
        });
    }
});
