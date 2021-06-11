
/*
 * @Author: your name
 * @Date: 2021-06-03 11:47:23
 * @LastEditTime: 2021-06-10 17:31:39
 * @LastEditors: Please set LastEditors
 * @Description: 文本提示
 * @FilePath: \inventory-apie:\hjimi\人脸辨识云\html\gitlab\pc\faceCloudWebsite\src\utils\txtTip.js
 */


class Tip {
    pass() {
        return '设置的密码应为字母、数字和符号（仅限 ASCII 标准字符）<br/>组合，长度在6~16字符之间'
    }
    img() {
        return '上传图片文件支持PNG、JPG、JPEG、BMP，图片大小不超过2M'
    }
}

const TIP = new Tip()

export function passTip () {
    return TIP.pass()
}
export function imgTip () {
    return TIP.img()
}