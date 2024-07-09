import { NextResponse } from "next/server";
import { connectDb } from '@/app/lib/utils';


export const dynamic = 'force-dynamic';

export const DELETE = async (request, { params }) => {

    try{
        const { id } = params;
        const { BlogModel } = await connectDb();
        const result = await BlogModel.findByIdAndDelete(id);
        return NextResponse.json(result);
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Something went wrong!" });
    }
};