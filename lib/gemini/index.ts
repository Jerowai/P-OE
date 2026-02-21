import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

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
    const prompt = `You are an expert technical recruiter and resume optimizer.

Analyze this resume and provide a JSON response with these exact fields:
- optimization_score (0-100): Overall optimization quality
- skill_density_score (0-100): How well technical skills are represented
- impact_score (0-100): Quantified achievements and impact statements
- keyword_score (0-100): Industry keyword density
- leadership_score (0-100): Leadership and initiative indicators
- optimized_content (string): Rewritten resume with stronger action verbs and quantified impact
- improvements (array of strings): Specific improvement suggestions, max 5 items

Resume to analyze:
${resumeText}

Target role cluster: ${roleCluster}

Respond ONLY with valid JSON, no markdown, no explanation.`

    const result = await model.generateContent(prompt)
    const text = result.response.text().replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    return JSON.parse(text) as ResumeAnalysis
}

export interface JobMatch {
    match_score: number
    probability_score: number
    missing_keywords: string[]
    skill_gaps: string[]
    strengths: string[]
}

export async function matchJobToResume(resumeText: string, jobDescription: string): Promise<JobMatch> {
    const prompt = `Compare this resume with the job description and return a JSON object with:
- match_score (0-100): Overall keyword and skill overlap
- probability_score (0-100): Estimated interview invitation probability
- missing_keywords (array): Important keywords not in resume
- skill_gaps (array): Required skills the candidate lacks
- strengths (array): Strong matching points

Resume:
${resumeText}

Job Description:
${jobDescription}

Respond ONLY with valid JSON.`

    const result = await model.generateContent(prompt)
    const text = result.response.text().replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    return JSON.parse(text) as JobMatch
}

export interface JobKeywords {
    required_skills: string[]
    nice_to_have: string[]
    seniority_level: string
    role_cluster: string
    remote_type: string
}

export async function extractJobKeywords(jobText: string): Promise<JobKeywords> {
    const prompt = `Extract from this job listing and return JSON with:
- required_skills (array): Technical skills required
- nice_to_have (array): Preferred/bonus skills
- seniority_level (string): junior/mid/senior/lead
- role_cluster (string): frontend/backend/fullstack/devops/data/mobile
- remote_type (string): fully_remote/hybrid/onsite

Job listing:
${jobText}

Respond ONLY with valid JSON.`

    const result = await model.generateContent(prompt)
    const text = result.response.text().replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    return JSON.parse(text) as JobKeywords
}
