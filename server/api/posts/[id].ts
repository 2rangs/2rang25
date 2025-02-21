import { supabase } from '~/server/utils/supabase';
import { defineEventHandler, getRouterParam } from 'h3';

export default defineEventHandler(async (event) => {
    const postId = getRouterParam(event, 'id');

    if (!postId) {
        return { error: 'Post ID is required' };
    }

    if (event.method === 'DELETE') {
        // DELETE 요청 처리 (게시글 삭제)
        try {
            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', postId);

            if (error) throw error;

            return { status: 'success', message: 'Post deleted successfully' };
        } catch (error) {
            console.error('Error deleting post:', error);
            return { error: 'Failed to delete post' };
        }
    }

    // 기본적으로 GET 요청 처리 (게시글 조회)
    try {
        const { data: post, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', postId)
            .single();

        if (error) throw error;

        return post;
    } catch (error) {
        console.error('Error fetching post:', error);
        return { error: 'Failed to fetch post' };
    }
});
