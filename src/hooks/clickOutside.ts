import type { Ref } from 'vue';
import { onMounted, onUnmounted } from 'vue'
const clickOutside = (elementRef: Ref<undefined | HTMLElement>, callback: (e: MouseEvent) => void) => {
  const handler = (e: MouseEvent) => {
    if (elementRef.value && e.target) {
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        callback(e);
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler);
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler);
  })
}

export default clickOutside;