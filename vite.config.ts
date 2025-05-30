import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import path from 'path'
// import Components from 'unplugin-vue-components/vite';
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    // Components({
    //   resolvers: [
    //     AntDesignVueResolver({
    //       importStyle: false, // css in js
    //     }),
    //   ],
    // }),
  ],
  // resolve: {
  //   alias: {
  //     '@dcloudio/uni-ui': path.resolve(__dirname, 'node_modules/@dcloudio/uni-ui')
  //   }
  // },
  server: {
    proxy: {
      // 完整配置写法
      '/api': {
        target: 'https://schoolapi-fqd0d0hhftajfkdv.eastasia-01.azurewebsites.net/',
        changeOrigin: true,
        secure: false,
        //rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
