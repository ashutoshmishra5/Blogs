import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

	//const secretAccessKey1 = env(AWS_S3_SECRET_ACCESS_KEY);
	//const accessKeyId1 = env(AWS_S3_ACCESS_KEY_ID);

const s3Client = new S3Client({
	region: process.env.AWS_S3_REGION,
	//credentials: {
	//	secretAccessKey:secretAccessKey1,
	//	accessKeyId:accessKeyId1
	//}
});

async function uploadFileToS3(file, fileName) {

	const fileBuffer = file;

	const data = {
		Bucket: process.env.AWS_S3_BUCKET_NAME,
		Key: `${fileName}`,
		Body: fileBuffer,
		ContentType: "image/jpg"
	}

	const command = new PutObjectCommand(data);
	await s3Client.send(command);
	
	const objectUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileName}`;

	return objectUrl;
  

}

export async function POST(request) {
	try {

		const formData = await request.formData();
		const file = formData.get("file");

		const buffer = Buffer.from(await file.arrayBuffer());
		const fileName = await uploadFileToS3(buffer, file.name);

		return NextResponse.json({ success: true, fileName});
	} catch (error) {
		return NextResponse.json({ error });
	}
}