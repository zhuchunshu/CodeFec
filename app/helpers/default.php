<?php

use App\Models\User;
use App\Models\Plugin;
use Illuminate\Support\Str;
use App\Handlers\Models\Node;
use App\Handlers\QuanxianBan;
use App\Handlers\Models\Links;
use App\Handlers\Models\Topic;
use App\Handlers\Models\Options;
use App\Handlers\Models\UserLog;
use App\Handlers\HelpersHandlers;
use App\Handlers\Models\PostsLike;
use App\Handlers\Models\UserGroup;
use App\Handlers\Models\Posts_Type;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use App\Handlers\Models\PostsComment;
use Illuminate\Support\Facades\Route;

function route_class()
{
    return str_replace('.', '-', Route::currentRouteName());
}

function dian_($text)
{
    return str_replace('.', '-', $text);
}

function route_name()
{
    return Route::currentRouteName();
}

//辅助函数
function Helpers()
{
    return new HelpersHandlers();
}

/**
 * 用户组CURD
 *
 * @return object
 */
function Curd_UserGroup()
{
    return new UserGroup();
}

/**
 * 通过email获取用户头像
 *
 * @param string $email
 * @return void
 */
function avatar(string $email)
{
    return 'https://cdn.vpsdie.com/avatar/' . md5($email) . "?codefec=" . date("Ymd");
}

/**
 * 权限鉴定
 *
 * @param integer $quanxian 权限数字
 * @return object
 */
function CodeFec_Quanxian(int $quanxian = null)
{
    return new QuanxianBan($quanxian);
}

/**
 * 用户操作日志log
 *
 * @return object
 */
function Curd_UserLog()
{
    return new UserLog();
}

/**
 *
 * Options Curd
 */
function Curd_Options()
{
    return new Options();
}

function Curd_Node()
{
    return new Node();
}

function Curd_Links()
{
    return new Links();
}

function Curd_PostsType()
{
    return new Posts_Type();
}

function descriptions($content)
{
    $content = str_replace("#", "", $content);
    $content = str_replace("*", "", $content);
    $content = str_replace("[", "", $content);
    $content = str_replace("]", "", $content);
    $content = str_replace("`", "", $content);
    $content = str_replace("'", "", $content);
    $content = str_replace('"', "", $content);
    $content = str_replace(' ', "", $content);
    $content = str_replace("\n", ",", $content);
    $content = str_replace("\r", "", $content);
    $content = str_replace(",,", ",", $content);
    return $content;
}


function format_date($time)
{
    $t = time() - strtotime($time);
    $f = array(
        '31536000' => '年',
        '2592000' => '个月',
        '604800' => '星期',
        '86400' => '天',
        '3600' => '小时',
        '60' => '分钟',
        '1' => '秒'
    );
    foreach ($f as $k => $v) {
        if (0 != $c = floor($t / (int)$k)) {
            return $c . $v . '前';
        }
    }
}

function Json_API($code, $message = "success", $data = "成功!")
{
    return response()->json([
        'code' => $code,
        'message' => $message,
        'data' => $data,
    ]);
}
function Api_Json($code, $message = "success", $data = "成功!")
{
    return json_encode(
        [
            'code' => $code,
            'message' => $message,
            'data' => $data,
        ]
    );
}

function Curd_PostsLike()
{
    return new PostsLike();
}

function Curd_PostsComment()
{
    return new PostsComment();
}

// T楼时间计算
function Tlou_time($date)
{
    $int = (strtotime($date) - time()) / 86400;
    if ($int <= 0) {
        return true;
    } else {
        return false;
    }
}

function Curd_Topic()
{
    return new Topic();
}

function get_options_setting($name, $default = null)
{
    return Curd_Options()->Read_name($name, 'setting', $default);
}
function get_options_setting_count($name)
{
    return Curd_Options()->Count_name($name, 'setting');
}

function get_options_image($name, $default = null)
{
    return Curd_Options()->Read_name($name, 'image', $default);
}

function count_options_library($name)
{
    return Curd_Options()->Count_name($name, 'library');
}

function insert_options_library($name, $value)
{
    return Curd_Options()->Insert($name, $value, "library");
}

// 百度提交
function baidu_push($url)
{
    if (!count_options_library($url, null)) {
        if (get_options_setting('baidu_url') && get_options_setting('baidu_token')) {
            $urls = array(
                $url
            );
            $api = 'http://data.zz.baidu.com/urls?site=' . get_options_setting('baidu_url') . '&token=' . get_options_setting('baidu_token');
            $ch = curl_init();
            $options =  array(
                CURLOPT_URL => $api,
                CURLOPT_POST => true,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_POSTFIELDS => implode("\n", $urls),
                CURLOPT_HTTPHEADER => array('Content-Type: text/plain'),
            );
            curl_setopt_array($ch, $options);
            $result = curl_exec($ch);
            insert_options_library($url, date("Y-m-d H:i:s"));
        }
    }
}

// 切换白天状态
function theme_qiehuan_ri()
{
    session(['theme.riye' => 'light']);
}

// 切换夜间状态
function theme_qiehuan_ye()
{
    session(['theme.riye' => 'dark']);
}

// 读取主题日夜状态

function theme_riye()
{
    return session('theme.riye', 'light');
}


function getPath($path)
{
    if (!is_dir($path)) {
        return false;
    }
    $arr = array();
    $data = scandir($path);
    foreach ($data as $value) {
        if ($value != '.' && $value != '..') {
            $arr[] = $value;
        }
    }
    return $arr;
}

function user_avatars($email, $img = null)
{
    if ($img) {
        return $img;
    } else {
        return avatar($email);
    }
}

// 从markdown中获取第一张图片
function get_one_img($content)
{
    $pattern = "/\]\((.*?(?<=png|svg|gif|jpg|jpeg))\)/";
    preg_match_all($pattern, $content, $matchContent);
    if (isset($matchContent[1][0])) {
        $temp = $matchContent[1][0];
    } else {
        $temp = get_options_image('topic_bc', '/assets/images/topic_bc.jpg');
    }
    return $temp;
}

function read_file($file_path)
{
    if (file_exists($file_path)) {
        $str = File::get($file_path);
        return $str;
    } else {
        return null;
    }
}

// 去端口
function _port($text)
{
    $text = Str::before($text, ':');
    $text = str_replace('www.', '', $text);
    return $text;
}
function exhtml($descclear)
{
    $descclear = str_replace("\r", "", $descclear); //过滤换行
    $descclear = str_replace("\n", "", $descclear); //过滤换行
    $descclear = str_replace("\t", "", $descclear); //过滤换行
    $descclear = str_replace("\r\n", "", $descclear); //过滤换行
    $descclear = preg_replace("/\s+/", " ", $descclear); //过滤多余回车
    $descclear = preg_replace("/<[ ]+/si", "<", $descclear); //过滤<__("<"号后面带空格)
    $descclear = preg_replace("/<\!--.*?-->/si", "", $descclear); //过滤html注释
    $descclear = preg_replace("/<(\!.*?)>/si", "", $descclear); //过滤DOCTYPE
    $descclear = preg_replace("/<(\/?html.*?)>/si", "", $descclear); //过滤html标签
    $descclear = preg_replace("/<(\/?head.*?)>/si", "", $descclear); //过滤head标签
    $descclear = preg_replace("/<(\/?meta.*?)>/si", "", $descclear); //过滤meta标签
    $descclear = preg_replace("/<(\/?body.*?)>/si", "", $descclear); //过滤body标签
    $descclear = preg_replace("/<(\/?link.*?)>/si", "", $descclear); //过滤link标签
    $descclear = preg_replace("/<(\/?form.*?)>/si", "", $descclear); //过滤form标签
    $descclear = preg_replace("/cookie/si", "COOKIE", $descclear); //过滤COOKIE标签
    $descclear = preg_replace("/<(applet.*?)>(.*?)<(\/applet.*?)>/si", "", $descclear); //过滤applet标签
    $descclear = preg_replace("/<(\/?applet.*?)>/si", "", $descclear); //过滤applet标签
    $descclear = preg_replace("/<(style.*?)>(.*?)<(\/style.*?)>/si", "", $descclear); //过滤style标签
    $descclear = preg_replace("/<(\/?style.*?)>/si", "", $descclear); //过滤style标签
    $descclear = preg_replace("/<(title.*?)>(.*?)<(\/title.*?)>/si", "", $descclear); //过滤title标签
    $descclear = preg_replace("/<(\/?title.*?)>/si", "", $descclear); //过滤title标签
    $descclear = preg_replace("/<(object.*?)>(.*?)<(\/object.*?)>/si", "", $descclear); //过滤object标签
    $descclear = preg_replace("/<(\/?objec.*?)>/si", "", $descclear); //过滤object标签
    $descclear = preg_replace("/<(noframes.*?)>(.*?)<(\/noframes.*?)>/si", "", $descclear); //过滤noframes标签
    $descclear = preg_replace("/<(\/?noframes.*?)>/si", "", $descclear); //过滤noframes标签
    $descclear = preg_replace("/<(i?frame.*?)>(.*?)<(\/i?frame.*?)>/si", "", $descclear); //过滤frame标签
    $descclear = preg_replace("/<(\/?i?frame.*?)>/si", "", $descclear); //过滤frame标签
    $descclear = preg_replace("/<(script.*?)>(.*?)<(\/script.*?)>/si", "", $descclear); //过滤script标签
    $descclear = preg_replace("/<(\/?script.*?)>/si", "", $descclear); //过滤script标签
    $descclear = preg_replace("/javascript/si", "Javascript", $descclear); //过滤script标签
    $descclear = preg_replace("/vbscript/si", "Vbscript", $descclear); //过滤script标签
    $descclear = preg_replace("/on([a-z]+)\s*=/si", "On\\1=", $descclear); //过滤script标签
    $descclear = preg_replace("/&#/si", "&＃", $descclear); //过滤script标签，如javAsCript:alert();
    //使用正则替换
    $pat = "/<(\/?)(script|i?frame|style|html|body|li|i|map|title|img|link|span|u|font|table|tr|b|marquee|td|strong|div|a|meta|\?|\%)([^>]*?)>/isU";
    $descclear = preg_replace($pat, "", $descclear);
    return $descclear;
}

// html去转义
function _qzy($text)
{
    $text = str_replace("&quot;", '"', $text);
    return $text;
}
/**
 * 取HTML,并自动补全闭合
 *
 * param $html
 *
 * param $length
 *
 * param $end
 */
function subHtml($html, $length = 50)
{
    $result = '';
    $tagStack = array();
    $len = 0;
    $contents = preg_split("~(<[^>]+?>)~si", $html, -1, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);
    foreach ($contents as $tag) {
        if (trim($tag) == "") continue;
        if (preg_match("~<([a-z0-9]+)[^/>]*?/>~si", $tag)) {
            $result .= $tag;
        } else if (preg_match("~</([a-z0-9]+)[^/>]*?>~si", $tag, $match)) {
            if ($tagStack[count($tagStack) - 1] == $match[1]) {
                array_pop($tagStack);
                $result .= $tag;
            }
        } else if (preg_match("~<([a-z0-9]+)[^/>]*?>~si", $tag, $match)) {
            array_push($tagStack, $match[1]);
            $result .= $tag;
        } else if (preg_match("~<!--.*?-->~si", $tag)) {
            $result .= $tag;
        } else {
            if ($len + mstrlen($tag) < $length) {
                $result .= $tag;
                $len += mstrlen($tag);
            } else {
                $str = msubstr($tag, 0, $length - $len + 1);
                $result .= $str;
                break;
            }
        }
    }
    while (!empty($tagStack)) {
        $result .= '</' . array_pop($tagStack) . '>';
    }
    return $result;
}
/**
 * 取中文字符串
 *
 * param $string 字符串
 *
 * param $start 起始位
 *
 * param $length 长度
 *
 * param $charset 编码
 *
 * param $dot 附加字串
 */
function msubstr($string, $start, $length, $dot = '', $charset = 'UTF-8')
{
    $string = str_replace(array('&', '"', '<', '>', ' '), array('&', '"', '<', '>', ' '), $string);
    if (strlen($string) <= $length) {
        return $string;
    }
    if (strtolower($charset) == 'utf-8') {
        $n = $tn = $noc = 0;
        while ($n < strlen($string)) {
            $t = ord($string[$n]);
            if ($t == 9 || $t == 10 || (32 <= $t && $t <= 126)) {
                $tn = 1;
                $n++;
            } elseif (194 <= $t && $t <= 223) {
                $tn = 2;
                $n += 2;
            } elseif (224 <= $t && $t <= 239) {
                $tn = 3;
                $n += 3;
            } elseif (240 <= $t && $t <= 247) {
                $tn = 4;
                $n += 4;
            } elseif (248 <= $t && $t <= 251) {
                $tn = 5;
                $n += 5;
            } elseif ($t == 252 || $t == 253) {
                $tn = 6;
                $n += 6;
            } else {
                $n++;
            }
            $noc++;
            if ($noc >= $length) {
                break;
            }
        }
        if ($noc > $length) {
            $n -= $tn;
        }
        $strcut = substr($string, 0, $n);
    } else {
        for ($i = 0; $i < $length; $i++) {
            $strcut = "";
            $strcut .= ord($string[$i]) > 127 ? $string[$i] . $string[++$i] : $string[$i];
        }
    }
    return $strcut . $dot;
}
/**
 * 得字符串的长度，包括中英文。
 */
function mstrlen($str, $charset = 'UTF-8')
{
    if (function_exists('mb_substr')) {
        $length = mb_strlen($str, $charset);
    } elseif (function_exists('iconv_substr')) {
        $length = iconv_strlen($str, $charset);
    } else {
        preg_match_all("/[\x01-\x7f]|[\xc2-\xdf][\x80-\xbf]|\xe0[\xa0-\xbf][\x80-\xbf]|[\xe1-\xef][\x80-\xbf][\x80-\xbf]|\xf0[\x90-\xbf][\x80-f][\x80-\xbf]|[\xf1-\xf7][\x80-\xbf][\x80-\xbf][\x80-\xbf]/", $str, $ar);
        $length = count($ar[0]);
    }
    return $length;
}



/**
 * Generate an MD5 hash string from the contents of a directory.
 *
 * @param string $directory
 * @return boolean|string
 */
function hashDirectory($directory)
{
    if (! is_dir($directory))
    {
        return false;
    }
 
    $files = array();
    $dir = dir($directory);
 
    while (false !== ($file = $dir->read()))
    {
        if ($file != '.' and $file != '..' and $file != '.md5')
        {
            if (is_dir($directory . '/' . $file))
            {
                $files[] = hashDirectory($directory . '/' . $file);
            }
            else
            {
                $files[] = md5_file($directory . '/' . $file);
            }
        }
    }
 
    $dir->close();
 
    return md5(implode('', $files));
}