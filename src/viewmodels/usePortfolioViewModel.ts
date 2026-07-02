import { useState, useEffect, useCallback } from "react";
import type {
    Project,
    BlogPost,
    Profile,
    PhilosophyCard,
    FooterLink,
    Stat,
    TechSkill,
    Milestone,
} from "../models/types";
import {
    getPhilosophy,
    getFooterLinks,
    getStats,
    getTechSkills,
    getTools,
} from "../services/mockData";
import { getProfileFromSupabase } from "../services/supabase/profileService";
import { getMilestonesFromSupabase } from "../services/supabase/milestoneService";
import { getProjectsFromSupabase } from "../services/supabase/projectService";
import { getBlogsFromSupabase } from "../services/supabase/blogService";
import {
    getWorkExperience,
    getDevStackPortfolio,
    getAppsLaunched,
    getGitCommits,
    getCrashFreeRate,
    getClientSatisfaction,
    getResume,
} from "../services/supabase/metaService";

export const usePortfolioViewModel = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [philosophy, setPhilosophy] = useState<PhilosophyCard[]>([]);
    const [footerLinks, setFooterLinks] = useState<FooterLink[]>([]);
    const [stats, setStats] = useState<Stat[]>([]);
    const [techSkills, setTechSkills] = useState<TechSkill[]>([]);
    const [tools, setTools] = useState<string[]>([]);
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Meta data states
    const [workExperience, setWorkExperience] = useState<string | null>(null);
    const [devstackPortfolio, setDevstackPortfolio] = useState<string | null>('Mobile Developer');
    const [appsLaunched, setAppsLaunched] = useState<string | null>(null);
    const [gitCommits, setGitCommits] = useState<string | null>(null);
    const [crashFreeRate, setCrashFreeRate] = useState<string | null>(null);
    const [clientSatisfaction, setClientSatisfaction] = useState<string | null>(null);
    const [resumeUrl, setResumeUrl] = useState<string | null>(null);

    const refreshProfile = useCallback(async () => {
        const profileData = await getProfileFromSupabase();
        if (profileData) {
            setProfile(profileData);
        }
    }, []);

    const refreshMilestones = useCallback(async () => {
        const milestonesData = await getMilestonesFromSupabase();
        setMilestones(milestonesData);
    }, []);

    const refreshProjects = useCallback(async () => {
        const projectsData = await getProjectsFromSupabase();
        setProjects(projectsData);
    }, []);

    const refreshBlogs = useCallback(async () => {
        const blogsData = await getBlogsFromSupabase();
        setBlogs(blogsData);
    }, []);

    const refreshMetaData = useCallback(async () => {
        const [work, portfolio, apps, commits, crash, satisfaction, resume] =
            await Promise.all([
                getWorkExperience(),
                getDevStackPortfolio(),
                getAppsLaunched(),
                getGitCommits(),
                getCrashFreeRate(),
                getClientSatisfaction(),
                getResume(),
            ]);
        setWorkExperience(work);
        setDevstackPortfolio(portfolio);
        setAppsLaunched(apps);
        setGitCommits(commits);
        setCrashFreeRate(crash);
        setClientSatisfaction(satisfaction);
        setResumeUrl(resume);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [
                    profileData,
                    projectsData,
                    blogsData,
                    philosophyData,
                    footerLinksData,
                    statsData,
                    techSkillsData,
                    toolsData,
                    milestonesData,
                    work,
                    portfolio,
                    apps,
                    commits,
                    crash,
                    satisfaction,
                    resume,
                ] = await Promise.all([
                    getProfileFromSupabase(),
                    getProjectsFromSupabase(),
                    getBlogsFromSupabase(),
                    getPhilosophy(),
                    getFooterLinks(),
                    getStats(),
                    getTechSkills(),
                    getTools(),
                    getMilestonesFromSupabase(),
                    getWorkExperience(),
                    getDevStackPortfolio(),
                    getAppsLaunched(),
                    getGitCommits(),
                    getCrashFreeRate(),
                    getClientSatisfaction(),
                    getResume(),
                ]);
                setProfile(profileData);
                setProjects(projectsData);
                setBlogs(blogsData);
                setPhilosophy(philosophyData);
                setFooterLinks(footerLinksData);
                setStats(statsData);
                setTechSkills(techSkillsData);
                setTools(toolsData);
                setMilestones(milestonesData);
                setWorkExperience(work);
                setDevstackPortfolio(portfolio);
                setAppsLaunched(apps);
                setGitCommits(commits);
                setCrashFreeRate(crash);
                setClientSatisfaction(satisfaction);
                setResumeUrl(resume);
            } catch (error) {
                console.error("Error fetching portfolio data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return {
        profile,
        setProfile,
        refreshProfile,
        projects,
        setProjects,
        refreshProjects,
        blogs,
        setBlogs,
        refreshBlogs,
        philosophy,
        footerLinks,
        stats,
        techSkills,
        tools,
        milestones,
        setMilestones,
        refreshMilestones,
        workExperience,
        setWorkExperience,
        devstackPortfolio,
        setDevstackPortfolio,
        appsLaunched,
        setAppsLaunched,
        gitCommits,
        setGitCommits,
        crashFreeRate,
        setCrashFreeRate,
        clientSatisfaction,
        setClientSatisfaction,
        resumeUrl,
        setResumeUrl,
        refreshMetaData,
        loading,
    };
};
