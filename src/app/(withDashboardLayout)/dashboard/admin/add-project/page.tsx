"use client"
import { Box, Button, IconButton, Pagination, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import Swal from "sweetalert2";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Link from "next/link";
import { getUserInfo } from "@/services/auth.service";
import Loader from "@/components/shared/Loader/Loader";
import { useDeleteProjectMutation, useGetAllProjectsQuery } from "@/redux/api/projects/projectsApi";
import ProjectPostModal from "./components/ProjectPostModal";
import { TProject } from "@/types";
import Image from "next/image";

const ProjectPostPage = () => {
  const [page, setPage] = useState(1);
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
  const [projectData,setProjectData]=useState([]);
  const { data:projects, isLoading} =useGetAllProjectsQuery({})
  const [deleteProject] =useDeleteProjectMutation()

  useEffect(()=>{
    const modifyProjects=projects?.map((item:TProject)=>{
      return {
        id:item?._id,
        ...item
      }
      
    })
    setProjectData(modifyProjects)
  },[projects])


 
  // delete Project
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
        const res = await deleteProject(id).unwrap();
        // console.log(res);
        if (res?._id) {
          Swal.fire({
            title: "Deleted!",
            text: "Project has been deleted.",
            icon: "success"
          });
        }
        else {
          Swal.fire({
            title: "Error!",
            text: "There was an error deleting project.",
            icon: "error"
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There was an error deleting project.",
          icon: "error"
        });
      }
    }
  };


  const columns: GridColDef[] = [
    {
      field: "heading",
      headerName: 'Project Name',
      flex: 1
    },
    {
      field: "img",
      headerName: 'Image',
      flex: 1,
      renderCell:({row})=>{
        return (
         <Box>
          <Image className="border-2" src={row?.img} alt="image" width={120} height={50}/>
         </Box>
        )
      }
    },
    {
      field: "des",
      headerName: 'Description',
      flex: 1
    },
    {
      field: "clientSiteCode",
      headerName: 'Client Site Code Link',
      flex: 1
    },
    {
      field: "backendSiteCode",
      headerName: 'Backend Site Code Link',
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
      
            <IconButton aria-label='delete'      onClick={() => handleDelete(row?.id)} sx={{ color: "red" }}
 >
              {/* <EditIcon/> */}
              <DeleteForeverIcon />
            </IconButton>
       
          </Box>
        )
      }
    },
  ]



  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Button size="small" onClick={() => setOpen(true)}>Add a new project</Button>
        <TextField size="small" label="search" onChange={(e) => setSearchTerm(e.target.value)} />
        <ProjectPostModal open={open as boolean} setOpen={setOpen} />
      </Stack>
      {
        isLoading ?
          (
            <Loader/>
          )
          :
          (
            <Box mt={2}>
              <DataGrid
                rows={projectData || []}
                columns={columns}
                hideFooterPagination
              

              />
            </Box>
          )
      }
    </Box>
  );
};

export default ProjectPostPage;