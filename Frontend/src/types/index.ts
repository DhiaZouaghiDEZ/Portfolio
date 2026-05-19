export interface SocialLink {
    id: string;
    platform: string;
    url: string;
}

export interface Profile {
    id: string;
    name: string;
    title: string;
    avatar?: string;
    bio?: string;
    email?: string;
    phone?: string;
    socialLinks: SocialLink[];
}

export interface Project {
    id: string;
    title: string;
    description?: string;
    techStack?: string;
    links?: string;
    imageUrl?: string;
    featured: boolean;
    status?: string;
}

export interface Skill {
    id: string;
    name: string;
    category?: string;
    proficiency: number;
    endorsements?: number;
}

export interface Experiences {
    id: string;
    company: string;
    role: string;
    description?: string;
    techStack?: string;
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
}

export interface Educations {
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    description?: string;
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
}

export interface Message {
    id?: string;
    name: string;
    email: string;
    subject: string;
    content: string;
    submittedDate?: string;
    isRead?: boolean;
}
