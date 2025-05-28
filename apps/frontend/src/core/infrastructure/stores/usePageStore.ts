import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Page, PageWithBlocks } from '../../domain/entities/Page';

export const usePageStore = defineStore('pages', () => {
  // State
  const pages = ref(new Map<string, Page>());
  const pagesByParent = ref(new Map<string | null, Page[]>());
  const currentPage = ref<PageWithBlocks | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  return {
    // State
    pages,
    pagesByParent,
    currentPage,
    loading,
    error,
  };
}); 