<?php
/**
*验证用户名是否已经存在
*请求参数：
  uname-用户名
*输出结果：
* {"code":1,"msg":"exist"}  存在
* 或
* {"code":2,"msg":"non-exist"}  不存在
*/

require('init.php');

@$uname = $_REQUEST['uname'] or die('uname required');

$sql = "SELECT uid FROM mf_user WHERE uname = '$uname'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if ($row) {
    $output['code'] = 1;
    $ouyput['msg'] = 'exist';
} else {
    $output['code'] = 1;
    $ouyput['msg'] = 'no-exist';
};

echo json_encode($output);

