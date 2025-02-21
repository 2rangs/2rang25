import { supabase } from '~/server/utils/supabase';
import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
    try {
        const { data, error } = await supabase
            .from('categories') // 카테고리 테이블
            .select('*');

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return { error: 'Failed to fetch categories' };
    }
});
