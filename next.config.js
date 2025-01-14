/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: "/version002",
    images: {
        unoptimized: true,
    },
    trailingSlash: true, // Ensure trailing slashes for all routes
};

module.exports = nextConfig;
