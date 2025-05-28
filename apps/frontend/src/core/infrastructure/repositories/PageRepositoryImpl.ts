import type { Page } from '../../domain/entities/Page';
import type { PageRepository, PageWithBlocks } from '../../domain/repositories/PageRepository';
import type { CreatePageDTO } from '../../domain/use-cases/CreatePageUseCase';
import type { UpdatePageDTO } from '../../domain/use-cases/UpdatePageUseCase';

export class PageRepositoryImpl implements PageRepository {
  async findById(id: string): Promise<PageWithBlocks | null> {
    throw new Error('Method not implemented.');
  }

  async findByUserId(userId: string): Promise<Page[]> {
    throw new Error('Method not implemented.');
  }

  async create(page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>): Promise<Page> {
    throw new Error('Method not implemented.');
  }

  async update(id: string, page: UpdatePageDTO): Promise<Page> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findChildren(parentId: string): Promise<Page[]> {
    throw new Error('Method not implemented.');
  }
} 