"use client"
import MYFileUploader from "@/components/Forms/MYFileUploader";
import MYInput from "@/components/Forms/MYInput";
import MyForm from "@/components/Forms/MyForm";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import MYModal from "@/components/Modals/MYModal";
import { useCreateBlogMutation } from "@/redux/api/blogs/blogsApi";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}


const BlogPostModal = ({ open, setOpen }: TProps) => {
    const [createBlog] = useCreateBlogMutation();

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

        const blogData = {
            ...values,
            file: imgData?.data?.url
        }
        // console.log(blogData);
        try {
            const res: any = await createBlog(blogData);
            // console.log(res);
            if (res?.data?._id) {
                toast.success("Blog created successfully", { id: toastId, duration: 1000 });
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
        <MYModal open={open} setOpen={setOpen} title="Crate a new blog" >
            <MyForm onSubmit={handleSubmit}  >
                <Grid container spacing={2} >
                    <Grid item md={12} sm={12} xs={12}>
                        <MYInput name="authorName" label="Author Name" fullWidth={true} required={true} />
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                        <MYInput name="title" label="Title" fullWidth={true} required={true} />
                    </Grid>


                    <Grid item md={12} sm={12} xs={12} >
                        <MYInput name="quote" label="Quote" fullWidth={true} required={true} />
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                        <MYFileUploader name="file" label="Upload Photo" sx={{ width: "100%" }}
                            required={true}
                        />
                    </Grid>

                </Grid>
                <Button type="submit">Post</Button>
            </MyForm>
        </MYModal>
    );
};

export default BlogPostModal;