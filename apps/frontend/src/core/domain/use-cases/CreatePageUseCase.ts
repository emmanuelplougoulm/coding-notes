import { Page, PageWithBlocks } from '../entities/Page'
import { PageRepository } from '../repositories/PageRepository'

export interface CreatePageDTO {
  title: string
  parentId?: string | null
  icon?: string
  cover?: string
  isPublic?: boolean
  userId: string
}

export class CreatePageUseCase {
  constructor(private pageRepository: PageRepository) {}

  async execute(data: CreatePageDTO): Promise<PageWithBlocks> {
    
    if (data.parentId) {
      const parent = await this.pageRepository.findById(data.parentId)
      if (!parent) {
        throw new Error('Parent page not found')
      }
    }


    const page = await this.pageRepository.create({
      title: data.title,
      parentId: data.parentId ?? null,
      icon: data.icon,
      cover: data.cover,
      isPublic: data.isPublic ?? false,
      order: 0, // Sera mis à jour par le repository
      createdBy: data.userId,
      updatedBy: data.userId,
      lastEditedBy: data.userId,
      lastEditedAt: new Date()
    })


    const pageWithBlocks = await this.pageRepository.findById(page.id)
    if (!pageWithBlocks) {
      throw new Error('Failed to create page')
    }

    return pageWithBlocks
  }
} 