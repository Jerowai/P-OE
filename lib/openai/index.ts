import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export interface ResumeAnalysis {
    optimization_score: number
    skill_density_score: number
    impact_score: number
    keyword_score: number
    leadership_score: number
    optimized_content: string
    improvements: string[]
}

export async function analyzeResume(resumeText: string, roleCluster: string = 'frontend'): Promise<ResumeAnalysis> {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'user',
                content: `You are an expert technical recruiter and resume optimizer.

Analyze this resume and provide:
1. optimization_score (0-100)
2. skill_density_score (0-100): How well technical skills are represented
3. impact_score (0-100): Quantified achievements and impact statements
4. keyword_score (0-100): Industry keyword density
5. leadership_score (0-100): Leadership and initiative indicators
6. optimized_content: Rewritten resume with stronger verbs, quantified impact
7. improvements: Array of specific improvement suggestions (max 5)

Resume:
${resumeText}

Target role cluster: ${roleCluster}

Return as JSON only. No markdown, no explanation.`,
            },
        ],
        response_format: { type: 'json_object' },
    })

    const content = completion.choices[0].message.content
    if (!content) throw new Error('No response from OpenAI')
    return JSON.parse(content) as ResumeAnalysis
}

export interface JobMatch {
    match_score: number
    probability_score: number
    missing_keywords: string[]
    skill_gaps: string[]
    strengths: string[]
}

export async function matchJobToResume(resumeText: string, jobDescription: string): Promise<JobMatch> {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'user',
                content: `Compare this resume with the job description and return:
1. match_score (0-100): Overall keyword and skill overlap
2. probability_score (0-100): Estimated interview invitation probability
3. missing_keywords: Array of important keywords not in resume
4. skill_gaps: Array of required skills the candidate lacks
5. strengths: Array of strong matching points

Resume: ${resumeText}
Job Description: ${jobDescription}

Return as JSON only.`,
            },
        ],
        response_format: { type: 'json_object' },
    })

    const content = completion.choices[0].message.content
    if (!content) throw new Error('No response from OpenAI')
    return JSON.parse(content) as JobMatch
}

export interface JobKeywords {
    required_skills: string[]
    nice_to_have: string[]
    seniority_level: string
    role_cluster: string
    remote_type: string
}

export async function extractJobKeywords(jobText: string): Promise<JobKeywords> {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'user',
                content: `Extract from this job listing:
1. required_skills: Array of technical skills required
2. nice_to_have: Array of preferred skills
3. seniority_level: junior/mid/senior/lead
4. role_cluster: frontend/backend/fullstack/devops/data/mobile
5. remote_type: fully_remote/hybrid/onsite

Job listing: ${jobText}
Return as JSON only.`,
            },
        ],
        response_format: { type: 'json_object' },
    })

    const content = completion.choices[0].message.content
    if (!content) throw new Error('No response from OpenAI')
    return JSON.parse(content) as JobKeywords
}
