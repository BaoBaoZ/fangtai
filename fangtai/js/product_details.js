$(function(){
    //加载页面头部
    $(".header_box").load('header.html',function(){
      main();
      navText("方太商城");
    });

    var str = location.href;
    var pid = str.substr(str.lastIndexOf('=')+1);


    $.ajax({
      type: "post",
      url: "data/product_detail.php",
      data: {pid : pid},
      success: function (p) {
        console.log(p);
        $(".pdinfo_img img").attr('src',p.pic);
        $(".pdinfo_text>h2").html(p.title1);
        var htmlText = '';
        htmlText = '<li>型号：'
                    +p.model
                    +'</li><li>功能：'
                    +p.func
                    +'</li><li>噪音：'
                    +p.noise
                    +'</li><li>出水量：'
                    +p.wind
                    +'</li><li>额定电压/频率/功率：'
                    +p.applyTo
                    +'</li><li>机身尺寸：'
                    +p.size
                    +'</li><li>净废比：'
                    +p.level
                    +'</li>';
        $(".pdinfo_text ul").html(htmlText);
        $("#price").html(p.price);
        $(".pd_details").html(p.detail);
      }
    });

    $("#addCart").click(function (e) {
      e.preventDefault();
      if (!sessionStorage.uid) {
        location.href = "login.html";
      } else {
        var uid = sessionStorage.uid;
        $.ajax({
          type: "post",
          url: "data/cart_detail_add.php",
          data: {uid:uid,pid:pid},
          success: function (d) {
            if (d.code==1) {
              alert("添加成功！");
              h_cartList();
            }
          }
        })
      }
    })
  });

  