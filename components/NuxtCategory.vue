<template>
  <div class="h-full sticky w-48">
    <!-- 로딩 상태 -->
    <div v-if="loading" class="text-gray-500">Loading...</div>

    <!-- 데이터 렌더링 -->
    <ul v-else-if="categories && categories.length > 0" class="space-y-3">
      <li v-for="category in categories" :key="category._id">
        <div class="font-semibold mb-3">
          <span>{{ category.title }}</span>
        </div>
        <ul v-if="category.children && category.children.length > 0" class="ml-4 space-y-2">
          <li v-for="child in category.children" :key="child._id">
            <span
                :class="{
                'text-primary': isActive(`/categories/${child.title.split(' (')[0]}`),
                'text-gray-400 hover:text-primary': !isActive(`/categories/${child.title.split(' (')[0]}`)
              }">
              <a :href="`/categories/${child.title.split(' (')[0]}`">{{ child.title }}</a>
            </span>
          </li>
        </ul>
      </li>
    </ul>

    <!-- 데이터 없음 -->
    <div v-else class="text-gray-500">No categories available.</div>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData, useRoute } from "#app";

interface Category {
  id: number;
  name: string;
  parent_id: number | null;
  posts: { id: number }[];
  description: string;
}

interface NavItem {
  title: string;
  _path: string;
  _id: string;
  _draft: boolean;
  description: string;
  children?: NavItem[];
}

// 현재 라우트 경로 확인
const route = useRoute();
const isActive = (path: string) => route.path === path;

// 카테고리 데이터 로드 및 트리 변환
const { data: categories, pending: loading, error } = await useAsyncData(
    "categories",
    async () => {
      const { data, error } = await supabase
          .from("categories")
          .select(`
        id,
        name,
        description,
        parent_id,
        posts:posts(id)
      `)
          .order("parent_id", { ascending: true })
          .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching categories from Supabase:", error);
        return [];
      }

      if (!data || !Array.isArray(data)) {
        console.warn("No valid categories data returned.", data);
        return [];
      }

      const buildTree = (
          categories: Category[],
          parentId: number | null
      ): { tree: NavItem[]; totalPosts: number } => {
        let totalPosts = 0;

        const tree = categories
            .filter((category) => category.parent_id === parentId)
            .map((category) => {
              const { tree: children, totalPosts: childPosts } = buildTree(
                  categories,
                  category.id
              );

              const ownPosts = category.posts.length;
              const totalCategoryPosts = ownPosts + childPosts;

              totalPosts += totalCategoryPosts;

              return {
                title: `${category.name} (${totalCategoryPosts})`,
                _path: `/categories/${category.name}`,
                _id: String(category.id),
                _draft: false,
                description: `${category.description}`,
                children,
              };
            });

        return { tree, totalPosts };
      };

      const { tree: navigationTree } = buildTree(data, null);
      return navigationTree;
    }
);

// 에러 처리
if (error.value) {
  console.error("Error loading categories:", error.value);
}
</script>

<style scoped lang="scss">
.h-full {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

ul {
  list-style: none;
  padding: 0;
}

</style>
