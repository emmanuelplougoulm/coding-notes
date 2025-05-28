import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Page, PageWithBlocks } from '../../domain/entities/Page';

export const usePageStore = defineStore('pages', () => {
  // State
  const pages = ref(new Map<string, Page>());
  const pagesByParent = ref(new Map<string | null, Page[]>());
  const currentPage = ref<PageWithBlocks | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const getPage = computed(() => {
    return (id: string) => pages.value.get(id) || null;
  });

  const getPagesByParent = computed(() => {
    return (parentId: string | null) => pagesByParent.value.get(parentId) || [];
  });

  const getCurrentPage = computed(() => currentPage.value);

  const isLoading = computed(() => loading.value);
  const hasError = computed(() => error.value !== null);

  return {
    // State
    pages,
    pagesByParent,
    currentPage,
    loading,
    error,
    
    // Getters
    getPage,
    getPagesByParent,
    getCurrentPage,
    isLoading,
    hasError,
  };
}); 