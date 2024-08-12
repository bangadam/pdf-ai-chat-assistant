/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      "onnxruntime-node$": false,
    };
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
      asyncWebAssembly: true,
    };
    config.module.rules.push({
      test: /\.md$/i,
      use: "raw-loader",
    });
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        "node:fs/promises": false,
        assert: false,
        module: false,
        perf_hooks: false,
      };
    }
    return config;
  },
};

export default nextConfig;
