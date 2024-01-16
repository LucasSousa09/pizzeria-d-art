/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'files.stripe.com'
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            }
    ]
    }    
}

module.exports = nextConfig
