"use client"
import { getUserInfo } from '@/services/auth.service';
import Link from 'next/link';
const LocalPage = () => {
    const user=getUserInfo();
    // console.log(user);
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Hello Pritom</h1>
      <p className="py-6">
      Next.js is a React framework enabling server-side rendering and static site generation for optimized performance.
      </p>
      {
        user ?
     <Link href='/dashboard/admin'>
     <button className="btn btn-primary">Go To Dashboard</button>
     </Link>
:
<Link href='/'>
<button className="btn btn-primary">Go To Login</button>
</Link>
      }
    </div>
  </div>
</div>
        </div>
    );
};

export default LocalPage;