/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	distDir: "build",
	images: {
		unoptimized: true,
	},
	experimental: {
		webpackBuildWorker: true,
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ["@svgr/webpack"],
		})
		return config
	},
}

module.exports = nextConfig
