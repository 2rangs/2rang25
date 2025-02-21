import { supabase } from '~/server/utils/supabase';
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
    try {
        const { data: posts, error } = await supabase
            .from('posts')
            .select(`
                *,
                category:categories(name)
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return { error: 'Failed to fetch posts' };
    }
});
