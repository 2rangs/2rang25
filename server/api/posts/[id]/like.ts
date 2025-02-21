import { supabase } from '~/server/utils/supabase';
import { defineEventHandler, getRouterParam, readBody } from 'h3';

export default defineEventHandler(async (event) => {
    const postId = getRouterParam(event, 'id');
    const body = await readBody(event);

    if (!postId || body.like === undefined) {
        return { error: 'Post ID and like count are required' };
    }

    try {
        const { data, error } = await supabase
            .from('posts')
            .update({ likes: body.like + 1 })
            .eq('id', postId);

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Error updating like count:', error);
        return { error: 'Failed to update like count' };
    }
});
