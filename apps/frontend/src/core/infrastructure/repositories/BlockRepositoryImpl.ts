import type { Block } from '../../domain/entities/Block';
import type { BlockRepository } from '../../domain/repositories/BlockRepository';

export class BlockRepositoryImpl implements BlockRepository {
  private readonly baseUrl = '/api/blocks';

  async findById(id: string): Promise<Block | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch block: ${response.statusText}`);
      }

      const data = await response.json();
      return data as Block;
    } catch (error) {
      console.error('Error fetching block:', error);
      throw error;
    }
  }

  async findByPageId(pageId: string): Promise<Block[]> {
    try {
      const url = new URL(this.baseUrl, window.location.origin);
      url.searchParams.append('pageId', pageId);

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`Failed to fetch blocks: ${response.statusText}`);
      }

      const data = await response.json();
      return data as Block[];
    } catch (error) {
      console.error('Error fetching blocks:', error);
      throw error;
    }
  }

  async create(block: Omit<Block, 'id' | 'createdAt' | 'updatedAt'>): Promise<Block> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(block),
      });

      if (!response.ok) {
        throw new Error(`Failed to create block: ${response.statusText}`);
      }

      const data = await response.json();
      return data as Block;
    } catch (error) {
      console.error('Error creating block:', error);
      throw error;
    }
  }

  async update(id: string, block: Partial<Block>): Promise<Block> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(block),
      });

      if (!response.ok) {
        throw new Error(`Failed to update block: ${response.statusText}`);
      }

      const data = await response.json();
      return data as Block;
    } catch (error) {
      console.error('Error updating block:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete block: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting block:', error);
      throw error;
    }
  }

  async reorder(pageId: string, ids: string[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async move(id: string, newParentId: string | null, newOrder: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
} 