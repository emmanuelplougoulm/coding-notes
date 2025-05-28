import type { Page } from '../../domain/entities/Page';
import type { PageRepository } from '../../domain/repositories/PageRepository';
import type { CreatePageDTO, UpdatePageDTO } from '../../domain/use-cases/CreatePageUseCase';

export class PageRepositoryImpl implements PageRepository {
  async findById(id: string): Promise<Page | null> {
    throw new Error('Method not implemented.');
  }

  async findByUserId(userId: string): Promise<Page[]> {
    throw new Error('Method not implemented.');
  }

  async create(page: CreatePageDTO): Promise<Page> {
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