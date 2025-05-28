import { PageRepository } from '../repositories/PageRepository'

export interface DeletePageDTO {
  id: string
  userId: string
}

export class DeletePageUseCase {
  constructor(private pageRepository: PageRepository) {}

  async execute(data: DeletePageDTO): Promise<void> {
    
    const existingPage = await this.pageRepository.findById(data.id)
    if (!existingPage) {
      throw new Error('Page not found')
    }


    const children = await this.pageRepository.findByParentId(data.id)
    if (children.length > 0) {
      throw new Error('Cannot delete page with children. Please delete or move children first.')
    }


    await this.pageRepository.delete(data.id)
  }
} 