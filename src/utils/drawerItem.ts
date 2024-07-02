import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IDrawerItem, USER_ROLE } from '@/types/common';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
export const drawerItems = (role: string):IDrawerItem[] => {
    const roleMenus: IDrawerItem[] = [];
    // console.log(role);
    switch (role) {
        case USER_ROLE.ADMIN:
            roleMenus.push(
                {
                    title: "Dashboard",
                    path: `${role}`,
                    icon: DashboardIcon
                },
                {
                    title: "Create Blog",
                    path: `${role}/create-blog`,
                    icon: NoteAddIcon
                },
                {
                    title: "Add Project",
                    path: `${role}/add-project`,
                    icon: PostAddIcon
                },
                {
                    title: "Profile",
                    path: `${role}/admin-profile`,
                    icon: AccountCircleIcon
                },
            )
            break;
        default:
            break;
    }
    return [...roleMenus];
}