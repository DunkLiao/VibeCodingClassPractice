/* ============================================
   GitHub Projects Page - API & DOM Rendering
   ============================================ */

const GITHUB_USERNAME = 'DunkLiao';
const API_ENDPOINT = `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=public&sort=updated&per_page=100`;

// DOM Elements
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const projectsGrid = document.getElementById('projectsGrid');
const emptyState = document.getElementById('emptyState');
const errorMessage = document.getElementById('errorMessage');

// ============================================
// Utility Functions
// ============================================

/**
 * Format date to relative time string
 * e.g. "3 months ago", "2 weeks ago"
 */
function formatRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const secondsAgo = Math.floor((now - date) / 1000);
    
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };
    
    for (const [name, seconds] of Object.entries(intervals)) {
        const interval = Math.floor(secondsAgo / seconds);
        if (interval >= 1) {
            return `${interval} ${name}${interval > 1 ? 's' : ''} ago`;
        }
    }
    
    return 'Just now';
}

/**
 * Get language color for badge styling
 */
function getLanguageColor(language) {
    const languageColors = {
        'JavaScript': '#f1e05a',
        'TypeScript': '#3178c6',
        'Python': '#3572A5',
        'Java': '#b07219',
        'C#': '#239120',
        'C++': '#f34b7d',
        'CSS': '#563d7c',
        'HTML': '#e34c26',
        'PHP': '#777bb4',
        'Ruby': '#701516',
        'Go': '#00ADD8',
        'Rust': '#ce422b',
        'VBA': '#518E3D',
        'Lua': '#000080',
    };
    return languageColors[language] || '#858585';
}

/**
 * Create project card HTML
 */
function createProjectCard(project) {
    const language = project.language || 'Unknown';
    const topics = project.topics || [];
    const stars = project.stargazers_count || 0;
    const updatedAt = formatRelativeTime(project.updated_at);
    
    const topicsHTML = topics.length > 0
        ? `<div class="project-topics">
                ${topics.slice(0, 3).map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
                ${topics.length > 3 ? `<span class="topic-tag">+${topics.length - 3}</span>` : ''}
           </div>`
        : '';
    
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <div class="project-card-header">
            <h3 class="project-name">
                <a href="${project.html_url}" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-code-branch"></i>
                    ${project.name}
                </a>
            </h3>
            <div class="project-stars">
                <i class="fas fa-star"></i>
                <span>${stars}</span>
            </div>
        </div>
        
        <p class="project-description">
            ${project.description || '（無描述）'}
        </p>
        
        ${topicsHTML}
        
        <div class="project-footer">
            <div class="project-meta">
                ${language !== 'Unknown' ? `
                    <span class="project-language">
                        <span class="language-dot" style="background-color: ${getLanguageColor(language)}"></span>
                        ${language}
                    </span>
                ` : ''}
                <span class="project-updated">
                    <i class="fas fa-clock"></i>
                    ${updatedAt}
                </span>
            </div>
            <a href="${project.html_url}" target="_blank" rel="noopener noreferrer" class="project-link">
                查看專案
                <i class="fas fa-external-link-alt"></i>
            </a>
        </div>
    `;
    
    return card;
}

/**
 * Fetch projects from GitHub API
 */
async function fetchGitHubProjects() {
    try {
        showLoading();
        
        const response = await fetch(API_ENDPOINT);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const projects = await response.json();
        
        if (projects.length === 0) {
            showEmpty();
        } else {
            renderProjects(projects);
        }
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        showError(error.message);
    }
}

/**
 * Render projects to the grid
 */
function renderProjects(projects) {
    projectsGrid.innerHTML = '';
    projects.forEach(project => {
        const card = createProjectCard(project);
        projectsGrid.appendChild(card);
    });
    showProjectsGrid();
}

/**
 * UI State Managers
 */
function showLoading() {
    loadingState.classList.remove('hidden');
    errorState.classList.add('hidden');
    projectsGrid.classList.add('hidden');
    emptyState.classList.add('hidden');
}

function showError(message) {
    loadingState.classList.add('hidden');
    errorState.classList.remove('hidden');
    projectsGrid.classList.add('hidden');
    emptyState.classList.add('hidden');
    errorMessage.textContent = message || 'Failed to load projects. Please try again later.';
}

function showProjectsGrid() {
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    projectsGrid.classList.remove('hidden');
    emptyState.classList.add('hidden');
}

function showEmpty() {
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    projectsGrid.classList.add('hidden');
    emptyState.classList.remove('hidden');
}

// ============================================
// Initialize Page
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubProjects();
});
