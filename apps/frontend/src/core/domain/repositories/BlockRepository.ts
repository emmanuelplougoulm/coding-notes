import { Block } from '../entities/Block'

export interface BlockRepository {
  findById(id: string): Promise<Block | null>
  findByPageId(pageId: string): Promise<Block[]>
  create(block: Omit<Block, 'id' | 'createdAt' | 'updatedAt'>): Promise<Block>
  update(id: string, block: Partial<Block>): Promise<Block>
  delete(id: string): Promise<void>
  reorder(pageId: string, ids: string[]): Promise<void>
  move(id: string, newParentId: string | null, newOrder: number): Promise<void>
} 