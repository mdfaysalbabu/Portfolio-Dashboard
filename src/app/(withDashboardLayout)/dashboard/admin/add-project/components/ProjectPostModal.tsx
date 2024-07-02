"use client"
import MYFileUploader from "@/components/Forms/MYFileUploader";
import MYInput from "@/components/Forms/MYInput";
import MyForm from "@/components/Forms/MyForm";
import MYFullScreenModal from "@/components/Modals/MYFullScreenModal";
import { useCreateProjectMutation } from "@/redux/api/projects/projectsApi";
import {  Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import MultipleSelectFieldChip from "./MultipleSelectFieldChip";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}


const ProjectPostModal = ({ open, setOpen }: TProps) => {
    const [createProject] = useCreateProjectMutation();
    const techStack=useAppSelector((state:RootState)=>state.addTechnology.techStack);
    // console.log({techStack});
    const handleSubmit = async (values: FieldValues) => {
        const toastId = toast.loading("Processing...")
        const formData = new FormData();
        formData.append('image', values?.file as File)
        let imgData;
        if (values?.file) {
            const res = await fetch('https://api.imgbb.com/1/upload?key=906ad31c22599d2496d40f6792a5c559', {
                method: 'POST',
                body: formData
            })
            imgData = await res.json();
            // console.log(imgData);
        }
        
        const projectData = {
            heading:values?.heading,
            title:values?.title,
            des:values?.des,
            link:values?.link,
            clientSiteCode:values?.clientSiteCode,
            backendSiteCode:values?.backendSiteCode,
            techStack:techStack,
            img: imgData?.data?.url
        }
        // console.log(projectData);
        try {
            const res: any = await createProject(projectData);
            // console.log(res);
            if (res?.data?._id) {
                toast.success("Project created successfully", { id: toastId, duration: 1000 });
                setOpen(false);
            }
            else {
                toast.error("Something went wrong", { id: toastId, duration: 1000 });
            }
        }
        catch (error: any) {
            console.log(error?.message);
        }
    }
    return (
        <MYFullScreenModal open={open} setOpen={setOpen} title="Add a new project" >
            <MyForm onSubmit={handleSubmit}  >
                <Grid container spacing={2} >
                    <Grid item md={4} sm={12} xs={12}>
                        <MYInput name="title" label="Title" fullWidth={true} required={true} />
                    </Grid>
                    <Grid item md={4} sm={12} xs={12}>
                        <MYInput name="heading" label="Heading" fullWidth={true} required={true} />
                    </Grid>

                  
                    <Grid item md={12} sm={12} xs={12} >
                        <MYInput name="des" label="Detailed description" fullWidth={true} required={true} />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <MYInput name="link" label="Live link" type="text" fullWidth={true}
                            required={true} />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <MYInput name="clientSiteCode" label="Client Site Code Link" type="text" fullWidth={true}
                            required={true} />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <MYInput name="backendSiteCode" label="Backend Site Code Link" type="text" fullWidth={true}
                            required={true} />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <MYFileUploader name="file" label="Upload Photo" sx={{ width: "100%" }}
                            required={true}
                        />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <MultipleSelectFieldChip />
                    </Grid>
                </Grid>
                <Button type="submit">Post</Button>
            </MyForm>
        </MYFullScreenModal>
    );
};

export default ProjectPostModal;