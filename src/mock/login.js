import { getParams } from '@/libs/util'
const USER_MAP = {
  super_admin: {
    username: 'super_admin',
    userId: '1',
    access: ['super_admin', 'admin'],
    mobile: '19924381827',
    createTime: '2019-9-20',
    updateTime: '2019-9-20',
    role: 'superAdmin',
    token: 'super_admin',
    avatar: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
  },
  admin: {
    name: 'admin',
    user_id: '2',
    access: ['admin'],
    token: 'admin',
    avatar: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
  }
}

export const login = req => {
  req = JSON.parse(req.body)
  let captcha = req.captcha
  if(captcha == '12345') {
    console.log("success login")
    USER_MAP[req.username].status = 1
    return USER_MAP[req.username]
  }
  else {
    return {
      status: -1,
      msg: '验证码错误'
    }
  }
}

export const getUserInfo = req => {
  const params = getParams(req.url)
  return USER_MAP[params.token]
}

export const logout = req => {
  return null
}
