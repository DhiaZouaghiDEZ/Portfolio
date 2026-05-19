import { config } from '../config/env';
import { Profile, Project, Skill, Experiences, Educations, Message } from '../types';

const BASE_URL = config.apiBaseUrl;

async function apiFetch<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
        throw new Error(`API error: ${response.status} on ${endpoint}`);
    }
    return response.json() as Promise<T>;
}

async function apiPost<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    if (!response.ok) {
        throw new Error(`API error: ${response.status} on ${endpoint}`);
    }
    return response.json() as Promise<T>;
}

export const portfolioApi = {
    getProfile: () => apiFetch<Profile[]>('/api/profile/getallprofiles'),
    getProjects: () => apiFetch<Project[]>('/api/project/getallprojects'),
    getSkills: () => apiFetch<Skill[]>('/api/skill/getallskills'),
    getExperience: () => apiFetch<Experiences[]>('/api/experience/getallexperiences'),
    getEducation: () => apiFetch<Educations[]>('/api/education/getalleducations'),
    sendMessage: (data: Message) => apiPost<Message>('/api/message/addmessage', data),
};
