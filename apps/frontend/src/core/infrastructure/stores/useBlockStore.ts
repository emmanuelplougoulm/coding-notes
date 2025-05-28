import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Block } from '../../domain/entities/Block';
import { BlockRepositoryImpl } from '../repositories/BlockRepositoryImpl';

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

  // Actions
  async function fetchBlocks(pageId: string) {
    const repository = new BlockRepositoryImpl();
    loading.value = true;
    error.value = null;

    try {
      const fetchedBlocks = await repository.findByPageId(pageId);
      
      // Mettre à jour les maps
      fetchedBlocks.forEach(block => {
        blocks.value.set(block.id, block);
      });
      blocksByPage.value.set(pageId, fetchedBlocks);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Une erreur est survenue';
      throw err;
    } finally {
      loading.value = false;
    }
  }

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
    
    // Actions
    fetchBlocks,
  };
}); 