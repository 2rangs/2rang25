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

/**
 * 게시글 생성 함수
 */
export const createPost = async (data: CreatePostInput) => {
    try {
        // 1. 게시글 저장
        const { data: post, error: postError } = await supabase
            .from('posts')
            .insert([
                {
                    title: data.title,
                    category_id: data.categoryId,
                    content: data.content,
                },
            ])
            .select('id')
            .single();

        if (postError) throw postError;

        const postId = post.id;

        // 2. 태그 처리 및 게시글-태그 연결
        for (const tag of data.tags) {
            const tagId = await getOrCreateTag(tag); // 태그 조회 또는 생성
            await linkPostTag(postId, tagId); // 게시글-태그 연결
        }

        return { status: 'success', postId };
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

/**
 * 게시글 단건 조회 함수
 * @param postId 게시글 ID
 */
export const getPostById = async (postId: number) => {
    const { data: post, error: postError } = await supabase
        .from('posts')
        .select(`*`)
        .eq('id', postId)
        .single();

    if (postError) throw postError;

    return post
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
            .range(offset, offset + limit - 1);

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