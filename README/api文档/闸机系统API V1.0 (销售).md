#  华捷艾米人脸识别闸机系统API文档

[toc]

## **一、文档说明**

**1.系统介绍**

人脸识别闸机系统是基于人脸识别算法模型，实现了人脸控制设备开门及人脸考勤等服务，分为用户管理、人员管理，通行管理、监控管理等子模块。

该文档提供了主要的功能描述和API定义。

**2.接入必备要求**

初次使用的用户，需要与我公司销售人员联系，获得AK/SK（appkey）和secret key，用于生成token

**2.Token**

未做特殊说明的情况下，无论是从何种类型的终端发起对系统服务的请求，首先都需要将token传入后续的接口请求，才能调取Paas服务。有效期间：2H；



## **二、接口说明**

本部分对人员管理、用户管理、通行、监控统计等服务提供了具体接口介绍，如接口地址、请求方式、入参和返回参数等

### 1.用户管理相关接口


#### 1.1 用户列表


**接口地址**:`/api/v1/user/user/`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明                  | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | ------------------------- | -------- | -------- | -------- | ------ |
| current       | 当前页码                  | query    | true     | integer  |        |
| size          | 每页数量                  | query    | true     | integer  |        |
| Authorization | 令牌                      | header   | false    | string   |        |
| ascs          | 正序字段                  | query    | false    | array    | string |
| descs         | 倒序字段                  | query    | false    | array    | string |
| endTime       | 结束时间                  | query    | false    | string   |        |
| name          | 用户名                    | query    | false    | string   |        |
| startTime     | 开始时间                  | query    | false    | string   |        |
| status        | 状态,可用值:VALID,INVALID | query    | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 1.2 添加用户


**接口地址**:`/api/v1/user/user/`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明                  | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | ------------------------- | -------- | -------- | -------- | ------ |
| email         | 邮件                      | query    | true     | string   |        |
| name          | 登陆名                    | query    | true     | string   |        |
| nickName      | 昵称                      | query    | true     | string   |        |
| phone         | 手机号                    | query    | true     | string   |        |
| roleIds       | 角色                      | query    | true     | string   |        |
| status        | 状态,可用值:VALID,INVALID | query    | true     | string   |        |
| Authorization | 令牌                      | header   | false    | string   |        |
| remark        | 备注                      | query    | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 1.3 找回密码


**接口地址**:`/api/v1/user/user/findPass`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| email         | email    | path     | true     | string   |        |
| newPass       | 新密码   | body     | true     | string   |        |
| verifyCode    | 验证码   | body     | true     | string   |        |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 1.4 修改密码


**接口地址**:`/api/v1/user/user/updatePass`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| email         | 邮箱     | body     | true     | string   |        |
| newPass       | 新密码   | body     | true     | string   |        |
| oldPass       | 旧密码   | body     | true     | string   |        |
| verifyCode    | 验证码   | body     | true     | string   |        |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 1.5 发送验证码


**接口地址**:`/api/v1/user/user/verifyCode`

**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`

**接口描述**:找回密码,有效期5分钟


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| email         | 邮箱     | query    | true     | string   |        |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 1.6 查询详情


**接口地址**:`/api/v1/user/user/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| id            | 用户id   | path     | true     | string   |        |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 1.7 修改用户


**接口地址**:`/api/v1/user/user/{id}`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明                  | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | ------------------------- | -------- | -------- | -------- | ------ |
| email         | 邮件                      | query    | true     | string   |        |
| id            | 用户id                    | path     | true     | string   |        |
| name          | 登陆名                    | query    | true     | string   |        |
| nickName      | 昵称                      | query    | true     | string   |        |
| phone         | 手机号                    | query    | true     | string   |        |
| roleIds       | 角色                      | query    | true     | string   |        |
| status        | 状态,可用值:VALID,INVALID | query    | true     | string   |        |
| Authorization | 令牌                      | header   | false    | string   |        |
| remark        | 备注                      | query    | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 1.8 删除用户


**接口地址**:`/api/v1/user/user/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| id            | 用户id   | path     | true     | integer  |        |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 204    | No Content   |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |


**响应参数**:


暂无


#### 1.9 租户列表


**接口地址**:`/api/v1/user/tenant`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| current       | 当前页码 | query    | true     | integer  |        |
| size          | 每页数量 | query    | true     | integer  |        |
| Authorization | 令牌     | header   | false    | string   |        |
| ascs          | 正序字段 | query    | false    | array    | string |
| descs         | 倒序字段 | query    | false    | array    | string |
| name          | 用户名称 | query    | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 1.10 添加租户


**接口地址**:`/api/v1/user/tenant/`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明                  | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | ------------------------- | -------- | -------- | -------- | ------ |
| email         | 邮件                      | query    | true     | string   |        |
| name          | 登陆名                    | query    | true     | string   |        |
| nickName      | 昵称                      | query    | true     | string   |        |
| phone         | 手机号                    | query    | true     | string   |        |
| roleIds       | 角色                      | query    | true     | string   |        |
| status        | 状态,可用值:VALID,INVALID | query    | true     | string   |        |
| Authorization | 令牌                      | header   | false    | string   |        |
| remark        | 备注                      | query    | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 1.11 租户详情 ( 一期web系统未用 )


**接口地址**:`/api/v1/user/tenant/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| id            | 租户id   | path     | true     | string   |        |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |

**响应参数**:

暂无

账号登陆


#### 1.12 查询账号登陆详情


**接口地址**:`/api/v1/user/account/info`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明              | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | --------------------- | -------- | -------- | -------- | ------ |
| token         | 登陆账号后获取的token | query    | true     | string   |        |
| Authorization | 令牌                  | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 1.13 登陆


**接口地址**:`/api/v1/user/account/login`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| password      | 登陆密码 | query    | true     | string   |        |
| username      | 登陆账号 | query    | true     | string   |        |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 1.14 退出登录


**接口地址**:`/api/v1/user/account/logout`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明            | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | ------------------- | -------- | -------- | -------- | ------ |
| token         | 登陆账号获取的token | query    | true     | string   |        |
| Authorization | 令牌                | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:

暂无

#### 1.15 组织列表 ( 一期web系统未用 )


**接口地址**:`/api/v1/user/organization/`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明     | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | ------------ | -------- | -------- | -------- | ------ |
| current       | 当前页码     | query    | true     | integer  |        |
| size          | 每页数量     | query    | true     | integer  |        |
| Authorization | 令牌         | header   | false    | string   |        |
| ascs          | 正序字段     | query    | false    | array    | string |
| descs         | 倒序字段     | query    | false    | array    | string |
| endTime       | 创建结束时间 | query    | false    | string   |        |
| name          | 组织名称     | query    | false    | string   |        |
| startTime     | 创建开始时间 | query    | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 1.16 添加组织 ( 一期web系统未用 )


**接口地址**:`/api/v1/user/organization/`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| name          | 组织名称 | query    | true     | string   |        |
| parentId      | 父节点ID | query    | true     | integer  |        |
| Authorization | 令牌     | header   | false    | string   |        |
| description   | 描述     | query    | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 1.17 查询详情 ( 一期web系统未用 )


**接口地址**:`/api/v1/user/organization/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| id            | 组织id   | path     | true     | string   |        |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 1.18 修改组织 ( 一期web系统未用 )


**接口地址**:`/api/v1/user/organization/{id}`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| id            | 组织id   | path     | true     | integer  |        |
| name          | 组织名称 | query    | true     | string   |        |
| parentId      | 父节点ID | query    | true     | integer  |        |
| Authorization | 令牌     | header   | false    | string   |        |
| description   | 描述     | query    | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 1.19 删除组织 ( 一期web系统未用 )


**接口地址**:`/api/v1/user/organization/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| id            | 组织id   | path     | true     | integer  |        |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 204    | No Content   |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 1.20 角色列表 ( 一期web系统未用 )


**接口地址**:`/api/v1/user/role/`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| current       | 当前页码 | query    | true     | integer  |        |
| size          | 每页数量 | query    | true     | integer  |        |
| Authorization | 令牌     | header   | false    | string   |        |
| ascs          | 正序字段 | query    | false    | array    | string |
| descs         | 倒序字段 | query    | false    | array    | string |
| name          | 角色名称 | query    | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 1.21 添加角色 ( 一期web系统未用 )


**接口地址**:`/api/v1/user/role/`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| code          | 角色编码 | query    | true     | string   |        |
| description   | 描述     | query    | true     | string   |        |
| name          | 角色名   | query    | true     | string   |        |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 1.22 查询详情 ( 一期web系统未用 )


**接口地址**:`/api/v1/user/role/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| id            | 角色ID   | path     | true     | string   |        |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 1.23 修改角色 ( 一期web系统未用 )


**接口地址**:`/api/v1/user/role/{id}`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| code          | 角色编码 | query    | true     | string   |        |
| description   | 描述     | query    | true     | string   |        |
| id            | 角色id   | path     | true     | integer  |        |
| name          | 角色名   | query    | true     | string   |        |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 1.24 删除角色 ( 一期web系统未用 )


**接口地址**:`/api/v1/user/role/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`

**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| id            | 角色id   | path     | true     | integer  |        |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 204    | No Content   |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |


**响应参数**:


暂无

**响应示例**:

### 2. 人员管理相关接口


#### 2.1 批量：批量导入员工单条结果修改

**接口地址**:`/api/v1/person/batch/{id}`


**请求方式**:`POST`

**请求数据类型**:`application/json`

**响应数据类型**:`*/*`

**接口描述**:<p>判断员工表中已生效的访问单是否已存在</p>

**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|path|true|integer||
|Authorization|令牌|header|false|string||
|address|地址|query|false|string||
|companyId|公司ID|query|false|integer||
|createTime|创建时间|query|false|string||
|departmentId||query|false|integer||
|employee_num||query|false|string||
|enrollTime||query|false|string||
|expiredTime||query|false|string||
|face_type||query|false|string||
|files|图片文件|query|false|array|file|
|gateCardId||query|false|string||
|gender|性别|query|false|string||
|icCardId||query|false|string||
|idNum|身份证号|query|false|string||
|img_height||query|false|integer||
|img_type||query|false|string||
|img_width||query|false|integer||
|isDelete||query|false|integer||
|lastUpdateTime||query|false|string||
|mail|邮箱|query|false|string||
|name|姓名|query|false|string||
|operator||query|false|string||
|phone||query|false|string||
|position||query|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.2 批量：excel导入

**接口地址**:`/api/v1/person/batchImport`


**请求方式**:`POST`


**请求数据类型**:`multipart/form-data`


**响应数据类型**:`*/*`


**接口描述**:<p>在zip上传之后</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|Authorization|令牌|header|false|string||
|file|file|formData|false|file||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.3 批量：员工信息导出


**接口地址**:`/api/v1/person/downloadEmployee`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|Authorization|令牌|header|false|string||
|ascs||query|false|array|string|
|current||query|false|integer||
|descs||query|false|array|string|
|size||query|false|integer||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.4 判断员工是否属于该组织（公司） ( 一期web系统未用 )

**接口地址**:`/api/v1/person/exists`


**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|employeeIds|员工ids|query|true|string||
|organizationId|组织id|query|true|string||
|Authorization|令牌|header|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.5 批量：员工模板下载


**接口地址**:`/api/v1/person/getEmployeeTemplate`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`

**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|Authorization|令牌|header|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.6 批量：2.3 根据多个id查询员工详情列表


**接口地址**:`/api/v1/person/details`

**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| employeeIds   | 员工ids  | query    | true     | string   |        |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无

**响应示例**:查看当前导入状态


**接口地址**:`/api/v1/person/getImportStatus`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:

**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|Authorization|令牌|header|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.7 批量：获取登陆账号最新一次导入序列号


**接口地址**:`/api/v1/person/getLatestSerial`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|Authorization|令牌|header|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.8 批量：员工导入结果查询


**接口地址**:`/api/v1/person/getReslut`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|Authorization|令牌|header|false|string||
|ascs||query|false|array|string|
|current||query|false|integer||
|descs||query|false|array|string|
|endTime|endTime|query|false|string||
|name|name|query|false|string||
|serialNumber|serialNumber|query|false|string||
|size||query|false|integer||
|startTime|startTime|query|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.9 批量：员工导入序列号历史列表查询


**接口地址**:`/api/v1/person/getSerialList`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|Authorization|令牌|header|false|string||

**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.10 批量：图片ZIP上传


**接口地址**:`/api/v1/person/importZip`


**请求方式**:`POST`


**请求数据类型**:`multipart/form-data`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|Authorization|令牌|header|false|string||
|file|file|formData|false|file||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```



#### 2.11 根据多个id查询员工详情列表


**接口地址**:`/api/v1/person/details`

**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| employeeIds   | 员工ids  | query    | true     | string   |        |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无

**响应示例**:



#### 2.12 人员综合查询


**接口地址**:`/api/v1/person/person`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|Authorization|令牌|header|false|string||
|address|住址|query|false|string||
|ascs|按照时间升序|query|false|array|string|
|companyId|公司ID|query|false|integer||
|createTimeFrom|创建时间起|query|false|string||
|createTimeTo|创建时间止|query|false|string||
|current|当前页|query|false|integer||
|departmentId|部门ID|query|false|integer||
|descs|降序|query|false|array|string|
|employeeNum|工号|query|false|integer||
|enrollTime|入职时间|query|false|string||
|expiredTime|离职时间|query|false|string||
|gateCardId|门禁卡号|query|false|string||
|gender|性别|query|false|string||
|icCardId|IC卡号|query|false|string||
|id|id|query|false|string||
|idNum|身份证号|query|false|string||
|imageId|图片路径|query|false|string||
|imgFormat|图片类型|query|false|string||
|isDelete|是否删除|query|false|integer||
|mail|联系人邮箱|query|false|string||
|name|姓名|query|false|string||
|operator|操作人|query|false|string||
|orgId|组织Id|query|false|string||
|phone|联系电话|query|false|string||
|position|职位|query|false|string||
|size|当前页显示条数|query|false|integer||
|states|人员状态|query|false|integer||
|telphone|电话|query|false|string||
|type|类型|query|false|string||
|validity|是否有效|query|false|boolean||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.13 新增员工


**接口地址**:`/api/v1/person/person`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`

**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|Authorization|令牌|header|false|string||
|address|住址|query|false|string||
|companyId|公司ID|query|false|integer||
|createTime|创建时间|query|false|string||
|departmentId|部门ID|query|false|integer||
|employeeNum|工号|query|false|integer||
|enrollTime|入职时间|query|false|string||
|expiredTime|离职时间|query|false|string||
|faceType|枚举类型,可用值:ID,LIFE|query|false|string||
|files|人员图片|query|false|array|file|
|gateCardId|门禁卡号|query|false|string||
|gender|枚举类型,可用值:FEMALE,MALE|query|false|string||
|icCardId|IC卡号|query|false|string||
|idNum|身份证号|query|false|string||
|imgFormat|图片类型|query|false|string||
|imgHeight|图片高度|query|false|integer||
|imgType|枚举类型,可用值:COL,NIR,DEP|query|false|string||
|imgWidth|图片宽度|query|false|integer||
|lastUpdateTime|更新时间|query|false|string||
|mail|邮箱地址|query|false|string||
|name|姓名|query|false|string||
|operator|操作人姓名|query|false|string||
|phone|员工电话|query|false|string||
|position|员工职位|query|false|string||
|status|员工在职状态|query|false|integer||

**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


#### 2.14人员状态修改（在职/离职）


**接口地址**:`/api/v1/person/person/valid/{id}`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`

**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|path|true|integer||
|Authorization|令牌|header|false|string||
|expiredDate|expiredDate|query|false|string||
|status|status|query|false|integer||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无

**响应示例**:

```javascript

```


#### 2.15删除人员


**接口地址**:`/api/v1/person/person/{ids}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`

**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|ids|ids|path|true|string||
|Authorization|令牌|header|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|204|No Content||
|401|Unauthorized||
|403|Forbidden||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.16 查看员工详情


**接口地址**:`/api/v1/person/person/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:

**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|path|true|integer||
|Authorization|令牌|header|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.17 修改员工信息


**接口地址**:`/api/v1/person/person/{id}`


**请求方式**:`POST`


**请求数据类型**:`application/json`

**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|path|true|integer||
|Authorization|令牌|header|false|string||
|address|住址|query|false|string||
|companyId|公司ID|query|false|integer||
|createTime|创建时间|query|false|string||
|departmentId|部门ID|query|false|integer||
|employee_num|工号|query|false|string||
|enrollTime|入职时间|query|false|string||
|expiredTime|离职时间|query|false|string||
|face_type|生活照/证件照|query|false|string||
|files|图片文件|query|false|array|file|
|gateCardId|门禁卡号|query|false|string||
|gender|性别|query|false|string||
|icCardId|IC卡号|query|false|string||
|idNum|身份证号|query|false|string||
|img_height|图片高度|query|false|integer||
|img_type|图片类型|query|false|string||
|img_width|图片宽度|query|false|integer||
|isDelete|删除标志|query|false|integer||
|lastUpdateTime|更新时间|query|false|string||
|mail|邮箱|query|false|string||
|name|姓名|query|false|string||
|operator|操作人|query|false|string||
|phone|电话|query|false|string||
|position|职位|query|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.18 查看单个员工详情


**接口地址**:`/api/v1/person/person/{id}/detail`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|path|true|integer||
|Authorization|令牌|header|false|string||

**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无

**响应示例**:

```javascript

```



```javascript

```


#### 2.19 访客查询


**接口地址**:`/api/v1/person/visitor/`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|Authorization|令牌|header|false|string||
|address|住址|query|false|string||
|ascs|升序|query|false|array|string|
|createEndTime|预约结束时间|query|false|string||
|createStartTime|预约开始时间|query|false|string||
|current|当前页码|query|false|integer||
|descs|降序|query|false|array|string|
|gender|性别,可用值:FEMALE,MALE|query|false|string||
|idNum|身份证号|query|false|string||
|intervieweeName|被访人姓名|query|false|string||
|intervieweePhone|被访人电话|query|false|string||
|name|来访人姓名|query|false|string||
|operator|创建人|query|false|string||
|phone|电话|query|false|string||
|reason|来访事由|query|false|string||
|size|当前页记录条数|query|false|integer||
|status|授权状态|query|false|string||
|visitEndTime|来访结束时间|query|false|string||
|visitStartTime|来访开始时间|query|false|string||
|visitorCompany|所在公司|query|false|string||

**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.20 添加访客


**接口地址**:`/api/v1/person/visitor/`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|email|邮箱|query|true|string||
|gender|性别,可用值:FEMALE,MALE|query|true|string||
|idNum|身份证号|query|true|string||
|intervieweeName|被访人姓名|query|true|string||
|intervieweePhone|被访者手机号|query|true|string||
|name|访客名称|query|true|string||
|orgId|被访公司ID|query|true|integer||
|phone|联系人手机号|query|true|string||
|reason|访问事由|query|true|string||
|Authorization|令牌|header|false|string||
|address|地址|query|false|string||
|faceType|头像类型,可用值:ID,LIFE|query|false|string||
|files|头像|query|false|array|file|
|remark|备注|query|false|string||
|status|审核状态,可用值:UN_AUTH,AUTH,REFUSE|query|false|string||
|visitEndTime|访问结束时间|query|false|string||
|visitStartTime|访问开始时间|query|false|string||
|visitorCompany|访客公司|query|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.21 批量：批量导入访客单条修改 ( 一期web系统未用 )


**接口地址**:`/api/v1/person/visitor/batch/{id}`


**请求方式**:`POST`

**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:<p>判断访客表中已生效的访问单是否已存在</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|email|邮箱|query|true|string||
|gender|性别,可用值:FEMALE,MALE|query|true|string||
|id|id|path|true|integer||
|idNum|身份证号|query|true|string||
|intervieweeName|被访人姓名|query|true|string||
|intervieweePhone|被访者手机号|query|true|string||
|name|访客名称|query|true|string||
|orgId|被访公司ID|query|true|integer||
|phone|联系人手机号|query|true|string||
|reason|访问事由|query|true|string||
|Authorization|令牌|header|false|string||
|address|地址|query|false|string||
|faceType|头像类型,可用值:ID,LIFE|query|false|string||
|files|头像|query|false|array|file|
|remark|备注|query|false|string||
|status|审核状态,可用值:UN_AUTH,AUTH,REFUSE|query|false|string||
|visitEndTime|访问结束时间|query|false|string||
|visitStartTime|访问开始时间|query|false|string||
|visitorCompany|访客公司|query|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.22 访客批量excel导入 ( 一期web系统未用 )


**接口地址**:`/api/v1/person/visitor/batchImport`


**请求方式**:`POST`


**请求数据类型**:`multipart/form-data`


**响应数据类型**:`*/*`


**接口描述**:<p>在zip上传之后</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|Authorization|令牌|header|false|string||
|file|file|formData|false|file||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.23 根据多个id查询访客详情列表


**接口地址**:`/api/v1/person/visitor/details`


**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`

**接口描述**:

**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|visitorIds|访客ids|query|true|string||
|Authorization|令牌|header|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.24 批量：访客信息导出


**接口地址**:`/api/v1/person/visitor/downloadVisitor`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|Authorization|令牌|header|false|string||
|ascs||query|false|array|string|
|current||query|false|integer||
|descs||query|false|array|string|
|size||query|false|integer||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.25 访客是否属于该组织 ( 一期web系统未用 )

**接口地址**:`/api/v1/person/visitor/exists`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|organizationId|组织id|query|true|string||
|visitorIds|访客ids|query|true|string||
|Authorization|令牌|header|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.26 批量：查看当前导入状态 ( 一期web系统未用 )


**接口地址**:`/api/v1/person/visitor/getImportStatus`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|Authorization|令牌|header|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.27 批量：访客导入结果查询 ( 一期web系统未用 )


**接口地址**:`/api/v1/person/visitor/getReslut`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|Authorization|令牌|header|false|string||
|current|当前页数|query|false|integer||
|endTime|endTime|query|false|string||
|name|name|query|false|string||
|serialNumber|serialNumber|query|false|string||
|size|当前页的记录数|query|false|integer||
|startTime|startTime|query|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.28 批量：访客导入序列号历史列表查询 ( 一期web系统未用 )


**接口地址**:`/api/v1/person/visitor/getSerialList`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|Authorization|令牌|header|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.29 批量访客模板下载 ( 一期web系统未用 )


**接口地址**:`/api/v1/person/visitor/getVisitorTemplate`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|Authorization|令牌|header|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.30 批量：图片ZIP上传 ( 一期web系统未用 )


**接口地址**:`/api/v1/person/visitor/importZip`


**请求方式**:`POST`


**请求数据类型**:`multipart/form-data`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|Authorization|令牌|header|false|string||
|file|file|formData|false|file||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.31 查询访客详情


**接口地址**:`/api/v1/person/visitor/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|访客id|path|true|string||
|Authorization|令牌|header|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.32 修改访客


**接口地址**:`/api/v1/person/visitor/{id}`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|email|邮箱|query|true|string||
|gender|性别,可用值:FEMALE,MALE|query|true|string||
|id|id|path|true|integer||
|idNum|身份证号|query|true|string||
|intervieweeName|被访人姓名|query|true|string||
|intervieweePhone|被访者手机号|query|true|string||
|name|访客名称|query|true|string||
|orgId|被访公司ID|query|true|integer||
|phone|联系人手机号|query|true|string||
|reason|访问事由|query|true|string||
|Authorization|令牌|header|false|string||
|address|地址|query|false|string||
|faceType|头像类型,可用值:ID,LIFE|query|false|string||
|files|头像|query|false|array|file|
|remark|备注|query|false|string||
|status|审核状态,可用值:UN_AUTH,AUTH,REFUSE|query|false|string||
|visitEndTime|访问结束时间|query|false|string||
|visitStartTime|访问开始时间|query|false|string||
|visitorCompany|访客公司|query|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


暂无


**响应示例**:
```javascript

```


#### 2.33 删除访客

**接口地址**:`/api/v1/person/visitor/{id}`


**请求方式**:`DELETE`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|访客id|path|true|integer||
|Authorization|令牌|header|false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- |
|200|OK||
|204|No Content||
|401|Unauthorized||
|403|Forbidden||


**响应参数**:

暂无


### 3.通行服务相关接口


#### 3.1 查看通行记录


**接口地址**:`/api/v1/passing/access`

**请求方式**:`GET`

**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称         | 参数说明                                            | 请求类型 | 是否必须 | 数据类型 | schema |
| ---------------- | --------------------------------------------------- | -------- | -------- | -------- | ------ |
| ascs             |                                                     | query    | false    | array    | string |
| Authorization    | 令牌                                                | header   | false    |          |        |
| createTimeFrom   | 记录创建日期-从                                     | query    | false    | string   |        |
| createTimeTo     | 记录创建日期-到                                     | query    | false    | string   |        |
| current          |                                                     | query    | false    | integer  |        |
| descs            |                                                     | query    | false    | array    | string |
| deviceId         | 设备主键标识                                        | query    | false    | integer  |        |
| direction        | 通行方向,可用值:IN,OUT                              | query    | false    | string   |        |
| gateCardId       | 门禁卡号                                            | query    | false    | string   |        |
| icCardId         | IC卡号                                              | query    | false    | string   |        |
| idNum            | 身份证号                                            | query    | false    | string   |        |
| isStranger       | 想查询陌生人时请将该字段设置为true                  | query    | false    | boolean  |        |
| personType       | 人员类型,可用值:BLOCKLIST,EMPLOYEE,STRANGER,VISITOR | query    | false    | string   |        |
| result           | 通行结果,可用值:FAILURE,SUCCESS                     | query    | false    | string   |        |
| size             |                                                     | query    | false    | integer  |        |
| verificationMode | 验证方式                                            | query    | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.2 查看禁止通行人员


**接口地址**:`/api/v1/passing/blocklist`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明                   | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------------------------- | -------- | -------- | -------- | ------ |
| ascs          |                            | query    | false    | array    | string |
| Authorization | 令牌                       | header   | false    |          |        |
| current       |                            | query    | false    | integer  |        |
| descs         |                            | query    | false    | array    | string |
| faceType      | 头像类型,可用值:ID,LIFE    | query    | false    | string   |        |
| name          | 姓名                       | query    | false    | string   |        |
| reason        | 加入禁止通行人员名单的原因 | query    | false    | string   |        |
| size          |                            | query    | false    | integer  |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.3 添加禁止通行人员


**接口地址**:`/api/v1/passing/blocklist`


**请求方式**:`POST`


**请求数据类型**:`multipart/form-data`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明                   | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------------------------- | -------- | -------- | -------- | ------ |
| faceType      | 头像类型,可用值:ID,LIFE    | query    | true     | string   |        |
| name          | 姓名                       | query    | true     | string   |        |
| reason        | 加入禁止通行人员名单的原因 | query    | true     | string   |        |
| Authorization | 令牌                       | header   | false    |          |        |
| file          |                            | formData | false    | file     |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.4 移除禁止通行人员


**接口地址**:`/api/v1/passing/blocklist`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
[]
```


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema  |
| ------------- | -------- | -------- | -------- | -------- | ------- |
| Authorization | 令牌     | header   | false    |          |         |
| ids           | ids      | body     | false    | array    | integer |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 204    | No Content   |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.5 查询设备通行规则


**接口地址**:`/api/v1/passing/rule`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称       | 参数说明                                 | 请求类型 | 是否必须 | 数据类型 | schema |
| -------------- | ---------------------------------------- | -------- | -------- | -------- | ------ |
| ascs           |                                          | query    | false    | array    | string |
| Authorization  | 令牌                                     | header   | false    |          |        |
| createDateFrom | 创建时间从                               | query    | false    | string   |        |
| createDateTo   | 创建时间到                               | query    | false    | string   |        |
| current        |                                          | query    | false    | integer  |        |
| descs          |                                          | query    | false    | array    | string |
| deviceId       | 设备标识                                 | query    | false    | integer  |        |
| name           | 规则名称                                 | query    | false    | string   |        |
| ruleType       | 规则类型,可用值:BY_PERSON,BY_PERSON_TYPE | query    | false    | string   |        |
| size           |                                          | query    | false    | integer  |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.6 添加设备通行规则


**接口地址**:`/api/v1/passing/rule`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称          | 参数说明                                 | 请求类型 | 是否必须 | 数据类型 | schema  |
| ----------------- | ---------------------------------------- | -------- | -------- | -------- | ------- |
| name              | 规则名称                                 | query    | true     | string   |         |
| ruleType          | 规则类型,可用值:BY_PERSON,BY_PERSON_TYPE | query    | true     | string   |         |
| Authorization     | 令牌                                     | header   | false    |          |         |
| description       | 描述信息                                 | query    | false    | string   |         |
| deviceIds         | 设备主键标识列表                         | query    | false    | array    | integer |
| employeeIds       | 员工列表                                 | query    | false    | array    | integer |
| endDate           | 日期限定-结束                            | query    | false    | string   |         |
| endTime           | 通行结束时间                             | query    | false    | string   |         |
| personType        | 人员类型,可用值:EMPLOYEE,VISITOR         | query    | false    | string   |         |
| startDate         | 日期限定-开始                            | query    | false    | string   |         |
| startTime         | 通行开始时间                             | query    | false    | string   |         |
| verificationModes | 验证方式                                 | query    | false    | array    | string  |
| visitorIds        | 访客列表                                 | query    | false    | array    | integer |
| week              | 星期限定                                 | query    | false    | string   |         |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.7 移除设备通行规则

**接口地址**:`/api/v1/passing/rule`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明             | 请求类型 | 是否必须 | 数据类型 | schema  |
| ------------- | -------------------- | -------- | -------- | -------- | ------- |
| Authorization | 令牌                 | header   | false    |          |         |
| ids           | 设备通行规则主键标识 | query    | false    | array    | integer |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 204    | No Content   |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.8 查看设备通行规则包含的人员


**接口地址**:`/api/v1/passing/rule/{id}/person`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| id            | id       | path     | true     | integer  |        |
| Authorization | 令牌     | header   | false    |          |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.9 显示设备列表


**接口地址**:`/api/v1/passing/device`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称               | 参数说明                                                     | 请求类型 | 是否必须 | 数据类型 | schema |
| ---------------------- | ------------------------------------------------------------ | -------- | -------- | -------- | ------ |
| ascs                   |                                                              | query    | false    | array    | string |
| Authorization          | 令牌                                                         | header   | false    |          |        |
| createTimeFrom         | 记录创建时间-从                                              | query    | false    | string   |        |
| createTimeTo           | 记录创建时间-到                                              | query    | false    | string   |        |
| current                |                                                              | query    | false    | integer  |        |
| descs                  |                                                              | query    | false    | array    | string |
| firmwareVersion        | 固件版本号                                                   | query    | false    | string   |        |
| information            | 设备信息                                                     | query    | false    | string   |        |
| lastHeartbeatTimeFrom  | 最后一次心跳同步时间-从                                      | query    | false    | string   |        |
| lastHeartbeatTimeTo    | 最后一次心跳同步时间-到                                      | query    | false    | string   |        |
| location               | 位置                                                         | query    | false    | string   |        |
| manufacturer           | 厂商                                                         | query    | false    | string   |        |
| model                  | 型号                                                         | query    | false    | string   |        |
| name                   | 名称                                                         | query    | false    | string   |        |
| online                 | 是否在线                                                     | query    | false    | boolean  |        |
| size                   |                                                              | query    | false    | integer  |        |
| sn                     | 序列号                                                       | query    | false    | string   |        |
| states                 | 状态,可用值:ALWAYS_CLOSE,ALWAYS_OPEN,NORMAL,OUT_OF_ORDER,POWER_OFF | query    | false    | array    | string |
| statuses               | 记录状态,可用值:NORMAL,REMOVED                               | query    | false    | array    | string |
| type                   | 类型,可用值:BRAKE,ENTRANCE                                   | query    | false    | string   |        |
| uniqueDeviceIdentifier | 唯一标识符                                                   | query    | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.10 新增设备


**接口地址**:`/api/v1/passing/device`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明                   | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------------------------- | -------- | -------- | -------- | ------ |
| location      | 位置                       | query    | true     | string   |        |
| manufacturer  | 厂商                       | query    | true     | string   |        |
| model         | 型号                       | query    | true     | string   |        |
| name          | 名称                       | query    | true     | string   |        |
| sn            | 序列号                     | query    | true     | string   |        |
| type          | 类型,可用值:BRAKE,ENTRANCE | query    | true     | string   |        |
| Authorization | 令牌                       | header   | false    |          |        |
| description   | 描述信息                   | query    | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.11 设备操作


**接口地址**:`/api/v1/passing/device/instruct/{type}`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
[]
```


**请求参数**:


| 参数名称      | 参数说明                                                     | 请求类型 | 是否必须 | 数据类型 | schema  |
| ------------- | ------------------------------------------------------------ | -------- | -------- | -------- | ------- |
| type          | type,可用值:ALWAYS_CLOSE,ALWAYS_OPEN,CLOSE,OPEN,RESTART,SHUTDOWN | path     | true     | string   |         |
| Authorization | 令牌                                                         | header   | false    |          |         |
| deviceIds     | deviceIds                                                    | body     | false    | array    | integer |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.12 查看设备详情


**接口地址**:`/api/v1/passing/device/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| id            | id       | path     | true     | integer  |        |
| Authorization | 令牌     | header   | false    |          |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.13 修改设备信息


**接口地址**:`/api/v1/passing/device/{id}`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| id            | id       | path     | true     | integer  |        |
| location      | 位置     | query    | true     | string   |        |
| manufacturer  | 厂商     | query    | true     | string   |        |
| model         | 型号     | query    | true     | string   |        |
| name          | 名称     | query    | true     | string   |        |
| secret        | 设备密钥 | query    | true     | string   |        |
| sn            | 序列号   | query    | true     | string   |        |
| Authorization | 令牌     | header   | false    |          |        |
| description   | 描述信息 | query    | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.14 修改设备信息


**接口地址**:`/api/v1/passing/device/{id}`


**请求方式**:`PUT`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| id            | id       | path     | true     | integer  |        |
| location      | 位置     | query    | true     | string   |        |
| manufacturer  | 厂商     | query    | true     | string   |        |
| model         | 型号     | query    | true     | string   |        |
| name          | 名称     | query    | true     | string   |        |
| secret        | 设备密钥 | query    | true     | string   |        |
| sn            | 序列号   | query    | true     | string   |        |
| Authorization | 令牌     | header   | false    |          |        |
| description   | 描述信息 | query    | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.15 删除设备


**接口地址**:`/api/v1/passing/device/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| id            | id       | path     | true     | integer  |        |
| Authorization | 令牌     | header   | false    |          |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 204    | No Content   |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.16 查看设备信息


**接口地址**:`/api/v1/passing/device/{id}/info`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| id            | id       | path     | true     | integer  |        |
| Authorization | 令牌     | header   | false    |          |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.17 查看设备操作记录


**接口地址**:`/api/v1/passing/log`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称       | 参数说明                                                     | 请求类型 | 是否必须 | 数据类型 | schema |
| -------------- | ------------------------------------------------------------ | -------- | -------- | -------- | ------ |
| ascs           |                                                              | query    | false    | array    | string |
| Authorization  | 令牌                                                         | header   | false    |          |        |
| createTimeFrom | 记录创建日期-从                                              | query    | false    | string   |        |
| createTimeTo   | 记录创建日期-到                                              | query    | false    | string   |        |
| current        |                                                              | query    | false    | integer  |        |
| descs          |                                                              | query    | false    | array    | string |
| deviceId       | 设备主键标识                                                 | query    | false    | integer  |        |
| operationType  | 操作类型,可用值:ALWAYS_CLOSE,ALWAYS_OPEN,CLOSE,DELETE_BLOCKLIST,DELETE_RULE,ISSUE_BLOCKLIST,ISSUE_PERSON,ISSUE_RULE,OPEN,REMOVE_PERSON,RESTART,SHUTDOWN | query    | false    | string   |        |
| size           |                                                              | query    | false    | integer  |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.18 查看设备通行人员


**接口地址**:`/api/v1/passing/person`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称       | 参数说明                            | 请求类型 | 是否必须 | 数据类型 | schema  |
| -------------- | ----------------------------------- | -------- | -------- | -------- | ------- |
| ascs           |                                     | query    | false    | array    | string  |
| Authorization  | 令牌                                | header   | false    |          |         |
| createTimeFrom | 添加日期-从                         | query    | false    | string   |         |
| createTimeTo   | 添加日期-到                         | query    | false    | string   |         |
| current        |                                     | query    | false    | integer  |         |
| descs          |                                     | query    | false    | array    | string  |
| deviceIds      | 设备主键标识列表                    | query    | false    | array    | integer |
| employeeIds    | 员工主键标识列表                    | query    | false    | array    | integer |
| gateCardId     | 门禁卡号                            | query    | false    | string   |         |
| icCardId       | IC卡号                              | query    | false    | string   |         |
| idNum          | 身份证号                            | query    | false    | string   |         |
| name           | 姓名                                | query    | false    | string   |         |
| personType     | 人员类型,可用值:EMPLOYEE,VISITOR    | query    | false    | string   |         |
| size           |                                     | query    | false    | integer  |         |
| status         | 状态,可用值:ISSUING,NORMAL,REMOVING | query    | false    | string   |         |
| visitorIds     | 访客主键标识列表                    | query    | false    | array    | integer |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.19 添加设备通行人员


**接口地址**:`/api/v1/passing/person`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明         | 请求类型 | 是否必须 | 数据类型 | schema  |
| ------------- | ---------------- | -------- | -------- | -------- | ------- |
| Authorization | 令牌             | header   | false    |          |         |
| deviceIds     | 设备主键标识列表 | query    | false    | array    | integer |
| employeeIds   | 员工主键标识列表 | query    | false    | array    | integer |
| visitorIds    | 访客主键标识列表 | query    | false    | array    | integer |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.20 移除设备通行人员


**接口地址**:`/api/v1/passing/person`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema  |
| ------------- | -------- | -------- | -------- | -------- | ------- |
| Authorization | 令牌     | header   | false    |          |         |
| ids           |          | query    | false    | array    | integer |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 204    | No Content   |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.21 查看某个设备的通行人员


**接口地址**:`/api/v1/passing/person/device/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| id            | id       | path     | true     | integer  |        |
| Authorization | 令牌     | header   | false    |          |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.22 查询异常记录


**接口地址**:`/api/v1/passing/exception`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称       | 参数说明                                                     | 请求类型 | 是否必须 | 数据类型 | schema |
| -------------- | ------------------------------------------------------------ | -------- | -------- | -------- | ------ |
| ascs           |                                                              | query    | false    | array    | string |
| Authorization  | 令牌                                                         | header   | false    |          |        |
| category       | 异常类型,可用值:BLOCKLIST,DEVICE_OUT_OF_ORDER,DEVICE_UPGRADE_FAILED,HIGH_BODY_TEMPERATURE | query    | false    | string   |        |
| createTimeFrom | 生成日期从                                                   | query    | false    | string   |        |
| createTimeTo   | 生成日期到                                                   | query    | false    | string   |        |
| current        |                                                              | query    | false    | integer  |        |
| descs          |                                                              | query    | false    | array    | string |
| deviceId       | 设备主键标识                                                 | query    | false    | integer  |        |
| personId       | 人员主键标识                                                 | query    | false    | integer  |        |
| personType     | 异常类型,可用值:EMPLOYEE,VISITOR                             | query    | false    | string   |        |
| size           |                                                              | query    | false    | integer  |        |
| source         | 异常来源,可用值:DEVICE,PERSON                                | query    | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.23 异常监控


**接口地址**:`/api/v1/passing/exception/watch`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明                                                     | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | ------------------------------------------------------------ | -------- | -------- | -------- | ------ |
| Authorization | 令牌                                                         | header   | false    |          |        |
| category      | 异常类型,可用值:BLOCKLIST,DEVICE_OUT_OF_ORDER,DEVICE_UPGRADE_FAILED,HIGH_BODY_TEMPERATURE | query    | false    | string   |        |
| deviceId      | 设备主键标识                                                 | query    | false    | integer  |        |
| lastId        | 最后一次监控的异常记录的主键标识                             | query    | false    | integer  |        |
| personType    | 异常类型,可用值:EMPLOYEE,VISITOR                             | query    | false    | string   |        |
| source        | 异常来源,可用值:DEVICE,PERSON                                | query    | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


#### 3.24 通行记录人员图像上传


**接口地址**:`/api/v1/passing/base/upload`


**请求方式**:`POST`


**请求数据类型**:`multipart/form-data`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明             | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------------------- | -------- | -------- | -------- | ------ |
| deviceId      | 设备唯一标识符       | query    | true     | string   |        |
| imageFormat   | 图像格式             | query    | true     | integer  |        |
| imageHeight   | 图像高度             | query    | true     | integer  |        |
| imageType     | 图像类型             | query    | true     | integer  |        |
| imageWidth    | 图像宽度             | query    | true     | integer  |        |
| sign          | 签名                 | query    | true     | string   |        |
| uuid          | 与通行记录关联的字段 | query    | true     | string   |        |
| Authorization | 令牌                 | header   | false    |          |        |
| file          | file                 | body     | false    | file     |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.25 设备列表


**接口地址**:`/api/v1/passing/share`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称               | 参数说明                                                     | 请求类型 | 是否必须 | 数据类型 | schema |
| ---------------------- | ------------------------------------------------------------ | -------- | -------- | -------- | ------ |
| ascs                   |                                                              | query    | false    | array    | string |
| Authorization          | 令牌                                                         | header   | false    |          |        |
| createTimeFrom         | 记录创建时间-从                                              | query    | false    | string   |        |
| createTimeTo           | 记录创建时间-到                                              | query    | false    | string   |        |
| current                |                                                              | query    | false    | integer  |        |
| descs                  |                                                              | query    | false    | array    | string |
| firmwareVersion        | 固件版本号                                                   | query    | false    | string   |        |
| information            | 设备信息                                                     | query    | false    | string   |        |
| lastHeartbeatTimeFrom  | 最后一次心跳同步时间-从                                      | query    | false    | string   |        |
| lastHeartbeatTimeTo    | 最后一次心跳同步时间-到                                      | query    | false    | string   |        |
| location               | 位置                                                         | query    | false    | string   |        |
| manufacturer           | 厂商                                                         | query    | false    | string   |        |
| model                  | 型号                                                         | query    | false    | string   |        |
| name                   | 名称                                                         | query    | false    | string   |        |
| online                 | 是否在线                                                     | query    | false    | boolean  |        |
| size                   |                                                              | query    | false    | integer  |        |
| sn                     | 序列号                                                       | query    | false    | string   |        |
| states                 | 状态,可用值:ALWAYS_CLOSE,ALWAYS_OPEN,NORMAL,OUT_OF_ORDER,POWER_OFF | query    | false    | array    | string |
| statuses               | 记录状态,可用值:NORMAL,REMOVED                               | query    | false    | array    | string |
| type                   | 类型,可用值:BRAKE,ENTRANCE                                   | query    | false    | string   |        |
| uniqueDeviceIdentifier | 唯一标识符                                                   | query    | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.26 设备详情


**接口地址**:`/api/v1/passing/share/device/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| id            | id       | path     | true     | integer  |        |
| Authorization | 令牌     | header   | false    |          |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.27 设置设备


**接口地址**:`/api/v1/passing/share/device/{id}`


**请求方式**:`POST`


**请求数据类型**:`application/json`

**响应数据类型**:`*/*`

**接口描述**: 设置设备的公司信息


**请求示例**:


```javascript
[]
```


**请求参数**:


| 参数名称        | 参数说明        | 请求类型 | 是否必须 | 数据类型 | schema  |
| --------------- | --------------- | -------- | -------- | -------- | ------- |
| id              | id              | path     | true     | integer  |         |
| Authorization   | 令牌            | header   | false    |          |         |
| organizationIds | organizationIds | body     | false    | array    | integer |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 3.28 设备停用


**接口地址**:`/api/v1/passing/share/device/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称        | 参数说明        | 请求类型 | 是否必须 | 数据类型 | schema  |
| --------------- | --------------- | -------- | -------- | -------- | ------- |
| id              | id              | path     | true     | integer  |         |
| Authorization   | 令牌            | header   | false    |          |         |
| organizationIds | organizationIds | query    | false    | array    | integer |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 204    | No Content   |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |


**响应参数**:


暂无

**响应示例**:



### 4. 监控统计相关接口


#### 4.1 近30天进门人数


**接口地址**:`/api/v1/monitor/access/faceAccessCount`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| nowDate       | nowDate  | query    | true     | string   |        |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 4.2 设备通行人数统计


**接口地址**:`/api/v1/monitor/access/getAccessPersonCount`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 4.3 设备状态统计


**接口地址**:`/api/v1/monitor/deviceHistory/selectDeviceMonitorCountByDate`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| nowDate       | nowDate  | query    | true     | string   |        |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```




#### 4.4 今日刷脸人数


**接口地址**:`/api/v1/monitor/access/faceCount`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 4.5 设备离线统计


**接口地址**:`/api/v1/monitor/access/offlineCount`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 4.6 今日设备故障


**接口地址**:`/api/v1/monitor/access/outOfOrderCount`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 4.7 今日进门人数


**接口地址**:`/api/v1/monitor/access/personAccessCount`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 4.8 今日体温异常统计


**接口地址**:`/api/v1/monitor/exception/outOfOrderCount`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```


#### 4.9 今日预约访客人数


**接口地址**:`/api/v1/monitor/visitor/visitorCount`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`

**响应数据类型**:`*/*`

**接口描述**:根据身份证按唯一


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无


**响应示例**:

```javascript

```









### 5. QR二维码管理 ( 一期web系统未用 )


#### 5.1生成二维码

**接口地址**:`/api/v1/person/qr/generator-qrcode/{phone}`

**请求方式**:`POST`

**请求数据类型**:`application/json`

**响应数据类型**:`*/*`

**接口描述**:

**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| phone         | phone    | path     | true     | string   |        |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |


**响应参数**:


暂无

**响应示例**:

```javascript

```


#### 5.2 获取用户信息（扫二维码解析转码）

**接口地址**:`/api/v1/person/qr/getInfo/{k}`

**请求方式**:`POST`

**请求数据类型**:`application/json`

**响应数据类型**:`*/*`

**接口描述**:


**请求参数**:


| 参数名称      | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| ------------- | -------- | -------- | -------- | -------- | ------ |
| k             | k        | path     | true     | string   |        |
| Authorization | 令牌     | header   | false    | string   |        |


**响应状态**:


| 状态码 | 说明         | schema |
| ------ | ------------ | ------ |
| 200    | OK           |        |
| 201    | Created      |        |
| 401    | Unauthorized |        |
| 403    | Forbidden    |        |
| 404    | Not Found    |        |

**响应参数**:


暂无

**响应示例**:



### 









