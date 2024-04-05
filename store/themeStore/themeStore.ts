import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => ({
        theme : 'dark'
    }),
    getters: {
        getTheme : (state) => {
            return state.theme
        }
    },
    actions: {
        setTheme    (Theme  : any)  {
            this.theme = Theme
        }
    }
})
