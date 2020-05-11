$(function(){
    //加载页面头部
    $(".header_box").load('header.html',function(){
      main();
    });

  //邮箱验证：1、是否为空；2、格式是否正确；3、是否已被注册
  //密码验证：1、是否为空；2、长度是否正确；
  //重复密码：1、是否为空；2、长度是否正确；3、是否和密码1相同
  //手机验证：1、是否为空；2、格式是否正确；3、是否已被绑定
  $("#uname").blur(emailCheck);
  $("#upwd1").blur(pwdCheck);
  $("#upwd2").blur(pwd2Check);
  $("#phone").blur(phoneCheck);

  // 当用户点击复选框的时候，改变按钮的可用性
  $(".li_checkbox input").click(function () {
    // if (!$(this).prop("checked")) {
    //   $(".li_btn button").removeAttr("disabled");
    // } else {
    //   $(".li_btn button").attr("disabled","disabled");
    $(".li_btn button").prop("disabled",!$(this).prop("checked")).toggleClass("disabled");
  });


  //当点击提交注册按钮的时候
  $(".li_btn button").click(function(){
    var remail = emailCheck();
    var rpwd = pwdCheck();
    var rpwd2 = pwd2Check();
    var rphone = phoneCheck();
    
    if (remail&&rpwd&&rpwd2&&rphone) {
      // var json = {};
      // $("#uname,#upwd1,#upwd2").each(function () {
      //   json[$(this).attr('id')] = $(this).val();
      // });
      var uname = $.trim($("#uname").val());
      var upwd = $.trim($("#upwd1").val());
      var phone = $.trim($("#phone").val());
      
      $.ajax({
        type: "post",
        url: "data/user_register.php",
        data: {uname:uname,upwd:upwd,phone:phone},
        success: function (d) {
          if (d.code == 1) {
            sessionStorage.uid = d.uid;
            sessionStorage.uname = d.uname;
            alert("恭喜您注册成功，即将为您跳转到刚才页面！");
            history.go(-1);
          } 
        }
      })
    }
  });
 

  
  // 邮箱验证函数
  function emailCheck() {
    var uname = $.trim($("#uname").val());
    var regEmail = /^\w+([-.]\w+)*@\w+([-.\w+])*\.\w+([-.]\w+)*$/;
    if (!uname) {
      $("#uname").siblings("em").show().attr("class","icon_error");
      $("#uname").siblings('i').show().text("邮箱不能为空");
      return false;
    } else if (!regEmail.test(uname)) {
      $("#uname").siblings("em").show().attr("class","icon_error");
      $("#uname").siblings('i').show().text("邮箱格式不正确");
      return false;
    } else if (emailExist(uname)) {
      $("#uname").siblings("em").show().attr("class","icon_error");
      $("#uname").siblings('i').show().text("此邮箱已被注册");
      return false;
    } else {
      $("#uname").siblings('em').show().attr("class", "icon_ok");
      $("#uname").siblings('i').hide().text("此邮箱已被注册");
      return true;
    }
  };

  // 验证邮箱是否被注册
  function emailExist(uname) {
    var back = false;
    $.ajax({
      type: "post",
      url: "data/user_check_uname.php",
      date: {uname:uname},
      async: false,//ajax是异步的,return出来的是初始值
      success: function (d) {
        if (d.code == 1) {
          back = true;
        } else {
          back = false;
        }
      }
    });
    return back;
  };
   
  // 密码验证函数
  function pwdCheck() {
    var pwd = $.trim($("#upwd1").val());
    var pwdSize = pwd.length;
    if (!pwd) {
      $("#upwd1").siblings('em').show().attr("class", "icon_error");
      $("#upwd1").siblings('i').show().text("密码不能为空");
      return false;
    } else if (pwdSize<6||pwdSize>12) {
      $("#upwd1").siblings('em').show().attr("class", "icon_error");
      $("#upwd1").siblings('i').show().text("密码应为6-12个字符");
      return false;
    } else {
      $("#upwd1").siblings('em').show().attr("class", "icon_ok");
      $("#upwd1").siblings('i').hide().text("此手机号已被注册");
      return true;
    }
  } 

  // 重复密码验证函数
  function pwd2Check() {
    var pwd = $.trim($("#upwd1").val());
    var pwd2 = $.trim($("#upwd2").val());
    var pwd2Size = pwd2.length;
    if (!pwd2) {
      $("#upwd2").siblings('em').show().attr("class", "icon_error");
      $("#upwd2").siblings('i').show().text("密码不能为空");
      return false;
    } else if (pwd!=pwd2) {
      $("#upwd2").siblings('em').show().attr("class", "icon_error");
      $("#upwd2").siblings('i').show().text("两次密码不同");
      return false;
    } else if (pwd2Size<6||pwd2Size>12) {
      $("#upwd2").siblings('em').show().attr("class", "icon_error");
      $("#upwd2").siblings('i').show().text("密码应为6-12个字符");
      return false;
    } else {
      $("#upwd2").siblings('em').show().attr("class", "icon_ok");
      $("#upwd2").siblings('i').hide().text("此手机号已被注册");
      return true;
    }
  } 

  // 手机验证函数
  function phoneCheck() {
    var phone = $.trim($("#phone").val());
    var regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!phone) {
      $("#phone").siblings('em').show().attr("class", "icon_error");
      $("#phone").siblings('i').show().text("手机号不能为空");
      return false;
    } else if (!regPhone.test(phone)) {
      $("#phone").siblings('em').show().attr("class", "icon_error");
      $("#phone").siblings('i').show().text("手机号格式不正确");
      return false;
    } else if (phoneExist(phone)) {
      $("#phone").siblings('em').show().attr("class", "icon_error");
      $("#phone").siblings('i').show().text("此手机号已被其他用户绑定");
      return false;
    } else {
      $("#phone").siblings('em').show().attr("class", "icon_ok");
      $("#phone").siblings('i').hide().text("此手机号已被其他用户绑定");
      return true;
    }
  };
  // 验证手机是否被注册
  function phoneExist(phone) {
    var back = false;
    $.ajax({
      type: "post",
      url: "data/user_check_phone.php",
      date: {phone:phone},
      async: false,//ajax是异步的,return出来的是初始值
      success: function (d) {
        if (d.code == 1) {
          back = true;
        } else {
          back = false;
        }
      }
    });
    return back;
  };
  });


