// Hiring Model Confidence Formülü
// log(applicationCount + 1) * 15, max 100
export function calculateModelConfidence(applicationCount: number): number {
    return Math.min(100, Math.round(Math.log(applicationCount + 1) * 15))
}

// LinkedIn Recruiter Visibility Score
export function calculateRecruiterVisibility(profile: {
    headline?: string
    summary?: string
    skills_json?: string[]
    connections_count?: number
    follower_count?: number
}): number {
    const headlineScore = profile.headline ? 20 : 0
    const summaryScore = (profile.summary?.length ?? 0) > 100 ? 20 : 0
    const skillsScore = Math.min(20, (profile.skills_json?.length ?? 0) * 2)
    const connectionScore = Math.min(20, (profile.connections_count ?? 0) / 10)
    const followerScore = Math.min(20, (profile.follower_count ?? 0) / 5)
    return Math.round(headlineScore + summaryScore + skillsScore + connectionScore + followerScore)
}

// GitHub Credibility Score
export function calculateGithubCredibility(githubData: {
    commit_frequency_score: number
    repo_activity_score: number
    language_distribution_score: number
}): number {
    return Math.min(
        100,
        Math.round(
            githubData.commit_frequency_score * 0.4 +
            githubData.repo_activity_score * 0.4 +
            githubData.language_distribution_score * 0.2
        )
    )
}

// Rol cluster belirle
export function determineRoleCluster(skills: string[]): string {
    const frontend = ['react', 'vue', 'angular', 'css', 'html', 'next.js', 'typescript', 'javascript']
    const backend = ['node.js', 'python', 'java', 'go', 'rust', 'php', 'ruby', 'express']
    const devops = ['docker', 'kubernetes', 'aws', 'gcp', 'azure', 'ci/cd', 'terraform']
    const mobile = ['react native', 'flutter', 'swift', 'kotlin', 'ios', 'android']
    const data = ['python', 'machine learning', 'tensorflow', 'pytorch', 'sql', 'spark']

    const lowered = skills.map(s => s.toLowerCase())
    const scores = {
        frontend: lowered.filter(s => frontend.includes(s)).length,
        backend: lowered.filter(s => backend.includes(s)).length,
        devops: lowered.filter(s => devops.includes(s)).length,
        mobile: lowered.filter(s => mobile.includes(s)).length,
        data: lowered.filter(s => data.includes(s)).length,
    }

    return Object.entries(scores).sort(([, a], [, b]) => b - a)[0][0]
}

// Model confidence örnek hesaplamalar:
// 10 başvuru → log(11) * 15 ≈ 36%
// 50 başvuru → log(51) * 15 ≈ 58%
// 100 başvuru → log(101) * 15 ≈ 69%
