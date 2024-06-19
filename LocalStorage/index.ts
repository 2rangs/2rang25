export const getLocalPrimary = () => localStorage.getItem('primary')
export const saveLocalPrimary = (color: string) => localStorage.setItem('primary', color)
export const removeLocalPrimary = () => localStorage.removeItem('primary')

