/*'use client'
import { useSession } from "next-auth/react";

import { signOut } from 'next-auth/react';

export default function Dashboard() {
    const { data: session, status } = useSession();
    console.log(session);
    return(
       <div>
        <button onClick={() => signOut({ callbackUrl: '/login' })}>
            Sign Out
        </button>
       <div>Dashboard</div>
       <p> Hi {session?.user.name}</p>
       </div>
    );
}

*/

//------------------------------------------------------------------------------------------------------------------------
'use client';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Cards from "@/components/Cards/Cards";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";


const Dashboard = () => {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/addblogApi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          desc
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>You need to be authenticated to view this page.</div>;
  }

  return (
    <div>

      <div className="container-flex grid grid-cols-10">
            <div className="col-span-2 bg-blue-200"></div>
                <div className="col-span-6 bg-blue-200">
                    <Header/>
                    
                      <div>
                        <p>Hi {session?.user.name}</p>
                        <button className='ml-auto bg-slate-500 text-white px-4 py-2 rounded' onClick={() => signOut({ callbackUrl: '/login' })}>
                          Sign Out
                        </button>
                      </div>

                        <form onSubmit={handleSubmit} >
                        <input
                          className="container flex flex-row items-center justify-center mt-8"
                          type="text"
                          placeholder="Title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                        <textarea
                          className="container flex flex-row items-center justify-center mt-8"
                          placeholder="Description"
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                          required
                        />
                        <button className='container flex flex-row items-center justify-center mt-8 ml-auto bg-slate-500 text-white px-4 py-2 rounded' type="submit">Post Blog</button>
                      </form>
                    <Footer/>

                </div>
            <div className="col-span-2 bg-blue-200"></div>
      
        </div>


    </div>
  );
};

export default Dashboard;
