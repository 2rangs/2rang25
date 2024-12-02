import type { NavItem } from "@nuxt/content";

export interface Category {
    id: number;
    name: string;
    parent_id: number | null;
    posts: { id: number }[]; // 게시글 배열
    children?: Category[];
}

/**
 * Supabase에서 카테고리 데이터를 가져와 NavItem 형식으로 변환
 * @param supabase Supabase 클라이언트 인스턴스
 * @returns NavItem[]
 */
export const useNavigationTree = async (
    supabase: any
): Promise<NavItem[]> => {
    try {
        // Supabase에서 카테고리와 게시글 데이터 가져오기
        const { data, error } = await supabase
            .from("categories")
            .select(`
        id,
        name,
        parent_id,
        posts:posts(id)
      `)
            .order("parent_id", { ascending: true })
            .order("id", { ascending: true });

        if (error) {
            console.error("Error fetching categories from Supabase:", {
                error,
                query: "categories",
            });
            return [];
        }

        if (!data || !Array.isArray(data)) {
            console.warn("No valid categories data returned.", { data });
            return [];
        }

        // 데이터를 NavItem 형식으로 변환
        const buildTree = (
            categories: Category[],
            parentId: number | null
        ): { tree: NavItem[]; totalPosts: number } => {
            let totalPosts = 0;

            const tree = categories
                .filter((category) => category.parent_id === parentId)
                .map((category) => {
                    // 하위 카테고리를 재귀적으로 처리
                    const { tree: children, totalPosts: childPosts } = buildTree(
                        categories,
                        category.id
                    );

                    // 현재 카테고리의 게시글 개수
                    const ownPosts = category.posts.length;

                    // 총 게시글 개수 계산 (현재 + 하위)
                    const totalCategoryPosts = ownPosts + childPosts;

                    totalPosts += totalCategoryPosts; // 상위에 반영

                    return {
                        title: `${category.name} (${totalCategoryPosts})`,
                        _path: `/categories/${category.name}`, // 카테고리 경로
                        _id: String(category.id), // ID는 문자열로 변환
                        _draft: false, // 기본값은 false
                        children, // 하위 트리 포함
                    };
                });

            return { tree, totalPosts };
        };

        const { tree: navigationTree } = buildTree(data, null);

        // 경로 검증용 로깅
        navigationTree.forEach((node) => {
            if (!node._path) {
                console.warn(`Node "${node.title}" has no valid path.`);
            }
        });
        localStorage.setItem('categories', JSON.stringify(navigationTree))
        return navigationTree;
    } catch (e) {
        console.error("Unexpected error fetching categories:", e);
        return [];
    }
};
