// @ts-ignore

import { supabase } from './supabase';

// Content 타입 정의
type Content = {
    type: string;
    content: Array<any>;
};

// 게시글 생성 입력 타입 정의
type CreatePostInput = {
    title: string;
    categoryId: number;
    content: Content;
    tags: string[];
};
export const getPostById = async (postId: string) => {
    const { data: post, error: postError } = await supabase
        .from('posts')
        .select(`*`)
        .eq('id', postId)
        .single();

    if (postError) throw postError;

    return post
}
export const getPostByTitle = async (title: string) => {
    const { data: post, error: postError } = await supabase
        .from('posts')
        .select(`*`)
        .ilike('title', title) // 대소문자 구분 없이 검색
        .single()

    if (postError) throw postError;

    return post
}

export const updatePostLike = async (postId: number, like : number) => {
    const { data: updatedData, error: updateError } = await supabase
        .from('posts')
        .update({ likes: like + 1 })
        .eq('id', postId)
    return updatedData
}
/**
 * 게시글 카테고리로 조회  함수
 * @param postId 게시글 ID
 */
export const getPostByCategory = async (category: number) => {
    const { data: post, error: postError } = await supabase
        .from('posts')
        .select(`*`)
        .eq('category_id', category);

    if (postError) throw postError;

    return post
}

/**
 * 게시글 목록 조회 함수
 * @param limit 한 번에 가져올 게시글 수
 * @param offset 건너뛸 게시글 수
 */
export const getPosts = async (limit: number = 50, offset: number = 0) => {
    try {
        const { data: posts, error: postsError } = await supabase
            .from('posts')
            .select(`
            *
      `)
            .order('created_at', { ascending: false })

        if (postsError) throw postsError;

        return posts
    } catch (error) {
        console.error('Error fetching posts', error);
        throw error;
    }
};

/**
 * 게시글 삭제 함수
 * @param postId 게시글 ID
 */
export const deletePost = async (postId: number) => {
    try {
        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', postId);

        if (error) throw error;

        return { status: 'success' };
    } catch (error) {
        console.error(`Error deleting post with ID ${postId}`, error);
        throw error;
    }
};
export const getCategories = async () => {
    const { data, error } = await supabase
        .from('categories') // 테이블 이름이 'categories'라고 가정
        .select('*')

    if (error) {
        console.error('Error fetching categories:', error)
        return []
    }

    return data
}