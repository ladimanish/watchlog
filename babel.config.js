module.exports = (api) => {
  const config = {
    presets: [
      '@babel/preset-env',
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          regenerator: true,
        },
      ],
    ],
  };

  if (api?.env('development')) {
    config.plugins.push('react-refresh/babel');
  }

  return config;
};
