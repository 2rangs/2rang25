import { supabase } from '~/server/utils/supabase';
import { defineEventHandler, getRouterParam } from 'h3';

export default defineEventHandler(async (event) => {
    // ✅ 동적 라우트 파라미터 가져오기
    const title = getRouterParam(event, 'title');

    if (!title) {
        return { error: 'Title is required' };
    }

    try {
        const { data: post, error } = await supabase
            .from('posts')
            .select('*')
            .ilike('title', decodeURIComponent(title)) // ✅ 한글 인코딩 문제 해결
            .single();

        if (error) throw error;

        return post;
    } catch (error) {
        console.error('Error fetching post by title:', error);
        return { error: 'Failed to fetch post by title' };
    }
});
