import type { Page, PageWithBlocks } from '../../domain/entities/Page';
import type { PageRepository } from '../../domain/repositories/PageRepository';
import type { CreatePageDTO } from '../../domain/use-cases/CreatePageUseCase';
import type { UpdatePageDTO } from '../../domain/use-cases/UpdatePageUseCase';

export class PageRepositoryImpl implements PageRepository {
  async findById(id: string): Promise<PageWithBlocks | null> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Page[]> {
    throw new Error('Method not implemented.');
  }

  async findByParentId(parentId: string | null): Promise<Page[]> {
    throw new Error('Method not implemented.');
  }

  async findByUserId(userId: string): Promise<Page[]> {
    throw new Error('Method not implemented.');
  }

  async create(page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>): Promise<Page> {
    throw new Error('Method not implemented.');
  }

  async update(id: string, page: Partial<Page>): Promise<Page> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async reorder(ids: string[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findChildren(parentId: string): Promise<Page[]> {
    throw new Error('Method not implemented.');
  }
} 