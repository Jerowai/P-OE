import { NextRequest, NextResponse } from 'next/server'
import { analyzeResume } from '@/lib/gemini'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
    try {
        const { resumeText, resumeId, roleCluster } = await request.json()

        if (!resumeText) {
            return NextResponse.json({ error: 'Resume text is required' }, { status: 400 })
        }

        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Gemini ile analiz et
        const analysis = await analyzeResume(resumeText, roleCluster || 'frontend')

        // Sonuçları veritabanına kaydet
        if (resumeId) {
            await supabase
                .from('resumes')
                .update({
                    optimized_content: analysis.optimized_content,
                    optimization_score: analysis.optimization_score,
                })
                .eq('id', resumeId)
                .eq('user_id', user.id)

            await supabase
                .from('resume_metrics')
                .upsert({
                    resume_id: resumeId,
                    skill_density_score: analysis.skill_density_score,
                    impact_score: analysis.impact_score,
                    keyword_score: analysis.keyword_score,
                    leadership_score: analysis.leadership_score,
                })
        }

        return NextResponse.json(analysis)
    } catch (error) {
        console.error('Resume analysis error:', error)
        return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
    }
}
