import { NextResponse } from 'next/server';
import { connectDb } from '@/app/lib/utils';
import { Blog } from '@/app/lib/models';

export const dynamic = 'force-dynamic';


export const PUT = async (request, { params }) => {
    const { id } = params;
  
    try{
      await connectDb();
      const {data} = await request.json();
      const { title, desc, date, author } = data;

      const updatedPost = await Blog.findByIdAndUpdate(id, { title, desc, date, author });
      return NextResponse.json(updatedPost);
    }catch(err){
      console.log(err);
      return NextResponse.json({error: "Something went wrong!"});
    }
  };
  