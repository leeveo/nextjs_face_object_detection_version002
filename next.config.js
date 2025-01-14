/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: "/version002",
    images: {
        unoptimized: true,
    },
    trailingSlash: true, // Ensure trailing slashes for all routes
    experimental: {
        appDir: true, // Enable the app directory structure
    },
};

module.exports = nextConfig;
