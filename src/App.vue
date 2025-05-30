<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
//import '@dcloudio/uni-ui/lib/uni-table/style.css'
//import "@dcloudio/uni-ui";

onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style></style>
