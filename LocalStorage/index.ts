import CryptoJS from 'crypto-js'

export const getLocalToken = () => localStorage.getItem('token')
export const saveLocalToken = (token: string) => localStorage.setItem('token', token)
export const removeLocalToken = () => localStorage.removeItem('token')

export const getLocalUserInfo = () => {
  const encUserInfo = localStorage?.getItem('userInfo') || ''
  const decryptedText = CryptoJS.AES.decrypt(encUserInfo, 'Z/WYIOx0kGxkfPnv0u6ZnDv9ELgNjph4UY6HqNdh8zY=').toString(CryptoJS.enc.Utf8)
  if (decryptedText === '') {
    return null
  } else {
    const userInfo = JSON.parse(decryptedText)
    return userInfo
  }
}
export const saveLocalUserInfo = (userInfo: any) => {
  const jsonUserInfo = JSON.stringify(userInfo) as any
  const encUserInfo = CryptoJS.AES.encrypt(jsonUserInfo, 'Z/WYIOx0kGxkfPnv0u6ZnDv9ELgNjph4UY6HqNdh8zY=').toString()
  localStorage.setItem('userInfo', encUserInfo)
}
export const removeLocalUserInfo = () => localStorage.removeItem('userInfo')
