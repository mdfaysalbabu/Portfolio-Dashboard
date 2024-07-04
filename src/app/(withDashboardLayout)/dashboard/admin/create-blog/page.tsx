'use client'
import { Avatar, Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Swal from "sweetalert2";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Link from "next/link";
import Loader from "@/components/shared/Loader/Loader";
import { TBlog } from "@/types";
import BlogPostModal from "./components/BlogPostModal";
import EditBlogModal from "./components/EditBlogModal";
import { useDeleteBlogMutation, useGetAllBlogsQuery } from "@/redux/api/blogs/blogsApi";

const CreateBlogPage = () => {
    const [blogId, setBlogId] = useState('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [blogData, setBlogData] = useState<TBlog[]>([]);
    const { data: blogs, isLoading } = useGetAllBlogsQuery({});
    const [deleteBlog] = useDeleteBlogMutation();

    useEffect(() => {
        if (blogs) {
            const modifiedBlogs = blogs.map((item: TBlog) => ({
                id: item?._id,
                authorName: item?.authorName,
                file: item?.file,
                quote: item?.quote
            }));
            setBlogData(modifiedBlogs);
        }
    }, [blogs]);

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                const res = await deleteBlog(id).unwrap();
                if (res?._id) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Blog has been deleted.",
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "There was an error deleting the blog.",
                        icon: "error"
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "There was an error deleting the blog.",
                    icon: "error"
                });
            }
        }
    };

    const handleEdit = (id: string) => {
        setBlogId(id);
        setEditModalOpen(true);
    };

    const columns: GridColDef[] = [
        {
            field: "authorName",
            headerName: 'Author Name',
            flex: 1
        },
        {
            field: "file",
            headerName: 'Author Photo',
            flex: 1,
            renderCell: ({ row }) => (
                <Box>
                    <Avatar src={row?.file} alt="profile" />
                </Box>
            )
        },
        {
            field: "quote",
            headerName: 'Quote',
            flex: 1
        },
        {
            field: "action",
            headerName: 'Action',
            flex: 1,
            headerAlign: 'center',
            align: "center",
            renderCell: ({ row }) => (
                <Box>
                    <IconButton aria-label='delete' onClick={() => handleDelete(row?.id)} sx={{ color: "red" }}>
                        <DeleteForeverIcon />
                    </IconButton>
                    <IconButton aria-label='edit' onClick={() => handleEdit(row?.id)}>
                        <EditIcon />
                    </IconButton>
                    <EditBlogModal open={editModalOpen} setOpen={setEditModalOpen} blogId={blogId} />
                </Box>
            )
        },
    ];

    return (
        <Box p={4}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Button variant="contained" onClick={() => setOpen(true)}>Create a New Blog</Button>
                <TextField
                    size="small"
                    label="Search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{ sx: { backgroundColor: "#f0f0f0" } }}
                />
                <BlogPostModal open={open} setOpen={setOpen} />
            </Stack>
            {isLoading ? (
                <Loader />
            ) : (
                <Box mt={4}>
                    <DataGrid
                        rows={blogData}
                        columns={columns}
                        autoHeight
                        disableColumnMenu
                        disableRowSelectionOnClick
                    />
                </Box>
            )}
        </Box>
    );
};

export default CreateBlogPage;
