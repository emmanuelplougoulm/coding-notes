import { Page, PageWithBlocks } from '../entities/Page'

export interface PageRepository {
  findById(id: string): Promise<PageWithBlocks | null>
  findAll(): Promise<Page[]>
  findByParentId(parentId: string | null): Promise<Page[]>
  create(page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>): Promise<Page>
  update(id: string, page: Partial<Page>): Promise<Page>
  delete(id: string): Promise<void>
  reorder(ids: string[]): Promise<void>
} 