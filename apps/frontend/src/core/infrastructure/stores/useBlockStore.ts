import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Block } from '../../domain/entities/Block';

export const useBlockStore = defineStore('blocks', () => {
  // State
  const blocks = ref(new Map<string, Block>());
  const blocksByPage = ref(new Map<string, Block[]>());
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const getBlocksByPage = computed(() => {
    return (pageId: string) => blocksByPage.value.get(pageId) || [];
  });

  const getBlock = computed(() => {
    return (id: string) => blocks.value.get(id) || null;
  });

  const isLoading = computed(() => loading.value);
  const hasError = computed(() => error.value !== null);

  return {
    // State
    blocks,
    blocksByPage,
    loading,
    error,
    
    // Getters
    getBlocksByPage,
    getBlock,
    isLoading,
    hasError,
  };
}); 