import {ref} from "vue";
import {categories} from "@vueuse/metadata";

export const getCategoryName = (id: number) => {
    const categryName = ref()
    const categories : any = JSON.parse(localStorage.getItem('categories') as string)
    if(categories){
        categories.map((root : any) => {
            root.children.map((tree : any) => {
                if(parseInt(tree._id) === id){
                    categryName.value = tree.title.split(' (')[0]
                }
            })
        })
    }
    return categryName.value
}
export const getCategoryInfo = (id: number) => {
    const categoryInfo = ref<{ id: string; name: string; description: string } | null>(null);
    const categories: any = JSON.parse(localStorage.getItem('categories') as string);

    const findCategory = (nodes: any[]): any => {
        for (const node of nodes) {
            if (parseInt(node._id) === id) {
                return {
                    id: node._id,
                    name: node.title.split(' (')[0],
                    description: node.description || "No description available",
                };
            }

            if (node.children && node.children.length > 0) {
                const result = findCategory(node.children);
                if (result) return result;
            }
        }
        return null;
    };

    if (categories) {
        categoryInfo.value = findCategory(categories);
    }
    return categoryInfo.value;
};

export const dateConvert = (date: string): string => {
    const newDate = new Date(date)

    const year = newDate.getFullYear()
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0')
    const day = newDate.getDate().toString().padStart(2, '0')

    return `${year}-${month}-${day}`
};