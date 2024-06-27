/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
        {          
            protocol:'https',
            hostname:"b-blogsbucket.s3.eu-north-1.amazonaws.com"
        },
        {          
            protocol:'https',
            hostname:"images.spr.so"
        }

        ]
    }
};

export default nextConfig;