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

  async function createBlock(block: Omit<Block, 'id' | 'createdAt' | 'updatedAt'>) {
    const repository = new BlockRepositoryImpl();
    loading.value = true;
    error.value = null;

    try {
      const createdBlock = await repository.create(block);
      
      // Mettre à jour les maps
      blocks.value.set(createdBlock.id, createdBlock);
      const pageBlocks = blocksByPage.value.get(createdBlock.pageId) || [];
      blocksByPage.value.set(createdBlock.pageId, [...pageBlocks, createdBlock]);

      return createdBlock;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Une erreur est survenue';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateBlock(id: string, block: Partial<Block>) {
    const repository = new BlockRepositoryImpl();
    loading.value = true;
    error.value = null;

    try {
      const updatedBlock = await repository.update(id, block);
      
      // Mettre à jour les maps
      blocks.value.set(updatedBlock.id, updatedBlock);
      const pageBlocks = blocksByPage.value.get(updatedBlock.pageId) || [];
      const blockIndex = pageBlocks.findIndex(b => b.id === updatedBlock.id);
      if (blockIndex !== -1) {
        pageBlocks[blockIndex] = updatedBlock;
        blocksByPage.value.set(updatedBlock.pageId, pageBlocks);
      }

      return updatedBlock;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Une erreur est survenue';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteBlock(id: string) {
    const repository = new BlockRepositoryImpl();
    loading.value = true;
    error.value = null;

    try {
      const block = blocks.value.get(id);
      if (!block) {
        throw new Error('Block not found');
      }

      await repository.delete(id);
      
      // Mettre à jour les maps
      blocks.value.delete(id);
      const pageBlocks = blocksByPage.value.get(block.pageId) || [];
      const updatedPageBlocks = pageBlocks.filter(b => b.id !== id);
      blocksByPage.value.set(block.pageId, updatedPageBlocks);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Une erreur est survenue';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function reorderBlocks(pageId: string, ids: string[]) {
    const repository = new BlockRepositoryImpl();
    loading.value = true;
    error.value = null;

    try {
      await repository.reorder(pageId, ids);
      
      // Mettre à jour les maps
      const pageBlocks = blocksByPage.value.get(pageId) || [];
      const reorderedBlocks = ids
        .map(id => pageBlocks.find(block => block.id === id))
        .filter((block): block is Block => block !== undefined);
      
      blocksByPage.value.set(pageId, reorderedBlocks);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Une erreur est survenue';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function moveBlock(id: string, newParentId: string | null, newOrder: number) {
    const repository = new BlockRepositoryImpl();
    loading.value = true;
    error.value = null;

    try {
      const block = blocks.value.get(id);
      if (!block) {
        throw new Error('Block not found');
      }

      await repository.move(id, newParentId, newOrder);
      
      // Mettre à jour les maps
      const oldPageBlocks = blocksByPage.value.get(block.pageId) || [];
      const updatedOldPageBlocks = oldPageBlocks.filter(b => b.id !== id);
      blocksByPage.value.set(block.pageId, updatedOldPageBlocks);

      // Recharger les blocks de la nouvelle page
      if (newParentId) {
        await fetchBlocks(newParentId);
      }
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
    createBlock,
    updateBlock,
    deleteBlock,
    reorderBlocks,
    moveBlock,
  };
}); 