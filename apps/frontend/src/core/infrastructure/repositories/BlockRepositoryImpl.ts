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
} 