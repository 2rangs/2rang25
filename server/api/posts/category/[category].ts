import { supabase } from '~/server/utils/supabase';
import { defineEventHandler, getRouterParam } from 'h3';

export default defineEventHandler(async (event) => {
    const category = getRouterParam(event, 'category');

    if (!category) {
        return { error: 'Category ID is required' };
    }

    try {
        const { data: posts, error } = await supabase
            .from('posts')
            .select(`*, category:categories(name)`)
            .eq('category_id', category);

        if (error) throw error;

        return posts;
    } catch (error) {
        console.error('Error fetching posts by category:', error);
        return { error: 'Failed to fetch posts by category' };
    }
});
