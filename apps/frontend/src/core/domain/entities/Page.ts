import { Block } from './Block'

export interface Page {
  id: string
  title: string
  icon?: string
  cover?: string
  parentId: string | null
  order: number
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy: string
  lastEditedBy: string
  lastEditedAt: Date
}

export interface PageWithBlocks extends Page {
  blocks: Block[]
} 