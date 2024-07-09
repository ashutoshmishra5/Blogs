import { NextResponse } from 'next/server';
import { connectDb } from '@/app/lib/utils';

export const dynamic = 'force-dynamic';


export const PUT = async (request, { params }) => {
    const { id } = params;
  
    try{
      const {data} = await request.json();
      const { title, desc, date, author,imgUrl } = data;
      const { BlogModel } = await connectDb();

      const updatedPost = await BlogModel.findByIdAndUpdate(id, { title, desc, date, author,imgUrl });
      return NextResponse.json(updatedPost);
    }catch(err){
      console.log(err);
      return NextResponse.json({error: "Something went wrong!"});
    }
  };
  