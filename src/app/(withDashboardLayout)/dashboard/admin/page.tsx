'use client'
import Link from "next/link";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { getUserInfo } from "@/services/auth.service";
import { useEffect, useState } from "react";
import { useGetAllProjectsQuery } from "@/redux/api/projects/projectsApi";
import { useGetAllBlogsQuery } from "@/redux/api/blogs/blogsApi";
import { TProject, TUser } from "@/types";
import Image from 'next/image';

const AdminPage = () => {
    const userData = getUserInfo() as TUser;
    const { data: projects, isLoading: projectsLoading } = useGetAllProjectsQuery({});
    const { data: blogs, isLoading: blogsLoading } = useGetAllBlogsQuery({});

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <div className="max-w-6xl mx-auto py-12 px-6 sm:px-8">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <h1 className="text-3xl font-bold mb-8 text-gray-900">Welcome {userData?.name}!</h1>
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                            {/* Optional: Add more elements */}
                        </div>
                        <div className="flex items-center space-x-4">
                            <button type="button" className="btn btn-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Chat
                            </button>
                            <Link href='/dashboard/admin/admin-profile'>
                                <button type="button" className="btn btn-primary">Profile</button>
                            </Link>
                        </div>
                    </div>
                    <hr className="border-gray-300 my-6" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Stats</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-green-100 rounded-lg">
                                    <div className="font-bold text-xl text-gray-800">Good day, {userData?.name}</div>
                                    <button type="button" className="btn btn-secondary mt-4">Start Tracking</button>
                                </div>
                                <div className="p-4 bg-yellow-100 rounded-lg text-gray-800">
                                    <div className="font-bold text-2xl">{projects?.length}</div>
                                    <div>Total Projects</div>
                                </div>
                                <div className="p-4 bg-yellow-100 rounded-lg text-gray-800">
                                    <div className="font-bold text-2xl">{blogs?.length}</div>
                                    <div>Total Blogs</div>
                                </div>
                                <div className="p-4 bg-purple-100 rounded-lg text-gray-800 col-span-2">
                                    <div className="font-bold text-xl">Your Daily Plan</div>
                                    <div>5 of 8 completed</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
                            <div className="space-y-4">
                                {/* Render projects */}
                                {projects?.slice(0, 1)?.map((project: TProject) => (
                                    <div key={project._id} className="p-4 bg-white rounded-lg text-gray-800">
                                        <div className="font-bold text-lg mb-2">{project.heading}</div>
                                        <p className="text-gray-600">{project.des}</p>
                                    </div>
                                ))}
                                <div className="flex justify-end">
                                    <Link href='/dashboard/admin/add-project'>
                                        <button className="btn btn-link">See All</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
