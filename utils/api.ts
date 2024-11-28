import { supabase } from './supabase';

type Content = {
    type: string;
    content: Array<any>;
};

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
    try {
        // 1. 게시글 데이터 조회
        const { data: post, error: postError } = await supabase
            .from('posts')
            .select(`
        id,
        title,
        created_at,
        content,
        category_id,
        categories (name, path),
        post_tags (tags (name))
      `)
            .eq('id', postId)
            .single();

        if (postError) throw postError;

        // 2. 게시글 반환
        return {
            id: post.id,
            title: post.title,
            createdAt: post.created_at,
            content: post.content,
            category: {
                id: post.category_id,
                // @ts-ignore
                name: post.categories?.name,
                // @ts-ignore
                path: post.categories?.path,
            },
            tags: post.post_tags?.map((pt: any) => pt.tags.name) || [],
        };
    } catch (error) {
        console.error(`Error fetching post with ID ${postId}`, error);
        throw error;
    }
};

/**
 * 게시글 목록 조회 함수
 * @param limit 한 번에 가져올 게시글 수
 * @param offset 건너뛸 게시글 수
 */
export const getPosts = async (limit: number = 10, offset: number = 0) => {
    try {
        const { data: posts, error: postsError } = await supabase
            .from('posts')
            .select(`
        id,
        title,
        created_at,
        categories (name),
        post_tags (tags (name))
      `)
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (postsError) throw postsError;

        // 게시글 리스트 반환
        return posts.map((post: any) => ({
            id: post.id,
            title: post.title,
            createdAt: post.created_at,
            category: post.categories?.name || 'Uncategorized',
            tags: post.post_tags?.map((pt: any) => pt.tags.name) || [],
        }));
    } catch (error) {
        console.error('Error fetching posts', error);
        throw error;
    }
};

/**
 * 태그 조회 또는 생성 함수
 */
export const getOrCreateTag = async (tagName: string): Promise<number> => {
    try {
        // 1. 태그 조회
        const { data: existingTag, error: selectError } = await supabase
            .from('tags')
            .select('id')
            .eq('name', tagName)
            .single();

        if (selectError && selectError.code !== 'PGRST116') throw selectError; // PGRST116: Row not found

        if (existingTag) {
            return existingTag.id; // 기존 태그 ID 반환
        }

        // 2. 태그 생성
        const { data: newTag, error: insertError } = await supabase
            .from('tags')
            .insert([{ name: tagName }])
            .select('id')
            .single();

        if (insertError) throw insertError;

        return newTag.id;
    } catch (error) {
        console.error(`Error handling tag: ${tagName}`, error);
        throw error;
    }
};

/**
 * 게시글-태그 연결 함수
 */
export const linkPostTag = async (postId: number, tagId: number) => {
    try {
        const { error } = await supabase
            .from('post_tags')
            .insert([{ post_id: postId, tag_id: tagId }]);

        if (error) throw error;

        return true;
    } catch (error) {
        console.error(`Error linking post ${postId} with tag ${tagId}`, error);
        throw error;
    }
};
