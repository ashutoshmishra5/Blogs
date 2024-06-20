import { NextResponse } from 'next/server';
import { connectDb } from '@/app/lib/utils';
import { Blog } from '@/app/lib/models';


export const PUT = async (request, { params }) => {
    const { id } = params;
  
    try{
      await connectDb();
      const { title, desc, date, author } = await request.json();
      const updatedPost = await Blog.findByIdAndUpdate(id, { title, desc, date, author });
      return NextResponse.json(updatedPost);
    }catch(err){
      console.log(err);
      return {error: "Something went wrong!"};
    }
  };
  