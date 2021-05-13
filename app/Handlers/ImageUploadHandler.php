<?php

namespace App\Handlers;

use  Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ImageUploadHandler
{
    // 只允许以下后缀名的图片文件上传
    protected $allowed_ext = ["png", "jpg", "gif", 'jpeg','svg','webp','wav'];

    public function save($file, $folder)
    {
        // 构建存储的文件夹规则，值如：uploads/images/avatars/201709/21/
        // 文件夹切割能让查找效率更高。
        $folder_name = "uploads/images/$folder";

        $upload_path = public_path() . '/' . $folder_name;


        // 获取文件名
        $fname = strtolower($file->getClientOriginalName()) ?: time();
        $fname = md5($fname).Str::random(8);
        // 获取文件的后缀名，因图片从剪帖板里黏帖时后缀名为空，所以此处确保后缀一直存在
        $extension = strtolower($file->getClientOriginalExtension()) ?: 'png';

        // 拼接文件名，加前缀是为了增加辨析度，前缀可以是相关数据模型的 ID
        // 值如：1_1493521050_7BVc9v9ujP.png
        $filename = $fname . '.' . $extension;

        // 如果上传的不是图片将终止操作
        if ( ! in_array($extension, $this->allowed_ext)) {
            return false;
        }

        // 将图片移动到我们的目标存储路径中
        $file->move($upload_path, $filename);

        return [
            'path' => "/$folder_name/$filename"
        ];
    }
}
