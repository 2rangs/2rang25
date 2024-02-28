import { defineStore } from 'pinia'

export const useUserStore = defineStore('User', {
    state: () => ({
        session : {},
        metaData : {}
    }),
    getters: {
        getSession : (state) => {
            return state.session
        },
        getMetaData : (state) => {
            return state.metaData
        }
    },
    actions: {
         setSession   (session : any)  {
            this.session = session
        },
        setMetaData  (metadata : any)  {
            this.metaData = metadata
        }
    }
})
