export const getLocalPrimary = () => localStorage.getItem('primary')
export const saveLocalPrimary = (color: string) => localStorage.setItem('primary', color)
export const removeLocalPrimary = () => localStorage.removeItem('primary')

export const getVIewMod = () => localStorage.getItem('viewMod')
export const saveViewMod = (viewMod: string) => localStorage.setItem('viewMod', viewMod)

export const getCategory = () => localStorage.getItem('categories')
export const saveCategory = (categories : any) => localStorage.setItem('categories', categories)
