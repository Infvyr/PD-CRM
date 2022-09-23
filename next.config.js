const withNx = require('@nrwl/next/plugins/with-nx');
const withAntdLess = require('next-plugin-antd-less');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
	nx: {
		svgr: true
	}
};

module.exports = withNx(
	withAntdLess({
		nextConfig,
		images: {
			domains: ['images.pexels.com']
		},
		lessVarsFilePathAppendToEndOfContent: false,
		compiler: {
			styledComponents: true // Enables the styled-components SWC transform
		}
	})
);
