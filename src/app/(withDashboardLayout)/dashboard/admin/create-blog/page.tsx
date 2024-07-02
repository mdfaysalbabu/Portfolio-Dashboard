"use client"
import { Avatar, Box, Button, IconButton, Pagination, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Swal from "sweetalert2";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Link from "next/link";
import Loader from "@/components/shared/Loader/Loader";
import { TBlog } from "@/types";
import BlogPostModal from "./components/BlogPostModal";
import { useDeleteBlogMutation, useGetAllBlogsQuery } from "@/redux/api/blogs/blogsApi";
import EditBlogModal from "./components/EditBlogModal";

const CreateBlogPage = () => {
    const [blogId, setBlogId] = useState('');
    const [limit, setLimit] = useState(5);
    const [searchTerm, setSearchTerm] = useState<string>('')
    const query: Record<string, any> = {};
    //   const debounced = useDebounced({ searchTerm: searchTerm, delay: 500 });
    //   if (!!debounced) {
    //     query['searchTerm'] = searchTerm;
    //   }
    //   query['page']=page;
    //   query['limit']=limit;
    const [open, setOpen] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

    const [blogData, setBlogData] = useState([]);
    const { data: blogs, isLoading } = useGetAllBlogsQuery({})
    const [deleteBlog] = useDeleteBlogMutation()

    useEffect(() => {
        const modifyBlogs = blogs?.map((item: TBlog) => {
            return {
                id: item?._id,
                ...item
            }

        })
        setBlogData(modifyBlogs)
    }, [blogs])



    // delete trip
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
                // console.log(res);
                if (res?._id) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Blog has been deleted.",
                        icon: "success"
                    });
                }
                else {
                    Swal.fire({
                        title: "Error!",
                        text: "There was an error deleting blog.",
                        icon: "error"
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Error!",
                    text: "There was an error deleting blog.",
                    icon: "error"
                });
            }
        }
    };

const handleEdit=(id:string)=>{
    setEditModalOpen(true);
    setBlogId(id)

}
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
            renderCell: ({ row }) => {
                return (
                    <Box>
                        <Avatar className="border-2" src={row?.file} alt="profile" />
                    </Box>
                )
            }
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
            renderCell: ({ row }) => {
                return (
                    <Box>

                        <IconButton aria-label='delete' onClick={() => handleDelete(row?.id)} sx={{ color: "red" }}
                        >
                            <DeleteForeverIcon />
                        </IconButton>

                        {/* <Box> */}
                        <IconButton aria-label='edit' onClick={()=>handleEdit(row?.id)}>
                            <EditIcon />
                        </IconButton>
                        <EditBlogModal open={editModalOpen} setOpen={setEditModalOpen} blogId={blogId}/>
                        {/* </Box> */}

                    </Box>
                )
            }
        },
    ]



    return (
        <Box>
            <Stack direction="row" justifyContent="space-between">
                <Button size="small" onClick={() => setOpen(true)}>Create a new Blog</Button>
                <TextField size="small" label="search" onChange={(e) => setSearchTerm(e.target.value)} />
                <BlogPostModal open={open as boolean} setOpen={setOpen} />
            </Stack>
            {
                isLoading ?
                    (
                        <Loader />
                    )
                    :
                    (
                        <Box mt={2}>
                            <DataGrid
                                rows={blogData || []}
                                columns={columns}
                                hideFooterPagination


                            />
                        </Box>
                    )
            }
        </Box>
    );
};

export default CreateBlogPage;