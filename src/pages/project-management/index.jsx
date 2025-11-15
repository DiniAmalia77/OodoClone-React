import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';

import ProjectCard from './components/ProjectCard';
import TaskBoard from './components/TaskBoard';
import ProjectStats from './components/ProjectStats';
import TeamWorkload from './components/TeamWorkload';
import ProjectTimeline from './components/ProjectTimeline';
import ResourceAllocation from './components/ResourceAllocation';

const ProjectManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for projects
  const projects = [
  {
    id: 1,
    name: "E-commerce Platform Redesign",
    description: "Complete overhaul of the customer-facing e-commerce platform with modern UI/UX design and improved performance optimization.",
    status: "On Track",
    priority: "High",
    progress: 75,
    dueDate: "Dec 15, 2025",
    budget: "$125,000",
    teamMembers: [
    {
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d67f557b-1762249150720.png",
      avatarAlt: "Professional headshot of young man with brown hair in blue shirt smiling at camera"
    },
    {
      avatar: "https://images.unsplash.com/photo-1706565029882-6f25f1d9af65",
      avatarAlt: "Professional portrait of woman with long dark hair in white blazer"
    },
    {
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ea790572-1762275033803.png",
      avatarAlt: "Business headshot of man with beard wearing navy suit and tie"
    },
    {
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10c75be77-1762273997956.png",
      avatarAlt: "Professional photo of woman with blonde hair in black business attire"
    },
    {
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c5a8e8bd-1762274050155.png",
      avatarAlt: "Corporate headshot of man with short dark hair in gray suit"
    }]

  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Native iOS and Android application development for customer engagement and loyalty program management.",
    status: "At Risk",
    priority: "High",
    progress: 45,
    dueDate: "Jan 30, 2026",
    budget: "$89,500",
    teamMembers: [
    {
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_196289b6c-1762274399921.png",
      avatarAlt: "Professional portrait of man with glasses and beard in casual shirt"
    },
    {
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10c75be77-1762273997956.png",
      avatarAlt: "Business headshot of woman with curly hair in professional attire"
    },
    {
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12cd56a7f-1762273699721.png",
      avatarAlt: "Corporate photo of man with short hair in dark blue suit"
    }]

  },
  {
    id: 3,
    name: "Data Analytics Dashboard",
    description: "Business intelligence dashboard for real-time analytics and reporting across all business units and departments.",
    status: "Completed",
    priority: "Medium",
    progress: 100,
    dueDate: "Nov 20, 2025",
    budget: "$67,200",
    teamMembers: [
    {
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11b715d60-1762273834012.png",
      avatarAlt: "Professional headshot of woman with short brown hair in business suit"
    },
    {
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1065ef964-1762274061687.png",
      avatarAlt: "Business portrait of man with beard and glasses in casual blazer"
    }]

  },
  {
    id: 4,
    name: "Infrastructure Migration",
    description: "Cloud infrastructure migration and modernization project to improve scalability and reduce operational costs.",
    status: "Delayed",
    priority: "Low",
    progress: 30,
    dueDate: "Mar 15, 2026",
    budget: "$156,800",
    teamMembers: [
    {
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15aeb2f14-1762273687251.png",
      avatarAlt: "Professional photo of man with short hair in white dress shirt"
    },
    {
      avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
      avatarAlt: "Business headshot of woman with long hair in navy blazer"
    },
    {
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a9d04820-1762273649772.png",
      avatarAlt: "Corporate portrait of man with beard in dark suit and tie"
    }]

  }];


  // Mock data for tasks
  const tasks = [
  {
    id: 1,
    title: "Design System Implementation",
    description: "Create and implement comprehensive design system components for consistent UI across all platforms.",
    status: "in-progress",
    priority: "High",
    dueDate: "Nov 25, 2025",
    estimatedHours: 24,
    progress: 60,
    project: "E-commerce Platform",
    assignee: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1706565029882-6f25f1d9af65",
      avatarAlt: "Professional portrait of woman with long dark hair in white blazer"
    },
    attachments: 3
  },
  {
    id: 2,
    title: "API Integration Testing",
    description: "Comprehensive testing of third-party API integrations and error handling mechanisms.",
    status: "todo",
    priority: "Medium",
    dueDate: "Nov 28, 2025",
    estimatedHours: 16,
    progress: 0,
    project: "Mobile App Development",
    assignee: {
      name: "Mike Chen",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d67f557b-1762249150720.png",
      avatarAlt: "Professional headshot of young man with brown hair in blue shirt smiling at camera"
    },
    attachments: 1
  },
  {
    id: 3,
    title: "Database Optimization",
    description: "Performance optimization of database queries and indexing for improved application response times.",
    status: "review",
    priority: "High",
    dueDate: "Nov 22, 2025",
    estimatedHours: 32,
    progress: 85,
    project: "Data Analytics Dashboard",
    assignee: {
      name: "Alex Rodriguez",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ea790572-1762275033803.png",
      avatarAlt: "Business headshot of man with beard wearing navy suit and tie"
    },
    attachments: 2
  },
  {
    id: 4,
    title: "Security Audit Report",
    description: "Complete security assessment and vulnerability analysis with remediation recommendations.",
    status: "completed",
    priority: "High",
    dueDate: "Nov 18, 2025",
    estimatedHours: 40,
    progress: 100,
    project: "Infrastructure Migration",
    assignee: {
      name: "Emma Wilson",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10c75be77-1762273997956.png",
      avatarAlt: "Professional photo of woman with blonde hair in black business attire"
    },
    attachments: 5
  }];


  // Mock data for project statistics
  const projectStats = {
    activeProjects: 12,
    completedTasks: 247,
    teamMembers: 28,
    overdueTasks: 5
  };

  // Mock data for team workload
  const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Frontend Developer",
    avatar: "https://images.unsplash.com/photo-1706565029882-6f25f1d9af65",
    avatarAlt: "Professional portrait of woman with long dark hair in white blazer",
    workloadPercentage: 85,
    activeTasks: 6,
    hoursThisWeek: 34
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Backend Developer",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1d67f557b-1762249150720.png",
    avatarAlt: "Professional headshot of young man with brown hair in blue shirt smiling at camera",
    workloadPercentage: 92,
    activeTasks: 8,
    hoursThisWeek: 37
  },
  {
    id: 3,
    name: "Alex Rodriguez",
    role: "Full Stack Developer",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ea790572-1762275033803.png",
    avatarAlt: "Business headshot of man with beard wearing navy suit and tie",
    workloadPercentage: 67,
    activeTasks: 4,
    hoursThisWeek: 27
  },
  {
    id: 4,
    name: "Emma Wilson",
    role: "DevOps Engineer",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10c75be77-1762273997956.png",
    avatarAlt: "Professional photo of woman with blonde hair in black business attire",
    workloadPercentage: 78,
    activeTasks: 5,
    hoursThisWeek: 31
  },
  {
    id: 5,
    name: "David Park",
    role: "UI/UX Designer",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a15447ac-1762274444404.png",
    avatarAlt: "Corporate headshot of man with short dark hair in gray suit",
    workloadPercentage: 45,
    activeTasks: 3,
    hoursThisWeek: 18
  }];


  // Mock data for milestones and activities
  const milestones = [
  {
    title: "Beta Release Deployment",
    project: "E-commerce Platform",
    type: "milestone",
    status: "upcoming",
    date: "Nov 30, 2025",
    daysLeft: 17
  },
  {
    title: "User Acceptance Testing",
    project: "Mobile App Development",
    type: "deadline",
    status: "upcoming",
    date: "Dec 5, 2025",
    daysLeft: 22
  },
  {
    title: "Security Audit Completion",
    project: "Infrastructure Migration",
    type: "completion",
    status: "completed",
    date: "Nov 18, 2025",
    daysLeft: 0
  }];


  const activities = [
  {
    user: "Sarah Johnson",
    action: "completed task \'Design System Implementation'",
    timestamp: "2 hours ago",
    project: "E-commerce Platform",
    icon: "CheckCircle"
  },
  {
    user: "Mike Chen",
    action: "created new task \'API Documentation'",
    timestamp: "4 hours ago",
    project: "Mobile App Development",
    icon: "Plus"
  },
  {
    user: "Alex Rodriguez",
    action: "updated project timeline",
    timestamp: "6 hours ago",
    project: "Data Analytics Dashboard",
    icon: "Calendar"
  },
  {
    user: "Emma Wilson",
    action: "uploaded security audit report",
    timestamp: "1 day ago",
    project: "Infrastructure Migration",
    icon: "Upload"
  }];


  // Mock data for resource allocation
  const resourceData = {
    teamUtilization: [
    { name: 'Frontend', allocated: 85, available: 15 },
    { name: 'Backend', allocated: 92, available: 8 },
    { name: 'DevOps', allocated: 78, available: 22 },
    { name: 'Design', allocated: 45, available: 55 },
    { name: 'QA', allocated: 67, available: 33 }]

  };

  const budgetData = [
  { name: 'Development', value: 45 },
  { name: 'Design', value: 20 },
  { name: 'Testing', value: 15 },
  { name: 'Infrastructure', value: 12 },
  { name: 'Other', value: 8 }];


  const handleViewProjectDetails = (project) => {
    console.log('Viewing project details:', project);
  };

  const handleEditProject = (project) => {
    console.log('Editing project:', project);
  };

  const handleCreateTask = () => {
    console.log('Creating new task');
  };

  const handleTaskUpdate = (task) => {
    console.log('Updating task:', task);
  };

  const handleViewMember = (member) => {
    console.log('Viewing team member:', member);
  };

  const tabs = [
  { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
  { id: 'projects', label: 'Projects', icon: 'FolderOpen' },
  { id: 'tasks', label: 'Tasks', icon: 'CheckSquare' },
  { id: 'team', label: 'Team', icon: 'Users' },
  { id: 'resources', label: 'Resources', icon: 'BarChart3' }];


  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Project Management - Odoo Enterprise</title>
        <meta name="description" content="Comprehensive project tracking, task assignment, and resource management for enterprise teams" />
      </Helmet>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)} />

      <div className="lg:ml-72">
        <Header
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          isMenuOpen={isSidebarOpen} />

        
        <main className="pt-16 lg:pt-16">
          <div className="p-6">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Project Management</h1>
                <p className="text-muted-foreground">
                  Track projects, manage tasks, and optimize team resources across all active initiatives
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  iconSize={16}>

                  Export Report
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}>

                  New Project
                </Button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-1 mb-8 bg-muted p-1 rounded-lg w-fit">
              {tabs?.map((tab) =>
              <Button
                key={tab?.id}
                variant={activeTab === tab?.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab?.id)}
                iconName={tab?.icon}
                iconPosition="left"
                iconSize={16}>

                  {tab?.label}
                </Button>
              )}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' &&
            <div className="space-y-8">
                <ProjectStats stats={projectStats} />
                
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  <div className="xl:col-span-2">
                    <TaskBoard
                    tasks={tasks}
                    onTaskUpdate={handleTaskUpdate}
                    onCreateTask={handleCreateTask} />

                  </div>
                  
                  <div className="space-y-8">
                    <ProjectTimeline
                    milestones={milestones}
                    activities={activities} />

                  </div>
                </div>
              </div>
            }

            {activeTab === 'projects' &&
            <div className="space-y-8">
                <ProjectStats stats={projectStats} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {projects?.map((project) =>
                <ProjectCard
                  key={project?.id}
                  project={project}
                  onViewDetails={handleViewProjectDetails}
                  onEditProject={handleEditProject} />

                )}
                </div>
              </div>
            }

            {activeTab === 'tasks' &&
            <div className="space-y-8">
                <TaskBoard
                tasks={tasks}
                onTaskUpdate={handleTaskUpdate}
                onCreateTask={handleCreateTask} />

              </div>
            }

            {activeTab === 'team' &&
            <div className="space-y-8">
                <TeamWorkload
                teamMembers={teamMembers}
                onViewMember={handleViewMember} />

              </div>
            }

            {activeTab === 'resources' &&
            <div className="space-y-8">
                <ResourceAllocation
                resourceData={resourceData}
                budgetData={budgetData} />

              </div>
            }
          </div>
        </main>
      </div>
    </div>);

};

export default ProjectManagement;
