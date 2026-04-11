export type UserRole = 'admin' | 'student';

export interface UserProfile {
  uid: string;
  email: string;
  role: UserRole;
  displayName: string;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  subject: string;
  summary: string;
  image_url?: string;
  example: string;
  keywords: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  knowledgeId: string;
  createdAt: string;
}

export interface Feedback {
  id: string;
  userId: string;
  knowledgeId: string;
  content: string;
  createdAt: string;
}
