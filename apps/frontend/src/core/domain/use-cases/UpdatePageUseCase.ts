import { Page, PageWithBlocks } from '../entities/Page'
import { PageRepository } from '../repositories/PageRepository'

export interface UpdatePageDTO {
  id: string
  title?: string
  icon?: string
  cover?: string
  parentId?: string | null
  isPublic?: boolean
  userId: string
}

export class UpdatePageUseCase {
  constructor(private pageRepository: PageRepository) {}

  async execute(data: UpdatePageDTO): Promise<PageWithBlocks> {
    
    const existingPage = await this.pageRepository.findById(data.id)
    if (!existingPage) {
      throw new Error('Page not found')
    }


    if (data.parentId) {
      const parent = await this.pageRepository.findById(data.parentId)
      if (!parent) {
        throw new Error('Parent page not found')
      }
    }


    const updatedPage = await this.pageRepository.update(data.id, {
      ...(data.title && { title: data.title }),
      ...(data.icon && { icon: data.icon }),
      ...(data.cover && { cover: data.cover }),
      ...(data.parentId !== undefined && { parentId: data.parentId }),
      ...(data.isPublic !== undefined && { isPublic: data.isPublic }),
      updatedBy: data.userId,
      lastEditedBy: data.userId,
      lastEditedAt: new Date()
    })


    const pageWithBlocks = await this.pageRepository.findById(updatedPage.id)
    if (!pageWithBlocks) {
      throw new Error('Failed to update page')
    }

    return pageWithBlocks
  }
} 