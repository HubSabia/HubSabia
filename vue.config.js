const { defineConfig } = require('@vue/cli-service')
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack'); 


module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // ... outras configurações do servidor ...

    // Adiciona uma regra para servir arquivos da pasta 'assets'
    static: {
      directory: path.join(__dirname, 'public'), // Diretório raiz para arquivos estáticos
      serveIndex: true,
      watch: true,      // Assiste por mudanças nos arquivos (opcional)
    },
  },
  // Configuração para copiar arquivos da pasta 'assets' para 'dist' durante o build
  // Configuração para servir arquivos da pasta 'assets'
  chainWebpack: config => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src')); // Define o alias '@' para a pasta 'src' (se você estiver usando)

    // Adiciona a pasta 'assets' à lista de diretórios estáticos
    config.devServer.set('static', [
      path.join(__dirname, 'public'),
      path.join(__dirname, 'assets'),
    ]);
  },
  configureWebpack: {
    plugins: [
      // Add the 'dotenv' plugin for loading environment variables
      new Dotenv(), 
      new webpack.DefinePlugin({
        'process.env': {
          // Your environment variables will be available here
          API_KEY: JSON.stringify(process.env.API_KEY),
          // DATABASE_URL: JSON.stringify(process.env.DATABASE_URL) 

          // Example: 
          // API_URL: JSON.stringify(process.env.API_URL || 'https://your-api-url.com')
        }
      })
    ],
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify')
      }
    }
  },

});

module.exports = {
  // ... other Vue configuration ...

  configureWebpack: {
    plugins: [
      // Adiciona o plugin dotenv-webpack
      new Dotenv(), 
      // Adiciona o plugin webpack.DefinePlugin para acessar as variáveis
      new webpack.DefinePlugin({
        'process.env': {
          API_KEY: JSON.stringify(process.env.API_KEY),
          // DATABASE_URL: JSON.stringify(process.env.DATABASE_URL) 
        }
      })
    ],
  },

  // ... other Vue configuration ...
};
