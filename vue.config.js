// vue.config.js
module.exports = {
  publicPath:"./",
    css: {
      loaderOptions: {
        less: {
          // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
          lessOptions: {
            modifyVars: {
              // 直接覆盖变量
              'text-color': '#111',
              'border-color': '#eee',
              // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
              hack: `true; @import "./src/assets/resetui.less";`,
            },
          },
        },
      },
    },
    devServer:{
      open: true,
      port: 8090, 
      https: false,
		    hotOnly: false, 
		    proxy: {
		        '/api': {
		            target: 'http://localhost:20472', //API服务器的地址
		            changeOrigin: true,
		            pathRewrite: {
		                '^/api': ''
		            }
		        }
		    },
    }
  };