import {ref} from "vue";
import {categories} from "@vueuse/metadata";

export const getCategoryName = (id: number) => {
    const categryName = ref()
    const categories = ref(JSON.parse(localStorage.getItem('categories') as string))
    categories.value.map((root : any) => {
        root.children.map((tree : any) => {
            tree.children.map((child : any) => {
                if(parseInt(child._id) === id){
                    categryName.value = child.title.split(' (')[0]
                }
            })
        })
    })
    return categryName.value
};

export const dateConvert = (date: string): string => {
    const newDate = new Date(date)

    const year = newDate.getFullYear()
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0')
    const day = newDate.getDate().toString().padStart(2, '0')

    return `${year}-${month}-${day}`
};