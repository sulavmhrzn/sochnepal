import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            new URL("http://localhost:8000/media/**"),
            new URL("https://res.cloudinary.com/**"),
        ],
    },
};

export default nextConfig;
