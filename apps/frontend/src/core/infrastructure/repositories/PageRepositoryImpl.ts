import type { Page, PageWithBlocks } from '../../domain/entities/Page';
import type { PageRepository } from '../../domain/repositories/PageRepository';

export class PageRepositoryImpl implements PageRepository {
  private readonly baseUrl = '/api/pages';

  async findById(id: string): Promise<PageWithBlocks | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch page: ${response.statusText}`);
      }

      const data = await response.json();
      return data as PageWithBlocks;
    } catch (error) {
      console.error('Error fetching page:', error);
      throw error;
    }
  }

  async findAll(): Promise<Page[]> {
    try {
      const response = await fetch(this.baseUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch pages: ${response.statusText}`);
      }

      const data = await response.json();
      return data as Page[];
    } catch (error) {
      console.error('Error fetching pages:', error);
      throw error;
    }
  }

  async findByParentId(parentId: string | null): Promise<Page[]> {
    try {
      const url = new URL(this.baseUrl, window.location.origin);
      if (parentId !== null) {
        url.searchParams.append('parentId', parentId);
      } else {
        url.searchParams.append('parentId', 'null');
      }

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`Failed to fetch pages by parent: ${response.statusText}`);
      }

      const data = await response.json();
      return data as Page[];
    } catch (error) {
      console.error('Error fetching pages by parent:', error);
      throw error;
    }
  }

  async findByUserId(userId: string): Promise<Page[]> {
    throw new Error('Method not implemented.');
  }

  async create(page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>): Promise<Page> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(page),
      });

      if (!response.ok) {
        throw new Error(`Failed to create page: ${response.statusText}`);
      }

      const data = await response.json();
      return data as Page;
    } catch (error) {
      console.error('Error creating page:', error);
      throw error;
    }
  }

  async update(id: string, page: Partial<Page>): Promise<Page> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(page),
      });

      if (!response.ok) {
        throw new Error(`Failed to update page: ${response.statusText}`);
      }

      const data = await response.json();
      return data as Page;
    } catch (error) {
      console.error('Error updating page:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete page: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting page:', error);
      throw error;
    }
  }

  async reorder(ids: string[]): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/reorder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids }),
      });

      if (!response.ok) {
        throw new Error(`Failed to reorder pages: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error reordering pages:', error);
      throw error;
    }
  }

  async findChildren(parentId: string): Promise<Page[]> {
    throw new Error('Method not implemented.');
  }
} 