import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Page, PageWithBlocks } from '../../domain/entities/Page';
import { PageRepositoryImpl } from '../repositories/PageRepositoryImpl';
import { useBlockStore } from './useBlockStore';

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

  // Actions
  async function fetchPage(id: string) {
    const repository = new PageRepositoryImpl();
    const blockStore = useBlockStore();
    
    loading.value = true;
    error.value = null;

    try {
      const page = await repository.findById(id);
      if (page) {
        currentPage.value = page;
        pages.value.set(page.id, page);
        
        // Charger les blocks de la page
        await blockStore.fetchBlocks(page.id);
      }
      return page;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Une erreur est survenue';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function fetchPagesByParent(parentId: string | null) {
    const repository = new PageRepositoryImpl();
    loading.value = true;
    error.value = null;

    try {
      const fetchedPages = await repository.findByParentId(parentId);
      pagesByParent.value.set(parentId, fetchedPages);
      
      // Mettre à jour la map des pages
      fetchedPages.forEach(page => {
        pages.value.set(page.id, page);
      });
      
      return fetchedPages;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Une erreur est survenue';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function createPage(page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) {
    const repository = new PageRepositoryImpl();
    loading.value = true;
    error.value = null;

    try {
      const newPage = await repository.create(page);
      
      // Mettre à jour les maps
      pages.value.set(newPage.id, newPage);
      const parentPages = pagesByParent.value.get(newPage.parentId) || [];
      pagesByParent.value.set(newPage.parentId, [...parentPages, newPage]);
      
      return newPage;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Une erreur est survenue';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updatePage(id: string, page: Partial<Page>) {
    const repository = new PageRepositoryImpl();
    loading.value = true;
    error.value = null;

    try {
      const updatedPage = await repository.update(id, page);
      
      // Mettre à jour les maps
      pages.value.set(updatedPage.id, updatedPage);
      
      // Si le parent a changé, mettre à jour les deux collections de pages
      const oldPage = pages.value.get(id);
      if (oldPage && oldPage.parentId !== updatedPage.parentId) {
        // Retirer de l'ancien parent
        const oldParentPages = pagesByParent.value.get(oldPage.parentId) || [];
        pagesByParent.value.set(
          oldPage.parentId,
          oldParentPages.filter(p => p.id !== id)
        );
        
        // Ajouter au nouveau parent
        const newParentPages = pagesByParent.value.get(updatedPage.parentId) || [];
        pagesByParent.value.set(updatedPage.parentId, [...newParentPages, updatedPage]);
      } else {
        // Mettre à jour dans la collection du parent actuel
        const parentPages = pagesByParent.value.get(updatedPage.parentId) || [];
        const pageIndex = parentPages.findIndex(p => p.id === id);
        if (pageIndex !== -1) {
          parentPages[pageIndex] = updatedPage;
          pagesByParent.value.set(updatedPage.parentId, parentPages);
        }
      }
      
      // Si c'est la page courante, la mettre à jour
      if (currentPage.value?.id === id) {
        currentPage.value = updatedPage as PageWithBlocks;
      }
      
      return updatedPage;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Une erreur est survenue';
      throw err;
    } finally {
      loading.value = false;
    }
  }

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
    
    // Actions
    fetchPage,
    fetchPagesByParent,
    createPage,
    updatePage,
  };
}); 