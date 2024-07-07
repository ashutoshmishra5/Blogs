import { NextResponse } from 'next/server';
import { connectDb1 } from '@/app/lib/utils';
import { Blog } from '@/app/lib/models';

export const dynamic = 'force-dynamic';


export const PUT = async (request, { params }) => {
    const { id } = params;
  
    try{
      await connectDb1();
      const {data} = await request.json();
      const { title, desc, date, author,imgUrl } = data;

      const updatedPost = await Blog.findByIdAndUpdate(id, { title, desc, date, author,imgUrl });
      return NextResponse.json(updatedPost);
    }catch(err){
      console.log(err);
      return NextResponse.json({error: "Something went wrong!"});
    }
  };
  