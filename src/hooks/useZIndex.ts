import { ref, computed } from 'vue';

const zIndex = ref(0);
const useZIndex = (initialVal = 2000) => {
  const initialZIndex = ref(initialVal);
  const currentZIndex = computed(() => zIndex.value + initialZIndex.value);
  const nextZIndex = () => {
    zIndex.value++;
    return currentZIndex.value;
  };
  return {
    initialZIndex,
    currentZIndex,
    nextZIndex
  };
};

export default useZIndex;
