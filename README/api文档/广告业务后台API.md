# 										闸机系统广告业务后台API

[toc]

## 一、文档说明

范围：人脸闸机系统的后台广告业务

为商户（终端设备所有者）提供广告库管理、广告分发到终端设备等功能。实时更新广告，包括添加广告、修改、删除、可设置幻灯片广告。

## 二、接口说明

### 1. 广告管理

功能：广告素材的管理，上传图片、视频等媒体文件并存储到文件服务器，返回广告ID。最多支持上传3个媒体文件。

#### 1.1 添加广告

**接口地址**:/api/ad/library

**请求方式**:POST

**请求数据类型**:application/json

**接口描述**: 新增广告，返回广告id。

**请求参数**:

| 参数名称     | 数据类型 | 是否必须 | 参数说明                                                     |
| ------------ | -------- | -------- | ------------------------------------------------------------ |
| adTitle      | string   | true     | 广告标题                                                     |
| expiredTime  | string   | true     | 过期时间                                                     |
| description  | string   | false    | 描述                                                         |
| validity     | boolean  | true     | 可用状态                                                     |
| publisher    | string   | false    | 广告来源（创建者）                                           |
| material     | files    | true     | 素材,最多3个媒体文件                                         |
| materialType | array    | true     | 枚举类型,可用值:VIDEO视频；IMG图片；TEXT文字（每种素材的类型） |
| category     | string   | false    | 广告类型等，如服装，视频，交通，教育等                       |

**返回参数**:

| 参数名 | 类型   | 说明                               |
| ------ | ------ | ---------------------------------- |
| code   | int    | 0: success;非0：对照错误代码列表； |
| msg    | string | 当为error时才出现，错误信息        |
| data   | long   | 主键标识（广告id）                 |

**返回结果示例：**

```json
{
      "code": 0,
      "msg": null,
      "data": 1
}
```

#### 1.2 广告列表(查询)

**接口地址**:/api/ad/library

**请求方式**:GET

**请求数据类型**:application/x-www-form-urlencoded

**接口描述**: 根据查询参数综合查询并返回广告列表信息。

**请求参数**:

| 参数名称    | 数据类型 | 是否必须 | 参数说明                                                     |
| ----------- | -------- | -------- | ------------------------------------------------------------ |
| title       | string   | false    | 广告标题                                                     |
| publisher   | string   | false    | 广告来源（创建者）                                           |
| description | string   | false    | 描述                                                         |
| type        | string   | true     | 枚举类型,可用值:VIDEO视频；IMG图片；TEXT文字                 |
| createTime  | string   | false    | 创建时间                                                     |
| updateTime  | string   | false    | 更新时间                                                     |
| validity    | boolean  | false    | 是否可用;                                                    |
| expiredTime | string   | false    | 过期时间；（有效期查询）                                     |
| userId      | string   | false    | 登录用户ID； 说明：保留(多租户情况下使用，闸机系统未用，保留条件) |
| userName    | string   | false    | 登录用户名；说明：(多租户情况下使用，闸机系统未用，保留条件) |
| category    | string   | false    | 广告类型等，如服装，视频，交通，教育等                       |

**返回参数**:

| 参数名称    | 数据类型 | 参数说明                                                     |
| ----------- | -------- | ------------------------------------------------------------ |
| id          | file     | 广告文件ID                                                   |
| publisher   | string   | 广告来源                                                     |
| description | string   | 描述                                                         |
| material    | files    | 素材文件                                                     |
| type        | string   | 枚举类型,可用值:VIDEO视频；IMG图片；TEXT文字                 |
| createTime  | string   | 创建时间                                                     |
| updateTime  | string   | 更新时间                                                     |
| validity    | boolean  | 是否可用;                                                    |
| expiredTime | string   | 过期时间；（有效期查询）                                     |
| userId      | string   | 登录用户ID； 说明：保留(多租户情况下使用，闸机系统未用，保留条件) |
| userName    | string   | 登录用户名；说明：(多租户情况下使用，闸机系统未用，保留条件) |
| category    | string   | 广告类型等，如服装，视频，交通，教育等                       |

**返回结果示例：**

```
{
  "code": 0,
  "msg": "操作成功",
  "data": {
    "records": [
      {
        "id": 5170,
        "publisher": "广告来源",
        "description": "广告描述",
         "material": "素材文件",
        "createTime": "创建时间",
        "updateTime": "更新时间",
        "validity": "是否可用",
        "expiredTime": 过期时间；（有效期查询）,
        "category": "广告分类"
        }
     }
 }
```

#### 1.3 删除广告

**接口地址**:/api/ad/library

**请求方式**:POST

**请求数据类型**:application/json

**接口描述**: 删除广告，返回操作结果。

**请求参数**:

| 参数名称 | 数据类型 | 是否必须 | 参数说明 |
| -------- | -------- | -------- | -------- |
| ids      | array    | true     | 广告ID   |

**返回参数**:

| 参数名 | 类型   | 说明                               |
| ------ | ------ | ---------------------------------- |
| code   | int    | 0: success;非0：对照错误代码列表； |
| msg    | string | 当为error时才出现，错误信息        |

**返回结果示例：**

```json
{
      "code": 0,
      "msg": null
}
```

#### 1.4 广告内容修改

**接口地址**:/api/ad/library{id}

**请求方式**:POST

**请求数据类型**:application/x-www-form-urlencoded

**接口描述**: 

单条或者批量修改广告列表信息；

单挑下发广告内容到设备；

**请求参数**:

| 参数名称     | 数据类型 | 是否必须 | 参数说明                                                     |
| ------------ | -------- | -------- | ------------------------------------------------------------ |
| title        | string   | false    | 广告标题                                                     |
| publisher    | string   | false    | 广告来源                                                     |
| description  | string   | false    | 描述                                                         |
| material     | files    | false    | 广告素材（最多3个文件）                                      |
| materialType | array    | false    | 枚举类型,可用值:VIDEO视频；IMG图片；TEXT文字                 |
| updateTime   | string   | false    | 更新时间                                                     |
| validity     | boolean  | false    | 是否可用;                                                    |
| userName     | string   | false    | 登录用户名；说明：(多租户情况下使用，闸机系统未用，保留条件) |

返回参数**:

| 参数名 | 类型   | 说明                               |
| ------ | ------ | ---------------------------------- |
| code   | int    | 0: success;非0：对照错误代码列表； |
| msg    | string | 当为error时才出现，错误信息        |

**返回结果示例：**

```
{
      "code": 0,
      "msg": null
}
```

### 2.广告分发

#### 2.1 新增广告分发（批量）

**接口地址**:/api/ad/issue

**请求方式**:POST

**请求数据类型**:application/x-www-form-urlencoded

**接口描述**: 单条或者批量修改广告列表信息。

**请求参数**:

| 参数名称       | 数据类型 | 是否必须 | 参数说明                                       |
| -------------- | -------- | -------- | ---------------------------------------------- |
| ids            | array    | true     | 广告文件ID数组                                 |
| type           | array    | true     | 枚举类型,可用值:VIDEO视频；IMG图片；TEXT文字() |
| createTime     | string   | false    | 下发时间                                       |
| updateTime     | string   | false    | 更新时间                                       |
| validity       | boolean  | false    | 是否可用;                                      |
| expiredTime    | string   | false    | 过期时间；（有效期查询）                       |
| deviceName     | string   | false    | 绑定的设备名称                                 |
| deviceIds      | integer  | false    | 绑定的设备ID                                   |
| deviceLocation | string   | false    | 绑定的设备位置                                 |
| priority       | integer  | true     | 播放优先级                                     |
| playTime       | integer  | true     | 播放时间（单位min分钟）                        |
| bk             | string   | false    | 备注                                           |

**返回参数**:

| 参数名 | 类型   | 说明                               |
| ------ | ------ | ---------------------------------- |
| code   | int    | 0: success;非0：对照错误代码列表； |
| msg    | string | 当为error时才出现，错误信息        |

**返回结果示例：**

```json
{
      "code": 0,
      "msg": null
}
```

#### 2.2 广告分发列表(查询)

**接口地址**:/api/ad/issue

**请求方式**:GET

**请求数据类型**:application/x-www-form-urlencoded

**接口描述**: 根据查询参数综合查询并返回广告列表信息。

**请求参数**:

| 参数名称       | 数据类型 | 是否必须 | 参数说明                                                     |
| -------------- | -------- | -------- | ------------------------------------------------------------ |
| title          | string   | false    | 广告标题                                                     |
| publisher      | string   | false    | 广告来源（创建者）                                           |
| description    | string   | false    | 描述                                                         |
| type           | string   | true     | 枚举类型,可用值:VIDEO视频；IMG图片；TEXT文字                 |
| createTime     | string   | false    | 创建时间                                                     |
| updateTime     | string   | false    | 更新时间                                                     |
| validity       | boolean  | false    | 是否可用;                                                    |
| expiredTime    | string   | false    | 过期时间；（有效期查询）                                     |
| priority       | integer  | true     | 播放优先级                                                   |
| playTime       | integer  | true     | 播放时间（单位min分钟）                                      |
| deviceId       | integer  | false    | 绑定的设备ID                                                 |
| deviceName     | string   | false    | 绑定的设备名称                                               |
| deviceLocation | string   | false    | 绑定的设备位置                                               |
| userId         | string   | false    | 登录用户ID； 说明：保留(多租户情况下使用，闸机系统未用，保留条件) |
| userName       | string   | false    | 登录用户名；说明：(多租户情况下使用，闸机系统未用，保留条件) |
| category       | string   | false    | 广告类型等，如服装，视频，交通，教育等                       |

**返回参数**:

| 参数名称       | 数据类型 | 参数说明                                                     |
| -------------- | -------- | ------------------------------------------------------------ |
| id             | file     | 广告文件ID                                                   |
| publisher      | string   | 广告来源                                                     |
| description    | string   | 描述                                                         |
| type           | string   | 枚举类型,可用值:VIDEO视频；IMG图片；TEXT文字                 |
| priority       | integer  | true                                                         |
| playTime       | integer  | true                                                         |
| createTime     | string   | 创建时间                                                     |
| updateTime     | string   | 更新时间                                                     |
| validity       | boolean  | 是否可用;                                                    |
| expiredTime    | string   | 过期时间；（有效期查询）                                     |
| deviceId       | integer  | 绑定的设备ID                                                 |
| deviceName     | string   | 绑定的设备名称                                               |
| deviceLocation | string   | 绑定的设备位置                                               |
| userId         | string   | 登录用户ID； 说明：保留(多租户情况下使用，闸机系统未用，保留条件) |
| userName       | string   | 登录用户名；说明：(多租户情况下使用，闸机系统未用，保留条件) |
| category       | string   | 广告类型等，如服装，视频，交通，教育等                       |

**返回结果示例：**

```
{
  "code": 0,
  "msg": "操作成功",
  "data": {
    "records": [
      {
        "id": 5170,
        "publisher": "广告来源",
        "description": "广告描述",
        "createTime": "创建时间",
        "updateTime": "更新时间",
        "validity": "是否可用",
        "expiredTime": 过期时间；（有效期查询）,
        "playTime": 播放时间,
        "priority": 播放优先级,
        "deviceId": "绑定的设备ID",
        "deviceName": "绑定的设备名称",
        "deviceLocation": "绑定的设备位置"，
        "category": "广告分类"
        }
     }
 }
```

### 3.广告位管理(后期)

**接口地址**:/api/ad/position

**请求方式**:POST

**请求数据类型**:application/x-www-form-urlencoded

**接口描述**: 单条或者批量修改广告列表信息。

**请求参数**:

### 4.统计分析（埋点）

#### 4.1数据埋点入库

**接口地址**:/api/ad/statistic/dataGathering

**请求方式**:POST

**接口描述**: 设备端数据上传入库，识别结果（num，人的性别，设备属性，广告播放时长，广告id，广告类型）。

#### 4.2 数据统计分析

**接口地址**:/api/ad/statistic/calculation

**请求方式**:POST

**接口描述**: 根据设备位置等属性，广告类别，媒体文件类型，时间周期（周，月）等统计广告浏览量（观看人次，播放时间，浏览者性别），提供曲线图，分析饼图等。

**请求参数**:

| 参数名称       | 数据类型 | 是否必须 | 参数说明                                     |
| -------------- | -------- | -------- | -------------------------------------------- |
| deviceName     | string   | false    | 绑定的设备名称                               |
| deviceLocation | string   | false    | 绑定的设备位置                               |
| type           | string   | false    | 枚举类型,可用值:VIDEO视频；IMG图片；TEXT文字 |
| category       | string   | false    | 广告类型等，如服装，视频，交通，教育等       |
| period         | string   | false    | 统计的时间周期（周，月）                     |

**返回参数**:

| 参数名        | 类型    | 说明                 |
| ------------- | ------- | -------------------- |
| viewNum       | integer | 广告浏览人次         |
| viewTime      | integer | 观看时长（min 分）   |
| ViewNumFemale | integer | 广告浏览人次（女性） |
| ViewNumMale   | integer | 广告浏览人次（男性） |

**返回结果示例：**

```json
{
      "viewNum": 100,
	  "viewTime": 10000
      "viewNumFemale": 30,
      "viewNumMale": 70,
    
}
```















