import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Block } from '../../domain/entities/Block';

export const useBlockStore = defineStore('blocks', () => {
  // State
  const blocks = ref(new Map<string, Block>());
  const blocksByPage = ref(new Map<string, Block[]>());
  const loading = ref(false);
  const error = ref<string | null>(null);

  return {
    // State
    blocks,
    blocksByPage,
    loading,
    error,
  };
}); 