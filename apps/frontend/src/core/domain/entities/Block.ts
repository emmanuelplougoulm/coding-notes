export type BlockType = 
  | 'paragraph'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'bulletList'
  | 'numberedList'
  | 'code'
  | 'image'
  | 'table'
  | 'quote'

export interface BlockContent {
  text?: string
  url?: string
  language?: string
  items?: string[]
  [key: string]: any
}

export interface Block {
  id: string
  type: BlockType
  content: BlockContent
  parentId: string | null
  pageId: string
  order: number
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy: string
} 