export type ProjectLevel = 'Advanced' | 'Intermediate' | 'Basic'

export type Project = {
  id: string
  title: string
  description: string
  imageUrl: string
  technologies: string[]
  githubUrl: string
  demoUrl: string
  level: ProjectLevel
}

export type Message = {
  id: string
  name: string
  email: string
  phone: string
  message: string
  createdAt: string
}

export type Visit = {
  id: string
  timestamp: string
}


