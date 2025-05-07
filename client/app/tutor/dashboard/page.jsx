"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  User,
  Users,
  BookOpen,
  CheckCircle,
  Bell,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect } from "react";
import axios from "axios";

// Sample data for charts
const studentPerformanceData = [
  { month: "Jan", average: 72, highest: 95, lowest: 45 },
  { month: "Feb", average: 75, highest: 98, lowest: 50 },
  { month: "Mar", average: 78, highest: 100, lowest: 55 },
  { month: "Apr", average: 74, highest: 96, lowest: 48 },
  { month: "May", average: 80, highest: 100, lowest: 60 },
  { month: "Jun", average: 82, highest: 100, lowest: 65 },
];

const questionDifficultyData = [
  { name: "Easy", value: 35, color: "#4ade80" },
  { name: "Medium", value: 45, color: "#facc15" },
  { name: "Hard", value: 20, color: "#f87171" },
];

const subjectBreakdownData = [
  { subject: "Math", count: 45 },
  { subject: "Science", count: 30 },
  { subject: "English", count: 25 },
  { subject: "History", count: 15 },
  { subject: "Art", count: 10 },
];

const completionRateData = [
  { name: "Completed", value: 78, color: "#60a5fa" },
  { name: "In Progress", value: 15, color: "#fbbf24" },
  { name: "Not Started", value: 7, color: "#d1d5db" },
];

const recentAssessments = [
  {
    id: 1,
    title: "Math Quiz: Fractions",
    date: "2023-05-01",
    students: 28,
    completion: 92,
  },
  {
    id: 2,
    title: "Science Test: Solar System",
    date: "2023-04-28",
    students: 30,
    completion: 87,
  },
  {
    id: 3,
    title: "English: Vocabulary Challenge",
    date: "2023-04-25",
    students: 26,
    completion: 100,
  },
  {
    id: 4,
    title: "History: Ancient Civilizations",
    date: "2023-04-20",
    students: 29,
    completion: 79,
  },
];

export default function TutorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [token, setToken] = useState();
  const [questionCount, setQuestionCount] = useState(0);
  const [assessmentCount, setAssessmentCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const LocalToken = localStorage.getItem("auth");
    if (!LocalToken) {
      window.location.href = "/";
    } else {
      setToken(LocalToken);
    }
  }, []);

  useEffect(() => {
    if (token == "") return;

    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5050/tutor/dashboard/stats", {
          headers: {
            Authorization: token,
          },
        });
        const { questionCount, assessmentCount, totalStudents } = response.data;
        setQuestionCount(questionCount);
        setAssessmentCount(assessmentCount);
        setStudentCount(totalStudents);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-500 cursor-pointer" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>NS</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">Navjot Singh</p>
                    <p className="text-xs text-gray-500">Head of Education</p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Questions
                  </p>
                  <p className="text-3xl font-bold text-gray-900">{questionCount}</p>
                  <p className="text-sm text-green-600 mt-1">
                    +12% from last month
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <HelpCircle className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Assessments
                  </p>
                  <p className="text-3xl font-bold text-gray-900">{assessmentCount}</p>
                  <p className="text-sm text-green-600 mt-1">
                    +8% from last month
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Students</p>
                  <p className="text-3xl font-bold text-gray-900">{studentCount}</p>
                  <p className="text-sm text-green-600 mt-1">
                    +5% from last month
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Completion Rate
                  </p>
                  <p className="text-3xl font-bold text-gray-900">87%</p>
                  <p className="text-sm text-green-600 mt-1">
                    +3% from last month
                  </p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <CheckCircle className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Student Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>
                  Average, highest, and lowest scores over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    average: {
                      label: "Average Score",
                      color: "hsl(var(--chart-1))",
                    },
                    highest: {
                      label: "Highest Score",
                      color: "hsl(var(--chart-2))",
                    },
                    lowest: {
                      label: "Lowest Score",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={studentPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="average"
                        stroke="var(--color-average)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="highest"
                        stroke="var(--color-highest)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="lowest"
                        stroke="var(--color-lowest)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Subject Breakdown Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Questions by Subject</CardTitle>
                <CardDescription>
                  Distribution of questions across subjects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subjectBreakdownData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="count"
                        fill="#60a5fa"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Smaller Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Question Difficulty Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Question Difficulty</CardTitle>
                <CardDescription>
                  Distribution by difficulty level
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="h-[200px] w-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={questionDifficultyData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {questionDifficultyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Assessment Completion */}
            <Card>
              <CardHeader>
                <CardTitle>Assessment Completion</CardTitle>
                <CardDescription>
                  Student progress on assessments
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="h-[200px] w-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={completionRateData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {completionRateData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Assessments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Assessments</CardTitle>
                <CardDescription>
                  Your most recently created assessments
                </CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> New Assessment
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">
                        Title
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">
                        Students
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">
                        Completion
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAssessments.map((assessment) => (
                      <tr
                        key={assessment.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                            <span>{assessment.title}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-500">
                          {new Date(assessment.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">{assessment.students}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${assessment.completion}%` }}
                              ></div>
                            </div>
                            <span>{assessment.completion}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
